import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated, PanResponder } from 'react-native';
import axios from 'axios';

const UraSon = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pan] = useState(new Animated.ValueXY());
  const [opacity] = useState(new Animated.Value(1));
  const photos = [
    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1KLu-XwP06kTlOMFDGWu1B9vVf5NlUGv5',
    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1YIJ908TOg7izFOqtNyUE5z5dfkPlalSt',
    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1HyF0xsEVPFM0P6n1DQxXTKZl1jYxgkWr',
    // Добавьте другие URL-адреса фотографий в массив
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > 120) {
        handleCardSwipe('right');
      } else if (gesture.dx < -120) {
        handleCardSwipe('left');
      } else {
        resetCardPosition();
      }
    },
  });

  useEffect(() => {
    fetchTasks();
    generateRandomProgress();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://10.1.1.38:8000/api/tasks/');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const generateRandomProgress = () => {
    const randomProgress = Math.floor(Math.random() * 101); // Generate a random number between 0 and 100
    setProgress(randomProgress);
  };

  const toggleTaskExpansion = (taskName) => {
    if (expandedTask === taskName) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskName);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCardSwipe = (direction) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      resetCardPosition();
      handleCardDismissal(direction);
    });
  };

  const handleCardDismissal = (direction) => {
    if (direction === 'right') {
      // Swipe right action
      console.log('Swiped right');
    } else if (direction === 'left') {
      // Swipe left action
      console.log('Swiped left');
    }
    setCurrentIndex(currentIndex + 1);
    opacity.setValue(1);
  };

  const resetCardPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const cardStyles = [
    styles.taskCard,
    {
      transform: [{ translateX: pan.x }, { translateY: pan.y }],
      opacity,
    },
  ];

  const renderTaskCard = ({ item, index }) => {
    const isExpanded = expandedTask === item.name_task;

    if (index < currentIndex) {
      return null;
    } else if (index === currentIndex) {
      return (
        <Animated.View style={cardStyles} {...panResponder.panHandlers}>
          <View style={styles.innerCard}>
            <TouchableOpacity
              style={styles.taskCard}
              onPress={() => toggleTaskExpansion(item.name_task)}
            >
              <View>
                <Image style={styles.taskImage} source={{ uri: photos[index % photos.length] }} />
                <Text style={styles.taskName}>{item.name_task}</Text>
              </View>
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.radioOption}>
                    <TouchableOpacity
                      style={[styles.radioCircle, selectedOption === 'Option 1' && styles.radioSelected]}
                      onPress={() => handleOptionSelect('Option 1')}
                    />
                    <View>
                      <Text style={styles.optionText}>Фамилия 1 Имя 1</Text>
                      <Text style={styles.optionDescription}>
                        От 1 ряда 1 клетки до 2 ряда 3 клетки
                      </Text>
                    </View>
                  </View>
                  <View style={styles.radioOption}>
                    <TouchableOpacity
                      style={[styles.radioCircle, selectedOption === 'Option 2' && styles.radioSelected]}
                      onPress={() => handleOptionSelect('Option 2')}
                    />
                    <View>
                      <Text style={styles.optionText}>Фамилия 2 Имя 2</Text>
                      <Text style={styles.optionDescription}>
                        От 2 ряда 4 клетки до 3 ряда 1 клетки
                      </Text>
                    </View>
                  </View>
                  <View style={styles.radioOption}>
                    <TouchableOpacity
                      style={[styles.radioCircle, selectedOption === 'Option 3' && styles.radioSelected]}
                      onPress={() => handleOptionSelect('Option 3')}
                    />
                    <View>
                      <Text style={styles.optionText}>Фамилия 3 Имя 3</Text>
                      <Text style={styles.optionDescription}>
                        От 3 ряда 2 клетки до 4 ряда 20 клетки
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {!isExpanded && (
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: `${progress}%` }]} />
                  <Text style={styles.progressText}>Прогресс: {progress}%</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    } else {
      return (
        <View style={styles.taskCard} key={item.name_task}>
          <Image style={styles.taskImage} source={{ uri: photos[index % photos.length] }} />
          <Text style={styles.taskName}>{item.name_task}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>Прогресс: {progress}%</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.name_task}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    alignItems: 'center',
  },
  taskCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    padding: 16,
    marginVertical: 8,
    maxWidth: '80%',
  },
  innerCard: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  taskImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expandedContent: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: '#999',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#00BFFF',
    borderRadius: 5,
  },
  progressText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
});

export default UraSon;


