import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, PanResponder, Animated, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const MapScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy < -50) {
          setExpanded(true);
        } else if (gestureState.dy > 50) {
          setExpanded(false);
        }
      },
    })
  ).current;
  const slideUpAnimation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = 'f6c23fb6aa604661b1f83758232406';
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    // Получение данных о погоде при загрузке страницы
    fetchWeatherData(44.543011, 38.084849);
  }, []);

  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const handleAddNote = () => {
    // Добавление заметки
    if (notes.trim() !== '') {
      setNoteList([...noteList, notes]);
      setNotes('');
    }
  };

  useEffect(() => {
    Animated.timing(slideUpAnimation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 44.543011,
          longitude: 38.084849,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 44.543011, longitude: 38.084849 }}
          title="Место на карте"
        />
      </MapView>

      <Animated.View
        style={[
          styles.notesContainer,
          {
            transform: [
              {
                translateY: slideUpAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -300],
                }),
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <ScrollView
          contentContainerStyle={styles.notesContent}
          scrollEnabled={expanded}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.weatherTitle}>Погода</Text>

          {weatherData ? (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherText}>Температура: {weatherData.current.temp_c}°C</Text>
              <Text style={styles.weatherText}>Описание: {weatherData.current.condition.text}</Text>
            </View>
          ) : (
            <Text style={styles.loadingText}>Загрузка данных о погоде...</Text>
          )}

          {expanded && (
            <>
            </>
          )}

          <Text style={styles.notesTitle}>Заметки</Text>

          {showNotes && (
            <View style={styles.notesForm}>
              <TextInput
                style={styles.notesInput}
                placeholder="Добавить заметку..."
                value={notes}
                onChangeText={setNotes}
              />

              <Button title="Добавить" onPress={handleAddNote} />
            </View>
          )}

          <Text style={styles.toggleNotesText} onPress={handleToggleNotes}>
            {showNotes ? 'Скрыть заметки' : 'Показать заметки'}
          </Text>

          {noteList.map((note, index) => (
            <Text style={styles.noteText} key={index}>
              {note}
            </Text>
          ))}

          {expanded && (
            <View style={styles.collapseButtonContainer}>
              <Button title="Свернуть" onPress={() => setExpanded(false)} />
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const App = () => {
  return (
<View style={styles.container}>
      <MapScreen />
    </View>  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  notesContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  notesContent: {
    flexGrow: 1,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  weatherContainer: {
    marginBottom: 16,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 4,
  },
  loadingText: {
    fontSize: 16,
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notesForm: {
    marginBottom: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  toggleNotesText: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  noteText: {
    fontSize: 16,
    marginBottom: 8,
  },
  collapseButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default App;
