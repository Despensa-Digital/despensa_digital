import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';


const NovoMembro = ({ setModal, modal }) => {
  const handleSheetChanges = useCallback((index) => {
    setModal(false);
  }, []);

  // variables
  const [nomeMembro, setNomeMembro] = React.useState("");
  const [emailMembro, setEmailMembro] = React.useState("");


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
          onChangeText={nomeMembro => setNomeMembro(nomeMembro)}
        />
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="E-mail"
          value={emailMembro}
          onChangeText={emailMembro => setEmailMembro(emailMembro)}
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
    borderColor: '#fff'
  },
  contentContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    alignSelf:'stretch',
  },
  buttonCancel: {
    alignSelf:'stretch',
    marginTop: 20,
  },

  buttonSave: {
    alignSelf:'stretch',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf:'stretch',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf:'stretch',
  },

  textBox: { alignSelf: 'center', fontSize: 25 },

  textSubtitulo: { alignSelf: 'center', fontSize: 15 }
});



export default NovoMembro;
