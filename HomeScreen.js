import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://10.1.1.38:8000/api/tasks/');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = (taskName) => {
    setSelectedTask(taskName);
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    if (inputValue !== '') {
      sendCompletionToServer(selectedTask, inputValue);
    }
    setInputValue('');
    setIsModalVisible(false);
  };

  const sendCompletionToServer = async (taskName, value) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/save_data/', {
        id: taskName,
        collected: value,
        add_file: null
      });
      console.log(response.data);
      // Обработать ответ от сервера при необходимости
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderTaskCard = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskName}>{item.name_task}</Text>
      <Text>{item.field_size}</Text>
      <Text>{item.max_deadlines}</Text>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => handleCompleteTask(item.name_task)}
      >
        <Text style={styles.buttonText}>Завершить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Задачи</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.name_task}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Введите цифру:</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleModalConfirm}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  completeButton: {
    backgroundColor: '#741414',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: '#741414',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
});

export default HomeScreen;
