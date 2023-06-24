import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Input = ({ label, errorText, ...props }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: errorText ? 'red' : 'gray',
          borderRadius: 14,
          padding: 10,
          backgroundColor: '#AB6E6D',
          textAlign: 'center',
          color: 'white',
        }}
        {...props}
      />
      {errorText ? <Text style={{ color: 'red' }}>{errorText}</Text> : null}
    </View>
  );
};

const LoginPage = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://10.1.1.38:8000/api/user-credentials/');
    setUsers(response.data.credentials);
    console.log(response.data.credentials);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    const user = users.find((user) => user.login === login && user.password === password);
    if (user) {
      if (user.role === 'admin') {
        navigation.navigate('AdminScreen');
      } else {
        onLogin(); // Вызываем функцию onLogin, переданную из App.js
      }
    } else {
      Alert.alert('Неверный логин или пароль');
    }
  };

  return (
    <View style={{ flex: 1, padding: 40, backgroundColor: '#EEE8DC' }}>
      <View style={{ top: 220 }}>
        <Text style={{ fontSize: 24, left: 120 }}>Вход</Text>
        <Input label="Логин" value={login} onChangeText={setLogin} required />
        <Input label="Пароль" value={password} onChangeText={setPassword} secureTextEntry={true} required />
        <TouchableOpacity
          style={{
            backgroundColor: '#741414',
            borderRadius: 99,
            paddingVertical: 12,
            marginTop: 20,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
