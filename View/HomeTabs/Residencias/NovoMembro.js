<<<<<<< HEAD
import { PaperProvider, Text, Button } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet, SafeAreaView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { TextInput } from 'react-native-paper';

const NovoMembro = ({ setModal, modal }) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '65%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setModal(false);
    }
  }, []);

  // variables
  const [nomeMembro, setNomeMembro] = React.useState("");
  const [emailMembro, setEmailMembro] = React.useState("");


  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={(modal ? 1 : -1)}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textBox}>Adicionar novo membro</Text>
=======
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
>>>>>>> origin/luna_novo
        <Text style={styles.textSubtitulo}>Para adicionar um novo membro digite o e-mail e nome abaixo:</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="Nome"
          value={nomeMembro}
<<<<<<< HEAD
          onChangeText={nomeMembro => setNomeMembro(nomeMembro)}
=======
          onChangeText={setNomeMembro}
>>>>>>> origin/luna_novo
        />
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="E-mail"
          value={emailMembro}
<<<<<<< HEAD
          onChangeText={emailMembro => setEmailMembro(emailMembro)}
=======
          onChangeText={setEmailMembro}
>>>>>>> origin/luna_novo
        />

        <Button
          buttonColor='#5DB075'
<<<<<<< HEAD
          textColor='white'
=======
>>>>>>> origin/luna_novo
          style={styles.buttonSave}
          mode="contained"
          onPress={() => setModal(false)}>
          Enviar convite
        </Button>

        <Button
<<<<<<< HEAD
          buttonColor='white'
=======
          colbuttonColoror='white'
>>>>>>> origin/luna_novo
          textColor='#5DB075'
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonCancel}
          mode="outlined"
          onPress={() => setModal(false)}>
          Cancelar
        </Button>
      </View>
<<<<<<< HEAD
    </BottomSheet>
=======
      </View>

    </Modal>
>>>>>>> origin/luna_novo
  );
};

const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: 'transparent',
  },
<<<<<<< HEAD

  container: {
    //position: "absolute",
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#fff'
=======
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#fff',
>>>>>>> origin/luna_novo
  },
  contentContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
  },
<<<<<<< HEAD

  buttonCancel: {
    marginTop: 10,
    marginHorizontal: 20,
  },

  buttonSave: {
    marginTop: 10,
    marginHorizontal: 20,

  },

  textBox: { alignSelf: 'center', fontSize: 25 },

  textSubtitulo: { alignSelf: 'center', fontSize: 15 }
});



export default NovoMembro;
=======
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
>>>>>>> origin/luna_novo
