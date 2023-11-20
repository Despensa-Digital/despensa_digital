import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { updateNomeResidencia } from '../../../Controller/Residencia/residenciaController';

const EditarNomeResidencia = ({residenciaId,editarNomeResidencia,setModal, modal}) => {
    // variables
    const [nomeResidencia, setNomeResidencia] = React.useState(editarNomeResidencia)

    const alterarNomeResidencia = ()=>{
      updateNomeResidencia(residenciaId, nomeResidencia,true,false)
      .then(
        setModal(false)
      )
    }

  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textBox}>Editar nome</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label='Nome'
          value={nomeResidencia}
          onChangeText={(nome) => setNomeResidencia(nome)}
        />
        <Button
          buttonColor='#5DB075'
          style={styles.buttonSave}
          mode='contained'
          onPress={() => alterarNomeResidencia()}
        >
          Salvar alteração
        </Button>

        <Button
          buttonColor='white'
          style={styles.buttonCancel}
          mode='outlined'
          onPress={() => setModal(false)}
          textColor='#5DB075'
          theme={{ colors: { outline: '#5DB075' } }}
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
  textSubtitulo: { alignSelf: 'stretch', fontSize: 15 },
});

export default EditarNomeResidencia;
