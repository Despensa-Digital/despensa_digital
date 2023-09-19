import { PaperProvider, Text, Button } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { TextInput } from 'react-native-paper';


const EditarResidencia = () => {
    return (
        <PaperProvider style={styles.raiz}>
                <View style={modal ? styles.card : ""}>
                <Text
                    style={styles.titulo}>
                    Editar
                </Text>
                <Button
                    buttonColor='#5DB075'
                    style={{ marginTop: 50, marginHorizontal: 20 }}
                    mode="contained"
                    onPress={() => setModal(!modal)}>
                    Abrir/fechar modal
                </Button>
            </View>


        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    raiz: {
        fontFamily: "Roboto"
    },
  titulo : {
        color: '#00000088',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "Roboto",
        marginTop: 50,
        marginHorizontal: 50
    },
   card: {
        backgroundColor: 'pink',
        },
});



export default EditarResidencia;