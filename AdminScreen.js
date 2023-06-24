import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AdminScreen = () => {
  const [showTasks, setShowTasks] = useState(false);

  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('./profile_picture.png')} // Замените на путь к изображению профиля
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
          <Text style={{ fontSize: 16 }}>Задача 1</Text>
          <Text style={{ fontSize: 16 }}>Задача 2</Text>
          <Text style={{ fontSize: 16 }}>Задача 3</Text>
          {/* Добавьте остальные задачи здесь */}
        </View>
      )}
    </View>
  );
};

export default AdminScreen;

