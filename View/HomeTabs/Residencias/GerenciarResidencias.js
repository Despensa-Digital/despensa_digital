<<<<<<< HEAD
import { PaperProvider, Text, Button, List } from 'react-native-paper';

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

=======
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text, Button, List } from 'react-native-paper';
import NovaResidencia from './NovaResidencia';
import { useNavigation } from '@react-navigation/native';
>>>>>>> origin/luna_novo

import NovaResidencia from './NovaResidencia';
import { useNavigation } from '@react-navigation/native';


import { getResidencias} from '../../../Controller/Residencia/residenciaController';
const GerenciarResidencias = () => {
<<<<<<< HEAD
    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [residencias, setResidencias] = useState([]);

    
useEffect(()=>{
  carregarResidencia()
},[])


const carregarResidencia = ()=>{
  getResidencias()
      .then(dados => {
          setResidencias(dados)
          
      })

}



    return (
      <PaperProvider style={styles.raiz}>
       <GestureHandlerRootView style={(modal ? styles.container_blur: styles.container)}>

                  {
                    residencias.map((residencia, index)=>(
                      <List.Item
                        key={index}
                        title={residencia.data.nome}
                        style={styles.listItem}
                        right={props => <List.Icon {...props} icon="greenhouse" />}
                        onPress={() => navigation.navigate('EditarResidencia', {residenciaId: residencia.id})}
                      />
                    ))
                  }

                <Button
                    buttonColor={(modal? '#2b5536':'#5DB075')}
                    textColor={(modal? 'gray':'white')}
                    style={{position: 'absolute', bottom:10, alignSelf:"center", width: 300}}
                    mode="contained"
                    onPress={() => setModal(!modal)}>
                    Adicionar nova residência
                </Button>

             {modal && (<NovaResidencia setModal={setModal} modal={modal}/>)}

            </GestureHandlerRootView>


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
absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
  },
  listItem: {
        borderBottomColor: 'rgba(93, 176, 117, .2)',
        borderBottomWidth: 3,
        marginBottom: 0,

    }
});



export default GerenciarResidencias;
=======
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);

  return (
    <PaperProvider style={styles.raiz}>
      <View style={styles.container}>
      <NovaResidencia setModal={setModal} modal={modal} />

        {/*style={modal ? styles.container_blur : styles.container} */}
        {residencias.map((residencia, index) => (
          <List.Item
            key={index}
            title={residencia}
            onPress={() => navigation.navigate('EditarResidencia')}
            style={styles.listItem}
            right={props => <List.Icon {...props} icon="greenhouse" />}
          />
        ))}

        <Button
          buttonColor={'#5DB075'}
          textColor={'white'}
          style={styles.addButton}
          mode="contained"
          onPress={() => setModal(!modal)}
        >
          Adicionar nova residência
        </Button>


      </View>
    </PaperProvider>
  );
};

const residencias = [
  'Minha casa',
  'Casa da mãe',
  'Casa da praia',
  'Casa da Luna',
  'Casa do Vini',
  'Casa do Fake',
  'Casa do Yoichi',
  'Casa do Roberto'
];

const styles = StyleSheet.create({
  raiz: {
    fontFamily: 'Roboto',
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  addButton: {
    position: 'absolute',
    bottom:10,
    alignSelf: 'center',
    width: 300,
  },
  listItem: {
    borderBottomColor: 'rgba(93, 176, 117, .2)',
    borderBottomWidth: 3,
    marginBottom: 0,
  },

});

export default GerenciarResidencias;
>>>>>>> origin/luna_novo
