import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { BottomSheet } from '@gorhom/bottom-sheet';
import ModalExcluir from './ModalExcluir';
import {updateNomeMembro,deleteMembro} from '../../../Controller/Residencia/residenciaController';

const EditarMembro = ({ setModal, modal }) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setModal(false);
    }
  }, []);

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
    <BottomSheet
      ref={bottomSheetRef}
      index={modal ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      {modalConfirmarExclusaoMembro && (
        <ModalExcluir onExcluir={excluirMembro} setModal={setModalConfirmarExclusaoMembro} modal={modalConfirmarExclusaoMembro} />
      )}

      <View style={styles.contentContainer}>
        <Button
          color='red'
          style={styles.buttonRemover}
          mode='contained'
          onPress={() => setModalConfirmarExclusaoMembro(true)}
        >
          Remover membro da residência
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
          color='#5DB075'
          style={styles.buttonSave}
          mode='contained'
          //          onPress={() => setModal(false), alterarNomeMembro()}
          onPress={() => alterarNomeMembro()}
        >
          Salvar alteração
        </Button>

        <Button
          color='#5DB075'
          style={styles.buttonCancel}
          mode='outlined'
          onPress={() => setModal(false)}
        >
          Cancelar
        </Button>
      </View>
    </BottomSheet>
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
  },
  buttonCancel: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  buttonSave: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  buttonRemover: {
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  textBox: { alignSelf: 'center', fontSize: 25, marginTop: 20 },
});

export default EditarMembro;
