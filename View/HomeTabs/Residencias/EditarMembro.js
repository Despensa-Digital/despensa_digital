<<<<<<< HEAD
import { PaperProvider, Text, Button } from 'react-native-paper';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet  from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';
import ModalExcluir from './ModalExcluir';

import {updateNomeMembro,deleteMembro} from '../../../Controller/Residencia/residenciaController';

const EditarMembro = ({residenciaId, editarMembro, setModal, modal}) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
          setModal(false);
      }
    }, []);

  // variables
  const [membro, setMembro] = React.useState(editarMembro)
  const [nomeMembro, setNomeMembro] = useState(editarMembro.nome);
  const [modalConfirmarExclusaoMembro, setModalConfirmarExclusaoMembro] = useState(false);
 

  // useEffect(() => {
    
  // }, [])

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
                index={(modal? 1: -1)}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                >
                 {modalConfirmarExclusaoMembro && 
                  (<ModalExcluir 
                    resetModal={setModalConfirmarExclusaoMembro} 
                    modal={modalConfirmarExclusaoMembro} 
                    onExcluir={excluirMembro}
                  />)
                }

                <View style={styles.contentContainer}>
                <Button
                    buttonColor='red'
                    textColor='white'
                    style={styles.buttonRemover}
                    mode="contained"
                    onPress={() => setModalConfirmarExclusaoMembro(true)}>
                    Remover membro da residência
                  </Button>
                  
                  <Text style={styles.textBox}>Editar nome do membro</Text>
                  <TextInput
                        style={styles.textInput}
                        mode= 'outlined'
                        outlineColor= 'black'
                        label="Nome"
                        value={nomeMembro}
                        onChangeText={nomeMembro => setNomeMembro(nomeMembro)}
                      />
                  <Button
                    buttonColor='#5DB075'
                    textColor='white'
                    style={styles.buttonSave}
                    mode="contained"
                    onPress={() => alterarNomeMembro()}>
                    Salvar alteração
                  </Button>

                  <Button
                    buttonColor='white'
                    textColor='#5DB075'
                    theme={{ colors: { outline: '#5DB075' } }}
                    style={styles.buttonCancel}
                    mode="outlined"
                    onPress={() => setModal(false)}>
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

    container: {
        //position: "absolute",
        flex: 1,
        backgroundColor: 'gray',
        borderRadius: 10,
        borderColor: '#fff'
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

    textBox: {alignSelf: 'center', fontSize: 25, marginTop:20, },

    textSubtitulo: {alignSelf: 'center', fontSize: 15}
});



export default EditarMembro;
=======
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ModalExcluir from './ModalExcluir';

const EditarMembro = ({ setModal, modal }) => {
  
  const [nomeMembro, setNomeMembro] = useState('');
  const [modalConfirmarExclusaoMembro, setModalConfirmarExclusaoMembro] = useState(false);

  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.modalContainer}>
      {modalConfirmarExclusaoMembro && (
        <ModalExcluir setModal={setModalConfirmarExclusaoMembro} modal={modalConfirmarExclusaoMembro} />
      )}

        <View style={styles.modalContent}>
        <Button
          buttonColor='red'
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
          buttonColor='#5DB075'
          style={styles.buttonSave}
          mode='contained'
          onPress={() => setModal(false)}
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
  buttonRemover: {
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  textBox: { alignSelf: 'center', fontSize: 25, marginTop: 20 },
});

export default EditarMembro;
>>>>>>> origin/luna_novo
