import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const NovaResidencia = ({ setModal, modal }) => {
  const [nomeResidencia, setNomeResidencia] = useState('');

  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.textBox}>Nova Residência</Text>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          outlineColor="black"
          label="Nome da residência"
          value={nomeResidencia}
          onChangeText={(nome) => setNomeResidencia(nome)}
        />

        <Button
          buttonColor="#5DB075"
          style={styles.buttonSave}
          mode="contained"
          onPress={() => setModal(false)}
        >
          Salvar nova residência
        </Button>

        <Button
          buttonColor="white"
          textColor="#5DB075"
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonCancel}
          mode="outlined"
          onPress={() => setModal(false)}
        >
          Cancelar
        </Button>
       </View>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    alignSelf:'stretch'
  },
  buttonCancel: {
    alignSelf:'stretch'
  },
  buttonSave: {
    alignSelf:'stretch'
  },
  textBox: { alignSelf: 'center', fontSize: 25 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default NovaResidencia;
