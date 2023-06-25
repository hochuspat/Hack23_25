import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Calendar = ({ onClose }) => {
  const handleDateSelection = (date) => {
    // Обработка выбранной даты
    console.log('Выбранная дата:', date);
    onClose(); // Закрыть календарь после выбора даты
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Календарь</Text>
      {/* Здесь может быть ваш компонент календаря */}

      <TouchableOpacity onPress={() => handleDateSelection(new Date())} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
};

export default Calendar;
