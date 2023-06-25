import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AdminScreen = () => {
  const [showTasks, setShowTasks] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://10.1.1.38:8000/api/tasks/');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('./profile_picture.png')}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Имя Фамилия</Text>
          <Text style={{ fontSize: 16 }}>Об аккаунте</Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleTasks} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>История задач</Text>
        <Text style={{ fontSize: 18 }}>{showTasks ? '-' : '+'}</Text>
      </TouchableOpacity>

      {showTasks && (
        <View style={{ marginTop: 10 }}>
          {tasks.map((task, index) => (
            <Text style={{ fontSize: 16 }} key={index}>
              {task.title}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default AdminScreen;

