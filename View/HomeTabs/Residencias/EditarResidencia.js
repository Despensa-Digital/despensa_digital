import { PaperProvider, Text, Button, List } from 'react-native-paper';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet,  SafeAreaView} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BlurView} from "@react-native-community/blur";

import { TextInput } from 'react-native-paper';
import NovoMembro from './NovoMembro';
import { useNavigation } from '@react-navigation/native';

const EditarResidencia = () => {
    const navigation = useNavigation();
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
             <Text style={styles.tituloEditar}>Editar</Text>
                <List.Item
                    title="Primeira residência"
                    description="Item description"
                    onPress={() => setModal(!modal)}
                />
                <List.Item
                    title="Segunda residencia"
                    description="Item description"
                    onPress={() => setModal(!modal)}
                  />

              <Text style={styles.tituloMembro}>Membro</Text>
                             <List.Item
                                 title="Primeiro membro"
                                 description="Item description"
                                 onPress={() => setModal(!modal)}
                             />
                             <List.Item
                                 title="Segundo membro"
                                 description="Item description"
                                 onPress={() => setModal(!modal)}
                               />
                <Button
                    buttonColor='#5DB075'
                    style={{marginTop: 15, marginHorizontal: 20, marginBottom: 20}}
                    mode="contained"
                    onPress={() => setModal(!modal)}>
                    Adicionar novo membro
                </Button>

            </View>
             {modal && (<NovoMembro setModal={setModal}/>)}


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
  },

  tituloEditar: {
    marginTop: 10,
    marginHorizontal: 15,
    alignSelf: 'left',
    fontSize: 20,
    fontFamily: "Roboto"
  },

  tituloMembro: {
      marginTop: 10,
      marginHorizontal: 15,
      alignSelf: 'left',
      fontSize: 20,
      fontFamily: "Roboto",
    }
});



export default EditarResidencia;