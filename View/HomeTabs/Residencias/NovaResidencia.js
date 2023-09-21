import { PaperProvider, Text, Button } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { TextInput } from 'react-native-paper';

const NovaResidencia = ({setModal, modal}) => {
    const bottomSheetRef = useRef();
    const snapPoints = useMemo(() => ['25%', '45%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            setModal(false);
        }
      }, []);

    // variables
    const [nomeResidencia, setNomeResidencia] = React.useState("");


    return (
              <BottomSheet
              style={{ flex: 1 }}
                ref={bottomSheetRef}
                index={(modal? 1: -1)}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                >
                <View style={styles.contentContainer}>
                  <Text style={styles.textBox}>Nova Residência</Text>
                  <TextInput
                        style={styles.textInput}
                        mode= 'outlined'
                        outlineColor= 'black'
                        label="Nome da residência"
                        value={nomeResidencia, setNomeResidencia}
                        onChangeText={nomeResidencia => setNomeResidencia(nomeResidencia)}
                      />

                  <Button
                    buttonColor='#5DB075'
                    textColor='white'
                    style={styles.buttonSave}
                    mode="contained"
                    onPress={() => setModal(false)}>
                    Salvar nova residência
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
        marginTop: 10,
        marginHorizontal: 20,
    },

    buttonSave: {
        marginTop: 10,
        marginHorizontal: 20,

    },

    textBox: {alignSelf: 'center', fontSize: 25}
});



export default NovaResidencia;