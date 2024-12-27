import React, { useState } from 'react';
import { View, TextInput, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface Props{
    MaxNumber:number,
    getNumber:React.Dispatch<React.SetStateAction<number>>
    modalTitle?:string,
    placeholder?:string
}


const ListNumberInput = ({getNumber,MaxNumber,modalTitle="Selecine um número",placeholder="insira um número"}:Props) => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  let numbers:number[]=[]
  for(let i=1;i<=MaxNumber;i++){
    numbers.push(i)
  }

  const selectNumber = (number:number) => {
    setSelectedNumber(number)
    getNumber(number);  // Define o número selecionado no TextInput
    setModalVisible(false); // Fecha o modal
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={String(selectedNumber)}
        onFocus={() => setModalVisible(true)}  
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            {numbers.map((numero) => (
              <TouchableOpacity
                key={numero}
                style={styles.modalItem}
                onPress={() => selectNumber(numero)}
              >
                <Text style={styles.modalItemText}>{numero}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  modalItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ListNumberInput;
