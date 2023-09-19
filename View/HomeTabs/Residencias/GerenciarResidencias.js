import { PaperProvider, Text, Button, List } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BlurView} from "@react-native-community/blur";

import { TextInput } from 'react-native-paper';
import NovaResidencia from './NovaResidencia';


const GerenciarResidencias = () => {
    const [modal, setModal] = useState(false);
    return (
        <PaperProvider style={styles.raiz}>

                  <View>

             {modal && (
               <BlurView
                    style={styles.absolute}
                    blurType="dark"
                    blurAmount={90}
                  />
             )}
                <List.Item
                    title="First Item"
                    description="Item description"
                />
                <List.Item
                    title="Second Item"
                    description="Item description"
                  />

                <Button
                    buttonColor='#5DB075'
                    style={{marginTop: 15, marginHorizontal: 20, marginBottom: 20}}
                    mode="contained"
                    onPress={() => setModal(!modal)}>
                    Abrir/fechar modal
                </Button>
            </View>
             {modal && (<NovaResidencia setModal={setModal}/>)}

        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    raiz: {
        fontFamily: "Roboto",
        backgroundColor: "gray",
    },
  titulo : {
        color: '#00000088',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "Roboto",
        marginTop: 50,
        marginHorizontal: 50
    },

absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
  }
});



export default GerenciarResidencias;