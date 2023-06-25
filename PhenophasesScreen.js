import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const RoadmapScreen = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [completedStages, setCompletedStages] = useState({});

  useEffect(() => {
    // Simulating random completion marks for the stages
    generateRandomCompletion();
  }, []);

  useEffect(() => {
    generateRandomCompletion();
  }, [selectedDate]);

  const handleOpenCalendar = () => {
    setCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    handleCloseCalendar();
  };

  const generateRandomCompletion = () => {
    const getRandomCompletion = () => Math.random() < 0.5;
    const randomCompletedStages = phenophases.reduce(
      (acc, stage) => ({ ...acc, [stage.phaseNumber]: getRandomCompletion() }),
      {}
    );
    setCompletedStages(randomCompletedStages);
  };

  const renderYearArrow = (direction) => {
    return (
      <View style={styles.yearArrowContainer}>
        <Text style={styles.yearArrowText}>{direction === 'left' ? '<' : '>'}</Text>
      </View>
    );
  };

  const phenophases = [
    { phaseNumber: '01', description: 'Период покоя' },
    { phaseNumber: '02', description: 'Вздутие почек' },
    { phaseNumber: '03', description: 'Открытие почек' },
    { phaseNumber: '04', description: 'Развитие листьев' },
    { phaseNumber: '05', description: 'Цветение' },
    { phaseNumber: '06', description: 'Плодоношение' },
    { phaseNumber: '07', description: 'Созревание' },
    { phaseNumber: '08', description: 'Сбор урожая' },
  ];

  const renderPhenophases = () => {
    return phenophases.map((phase, index) => (
      <View key={index} style={index !== 0 ? styles.phaseWithMargin : styles.phase}>
        <View
          style={[
            styles.phaseIndicator,
            completedStages[phase.phaseNumber] ? styles.completedPhase : null,
          ]}
        >
          <Text style={styles.phaseNumberText}>{phase.phaseNumber}</Text>
        </View>
        <View style={styles.phaseTextContainer}>
          <Text style={styles.phaseDescription}>{phase.description}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenCalendar} style={styles.calendarButton}>
        <Text style={styles.calendarButtonText}>Открыть календарь</Text>
      </TouchableOpacity>

      <Modal visible={isCalendarOpen} animationType="slide" onRequestClose={handleCloseCalendar}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleCloseCalendar} style={styles.closeButton}>
            <Text style={styles.buttonText}>Закрыть</Text>
          </TouchableOpacity>
          <CalendarList
            display="years"
            renderArrow={renderYearArrow}
            onDayPress={handleDayPress}
            markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
          />
        </View>
      </Modal>

      <View style={styles.phenophaseContainer}>{renderPhenophases()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  calendarButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#741414',
    padding: 10,
    borderRadius: 5,
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
  },
  phenophaseContainer: {
    marginTop: 50,
  },
  phase: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  phaseWithMargin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  phaseIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#741414',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedPhase: {
    backgroundColor: '#28A745', // Green color for completed stages
  },
  phaseNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  phaseTextContainer: {
    marginLeft: 20,
  },
  phaseDescription: {
    fontSize: 18,
    color: '#741414',
  },
  yearArrowContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearArrowText: {
    fontSize: 18,
    color: '#741414',
  },
});

export default RoadmapScreen;








