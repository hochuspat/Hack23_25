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
    // Add other photo URLs to the array
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
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
        <Animated.View style={cardStyles} {...panResponder.panHandlers} key={item.name_task}>
          <TouchableOpacity
            style={styles.innerCard}
            onPress={() => toggleTaskExpansion(item.name_task)}
          >
            <Image style={styles.taskImage} source={{ uri: photos[index % photos.length] }} />
            <Text style={styles.taskName}>{item.name_task}</Text>
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
        </Animated.View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.taskCard} key={item.name_task}>
          <Image style={styles.taskImage} source={{ uri: photos[index % photos.length] }} />
          <Text style={styles.taskName}>{item.name_task}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>Прогресс: {progress}%</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.name_task}
        contentContainerStyle={styles.cardContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  taskCard: {
    width: 400,
    height: 500,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  innerCard: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  expandedContent: {
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
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
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UraSon;
