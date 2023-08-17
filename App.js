import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './LoginPage';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import AdminScreen from './AdminScreen';
import Zadacha2 from './Zadacha2';
import PhenophasesScreen from './PhenophasesScreen';
import UraSon from './UraSon';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const renderTabNavigator = () => {
    if (userRole === 'admin2') {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Задачи') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'Карта') {
                iconName = focused ? 'ios-map' : 'ios-map-outline';
              } else if (route.name === 'Профиль') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              } else if (route.name === 'Фенофазы') {
                iconName = focused ? 'ios-flower' : 'ios-flower-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#741414',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Задачи" component={Zadacha2} />
          <Tab.Screen name="Карта" component={MapScreen} />
          <Tab.Screen name="Профиль" component={AdminScreen} />
          <Tab.Screen name="Фенофазы" component={PhenophasesScreen} />
        </Tab.Navigator>
      );
    } else if (userRole === 'admin3') {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Задачи') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'Карта') {
                iconName = focused ? 'ios-map' : 'ios-map-outline';
              } else if (route.name === 'Профиль') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              } else if (route.name === 'Фенофазы') {
                iconName = focused ? 'ios-flower' : 'ios-flower-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#741414',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Задачи" component={UraSon} />
          <Tab.Screen name="Карта" component={MapScreen} />
          <Tab.Screen name="Профиль" component={AdminScreen} />
          <Tab.Screen name="Фенофазы" component={PhenophasesScreen} />
        </Tab.Navigator>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        renderTabNavigator()
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default App;
