import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet } from 'react-native';

const Card = ({ title, description, date, onComplete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setModalVisible(true);
  };

  const handleFinish = () => {
    setModalVisible(false);
    setIsCompleted(true);
    onComplete();
  };

  return (
    <View style={styles.cardContainer}>
      {!isCompleted && (
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text>{description}</Text>
          <Text style={styles.cardDate}>{date}</Text>

          <Button title="Завершить" onPress={handleComplete} />
        </View>
      )}

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Введите комментарий:</Text>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
            />

            <Button title="Завершить" onPress={handleFinish} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  cardContent: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDate: {
    fontStyle: 'italic',
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
    padding: 8,
  },
});

export default Card;
