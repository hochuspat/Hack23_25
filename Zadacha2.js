import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Zadacha2 = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState(0);

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

  const renderTaskCard = ({ item }) => {
    const isExpanded = expandedTask === item.name_task;

    return (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => toggleTaskExpansion(item.name_task)}
      >
        <Text style={styles.taskName}>{item.name_task}</Text>
        <Text>{item.field_size}</Text>
        <Text>{item.max_deadlines}</Text>
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
            <View
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
            <Text style={styles.progressText}>Прогресс: {progress}%</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Задачи</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.name_task}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EEE8DC',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expandedContent: {
    marginTop: 16,
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
    borderColor: '#741414',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#741414',
  },
  optionText: {
    fontSize: 14,
  },
  optionDescription: {
    fontSize: 12,
    marginLeft: 28,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#741414',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default Zadacha2;

