import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const NovoMembro = ({ setModal, modal }) => {
  const handleSheetChanges = useCallback((index) => {
    setModal(false);
  }, []);

  const [nomeMembro, setNomeMembro] = useState("");
  const [emailMembro, setEmailMembro] = useState("");

  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={handleSheetChanges}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textBox}>Adicionar novo membro</Text>
        <Text style={styles.textSubtitulo}>Para adicionar um novo membro digite o e-mail e nome abaixo:</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="Nome"
          value={nomeMembro}
          onChangeText={setNomeMembro}
        />
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="E-mail"
          value={emailMembro}
          onChangeText={setEmailMembro}
        />

        <Button
          buttonColor='#5DB075'
          style={styles.buttonSave}
          mode="contained"
          onPress={() => setModal(false)}>
          Enviar convite
        </Button>

        <Button
          colbuttonColoror='white'
          textColor='#5DB075'
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonCancel}
          mode="outlined"
          onPress={() => setModal(false)}>
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
  },
  buttonCancel: {
    alignSelf:'stretch'
  },
  buttonSave: {
    alignSelf:'stretch'
  },
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
  textBox: { alignSelf: 'center', fontSize: 25 },
  textSubtitulo: { alignSelf: 'center', fontSize: 15 }
});

export default NovoMembro;
