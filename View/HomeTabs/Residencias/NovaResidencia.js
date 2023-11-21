<<<<<<< HEAD
import { PaperProvider, Text, Button } from 'react-native-paper';

import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';

import { postResidencia } from '../../../Controller/Residencia/residenciaController';

const NovaResidencia = ({ setModal, modal }) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['45%', '60%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setModal(false);
    }
  }, []);

  // variables
  const [nomeResidencia, setNomeResidencia] = useState("");

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const adicionarResidencia = () =>{
    postResidencia(nomeResidencia)
    .then(
      setModal(false)
    )
  }
  


  return (
    <BottomSheet
      style={{ flex: 1 }}
      ref={bottomSheetRef}
      index={(modal ? 1 : -1)}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textBox}>Nova Residência</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="Nome da residência"
          value={nomeResidencia}
          onChangeText={nomeResidencia => setNomeResidencia(nomeResidencia)}
        />

        <Button
          buttonColor='#5DB075'
          textColor='white'
          style={styles.buttonSave}
          mode="contained"
          onPress={() => adicionarResidencia()}>
=======
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
>>>>>>> origin/luna_novo
          Salvar nova residência
        </Button>

        <Button
<<<<<<< HEAD
          buttonColor='white'
          textColor='#5DB075'
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonCancel}
          mode="outlined"
          onPress={() => adicionarResidencia()}>
          Cancelar
        </Button>
      </View>
    </BottomSheet>

=======
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
>>>>>>> origin/luna_novo
  );
};

const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: 'transparent',
  },
<<<<<<< HEAD

=======
>>>>>>> origin/luna_novo
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#fff',
  },
  contentContainer: {
<<<<<<< HEAD

=======
>>>>>>> origin/luna_novo
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
<<<<<<< HEAD
  },

  buttonCancel: {
    marginTop: 10,
    marginHorizontal: 20,
  },

  buttonSave: {
    marginTop: 10,
    marginHorizontal: 20,

  },

  textBox: { alignSelf: 'center', fontSize: 25 }
});



export default NovaResidencia;
=======
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
>>>>>>> origin/luna_novo
