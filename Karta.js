import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import axios from 'axios'; // Добавленный модуль для отправки и получения данных с сервера

const App = () => {
  const [region, setRegion] = useState({
    latitude: 55.7558,
    longitude: 37.6173,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedField, setSelectedField] = useState([]);

  const [fields, setFields] = useState([]);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedField([...selectedField, { latitude, longitude }]);
  };

  const resetField = () => {
    setSelectedField([]);
  };

  const saveField = async () => {
    try { // Добавлен блок try-catch для обработки ошибок
      if (selectedField.length > 2) {
        const fieldData = {
          name: 'Новое поле',
          crop: 'Неизвестно',
          coordinates: selectedField.map((point) => [
            point.longitude,
            point.latitude,
          ]),
        };

        const response = await axios.post(
          'http://10.1.1.26:3000/fields',
          fieldData
        );

        const savedField = response.data;

        setFields([...fields, savedField]);

        resetField();
      } else {
        alert('Нужно выделить хотя бы три точки');
      }
    } catch (error) {
      console.error(error);
      alert('Не удалось сохранить поле');
    }
  };

  const fetchFields = async () => {
    try { // Добавлен блок try-catch для обработки ошибок
      const response = await axios.get('http://10.1.1.26:3000/fields');
      const fieldsData = response.data;
      setFields(fieldsData);
    } catch (error) {
      console.log(error);
      alert('Не удалось загрузить поля');
    }
  };
  
  useEffect(() => {
    fetchFields(); 
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Приложение для выделения полей на карте</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handlePress}
      >
        {fields.map((field) => (
          <Polygon
            key={field._id}
            coordinates={field.coordinates.map((point) => ({
              latitude: point[1],
              longitude: point[0],
            }))}
            fillColor="green"
            strokeColor="black"
            strokeWidth={2}
          />
        ))}
        {selectedField.length > 0 && (
          <Polygon
            coordinates={selectedField}
            fillColor="yellow"
            strokeColor="black"
            strokeWidth={2}
          />
        )}
      </MapView>
      <Button title="Сохранить поле" onPress={saveField} />
      <Button title="Сбросить поле" onPress={resetField} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default App;