import { PaperProvider, Text, Button } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { TextInput } from 'react-native-paper';

const NovoMembro = ({setModal}) => {
    // ref
    const bottomSheetRef = useRef();

    // variables
    const snapPoints = useMemo(() => [1000, 1000], []);    const [nomeMembro, setNomeMembro] = React.useState("");
    const [emailMembro, setEmailMembro] = React.useState("");

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    }, []);

    return (


        <GestureHandlerRootView style={styles.container} >
              <BottomSheet
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                >
                <View style={styles.container}>
                  <Text style={styles.textBox}>Adicionar novo membro</Text>
                  <Text style={styles.textSubtitulo}>Para adicionar um novo membro digite o e-mail e nome abaixo:</Text>
                  <TextInput
                        style={styles.textInput}
                        mode= 'outlined'
                        outlineColor= 'black'
                        label="Nome"
                        value={nomeMembro, setNomeMembro}
                        onChangeText={nomeMembro => setNomeMembro(nomeMembro)}
                      />
                  <TextInput
                                style={styles.textInput}
                                mode= 'outlined'
                                outlineColor= 'black'
                                label="E-mail"
                                value={emailMembro, setEmailMembro}
                                onChangeText={emailMembro => setEmailMembro(emailMembro)}
                              />

                  <Button
                    buttonColor='#5DB075'
                    textColor='white'
                    style={styles.buttonSave}
                    mode="contained"
                    onPress={() => setModal(false)}>
                    Enviar convite
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

            </GestureHandlerRootView>
        );
};

const styles = StyleSheet.create({
    sheetStyle: {
        backgroundColor: 'transparent',
    },

    container: {
        //position: "absolute",
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderColor: '#fff'
    },
  contentContainer: {

    ///flex: 1,
    ///alignItems: 'center',
  },
    textInput: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
      },

    buttonCancel: {
        marginTop: 10,
        marginHorizontal: 20,
    },

    buttonSave: {
        marginTop: 10,
        marginHorizontal: 20,

    },

    textBox: {alignSelf: 'center', fontSize: 25},

    textSubtitulo: {alignSelf: 'center', fontSize: 15}
});



export default NovoMembro;