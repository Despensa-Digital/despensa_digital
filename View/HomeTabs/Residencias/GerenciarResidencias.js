import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Button, List } from 'react-native-paper';
import NovaResidencia from './NovaResidencia';
import { useNavigation } from '@react-navigation/native';


import { getResidencias} from '../../../Controller/Residencia/residenciaController';
const GerenciarResidencias = () => {
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
      <View style={styles.container}>
      <NovaResidencia setModal={setModal} modal={modal} />

        {/*style={modal ? styles.container_blur : styles.container} */}
        {residencias.map((residencia, index) => (
          <List.Item
            key={index}
            title={residencia}
            onPress={() => navigation.navigate('EditarResidencia', {residenciaId: residencia.id})}
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
