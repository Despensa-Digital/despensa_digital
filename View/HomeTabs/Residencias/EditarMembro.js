import { PaperProvider, Text, Button } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet  from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';
import { Modal } from "native-base";
import ModalExcluir from './ModalExcluir';

const EditarMembro = ({setModal, modal}) => {
    const bottomSheetRef = useRef();
    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            setModal(false);
        }
      }, []);

    // variables
    const [nomeMembro, setNomeMembro] = React.useState("")
    const [modalConfirmarExclusaoMembro, setModalConfirmarExclusaoMembro] = useState(false);

    return (
              <BottomSheet
                ref={bottomSheetRef}
                index={(modal? 1: -1)}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                >
                 {modalConfirmarExclusaoMembro && (<ModalExcluir setModal={setModalConfirmarExclusaoMembro} modal={modalConfirmarExclusaoMembro}/>)}

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
                        value={nomeMembro, setNomeMembro}
                        onChangeText={nomeMembro => setNomeMembro(nomeMembro)}
                      />
                  <Button
                    buttonColor='#5DB075'
                    textColor='white'
                    style={styles.buttonSave}
                    mode="contained"
                    onPress={() => setModal(false)}>
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