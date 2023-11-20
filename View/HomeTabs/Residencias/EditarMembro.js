import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ModalExcluir from './ModalExcluir';
import {updateNomeMembro,deleteMembro} from '../../../Controller/Residencia/residenciaController';

const EditarMembro = ({ setModal, modal }) => {
  
  const [nomeMembro, setNomeMembro] = useState('');
  const [modalConfirmarExclusaoMembro, setModalConfirmarExclusaoMembro] = useState(false);


  const alterarNomeMembro = () =>{
    const membroAtualizado = membro
    membroAtualizado.nome = nomeMembro
    setMembro(membroAtualizado)
    updateNomeMembro(residenciaId, membro)
      .then(
        setModal(false)
      )
  }
  


  const excluirMembro = () =>{
    deleteMembro(residenciaId, membro)
      .then(
        setModal(false)
        // Adicionar um navigate para retornar a tela de gerenciamento de residencias
      )
  }

  
  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.modalContainer}>
      {modalConfirmarExclusaoMembro && (
        <ModalExcluir onExcluir={excluirMembro} setModal={setModalConfirmarExclusaoMembro} modal={modalConfirmarExclusaoMembro} />
      )}

        <View style={styles.modalContent}>
        <Button
          buttonColor='red'
          style={styles.buttonRemover}
          mode='contained'
          onPress={() => setModalConfirmarExclusaoMembro(true)}
        >
          Remover membro 
        </Button>

        <Text style={styles.textBox}>Editar nome do membro</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          label='Nome'
          value={nomeMembro}
          onChangeText={(text) => setNomeMembro(text)}
        />
        <Button
          buttonColor='#5DB075'
          style={styles.buttonSave}
          mode='contained'
          //          onPress={() => setModal(false), alterarNomeMembro()}
          onPress={() => alterarNomeMembro()}
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
    marginTop: 20,
    alignSelf:'stretch'
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

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf:'stretch',
  },
  buttonRemover: {
    marginTop: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    alignSelf:'stretch',
  },
  textBox: { alignSelf: 'center', fontSize: 25, marginTop: 20 },
});

export default EditarMembro;
