import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { PaperProvider, Text, Button, List } from 'react-native-paper';

import NovoMembro from './NovoMembro';
import EditarNomeResidencia from './EditarNomeResidencia';

const EditarResidencia = () => {
    const [modalMembro, setModalMembro] = useState(false);
    const [modalResidencia, setModalResidencia] = useState(false);
    const abrirFecharModalMembro = (valor) => {
      if (modalResidencia == true){
        return
      }
      setModalMembro(valor)
    }
    const abrirFecharModalResidencia = (valor) => {
      if (modalMembro == true){
        return
      }
      setModalResidencia(valor)
    }

  return (
    <PaperProvider style={styles.raiz}>
    <GestureHandlerRootView style={(modalMembro || modalResidencia ? styles.container_blur: styles.container)}>

       <Text style={styles.tituloEditar}>Editar</Text>
            <List.Item
                title="Primeira residência"
                description="Item description"
                onPress={() => abrirFecharModalResidencia(!modalResidencia)}
            />
            <List.Item
                title="Segunda residencia"
                description="Item description"
                onPress={() => abrirFecharModalResidencia(!modalResidencia)}
              />

            <Text style={styles.tituloMembro}>Membro</Text>
            <Button
            buttonColor={(modalMembro || modalResidencia? '#2b5536':'#5DB075')}
            textColor={(modalMembro|| modalResidencia? 'gray':'white')}
            style={{marginTop: 15, marginHorizontal: 20, marginBottom: 20}}
            mode="contained"
            onPress={() => abrirFecharModalMembro(!modalMembro)}>
            Adicionar novo membro
            </Button>
          
              <List.Item
                 title="Primeiro membro"
                 description="Item description"
                 onPress={() => abrirFecharModalMembro(!modalMembro)}
             />
             <List.Item
                 title="Segundo membro"
                 description="Item description"
                 onPress={() => abrirFecharModalMembro(!modalMembro)}
               />

            <Button
            buttonColor={(modalMembro || modalResidencia? '#2b5536':'#5DB075')}
            textColor={(modalMembro|| modalResidencia? 'gray':'white')}
            style={{marginTop: 15, marginHorizontal: 20, marginBottom: 20}}
            mode="contained"
            onPress={() => abrirFecharModalMembro(!modalMembro)}>
            Adicionar novo membro
            </Button>
        

     {modalMembro && (<NovoMembro setModal={abrirFecharModalMembro} modal={modalMembro}/>)}
     {modalResidencia && (<EditarNomeResidencia setModal={abrirFecharModalResidencia} modal={modalResidencia}/>)}

    </GestureHandlerRootView>
    </PaperProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'transparent',
  },
  container_blur: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
    titulo : {
        color: '#00000088',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "Roboto",
        marginTop: 50,
        marginHorizontal: 50
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