import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './LoginPage';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import AdminScreen from './AdminScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
  
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Задачи') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'Карта') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Профиль') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Задачи" component={HomeScreen} />
          <Tab.Screen name="Карта" component={MapScreen} />
          <Tab.Screen name="Профиль" component={AdminScreen} />
        </Tab.Navigator>
      ) : (
        <LoginPage onLogin={handleLogin} /> 
      )}
    </NavigationContainer>
  );
};

export default App;
