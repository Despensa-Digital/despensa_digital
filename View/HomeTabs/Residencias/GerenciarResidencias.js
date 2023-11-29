import { PaperProvider, Button, List, IconButton, Snackbar, RadioButton, ActivityIndicator } from 'react-native-paper';

import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import NovaResidencia from './NovaResidencia';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getResidencias } from '../../../Controller/Residencia/residenciaController';
import { getResidenciaStorage, setResidenciaStorage } from '../../../Controller/Despensa/storage';


const GerenciarResidencias = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [residencias, setResidencias] = useState([]);
  const [visible, setVisible] = useState(false)
  const [loading, setLoading]= useState(true);
  const [checked, setChecked] = useState()

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    carregarResidencia()
    carregarResidenciaAtual()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      carregarResidencia()
      return () => console.log("lista atualizada");
    }, [])
  );
  
  const carregarResidencia = () => {
    getResidencias()
      .then(dados => {
        setResidencias(dados)
        setLoading(false)
      })
  }

  const carregarResidenciaAtual = async () =>{
    const id = await getResidenciaStorage()
    setChecked(id)
  }
    

  const setModalComUpdate = (valor) => {
    setModal(valor);
    carregarResidencia()
  }


  const switchCurrentResidencia = async (data) => {
    await setResidenciaStorage(data)
    onToggleSnackBar()
    setChecked(data)
    setTimeout(()=>{
      navigation.goBack()
    }, 1000)
  }

  

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating={true} color="#00ff00" />
      </View>
    )
  }
  return (
    <PaperProvider style={styles.raiz}>
      <View style={styles.container}>
        <NovaResidencia setModal={setModalComUpdate} modal={modal} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {residencias.map((residencia, index) => (
            <List.Item
              key={index}
              title={residencia.data.nome}

              style={styles.listItem}
              // left={props => <IconButton {...props} icon="greenhouse" onPress={()=> switchCurrentResidencia(residencia.id) }/>}
              left={props =>
                <RadioButton {...props}
                  color='#5DB075'
                  
                  status={checked === residencia.id ? 'checked' : 'unchecked'}
                  onPress={() => switchCurrentResidencia(residencia.id)} />}
              right={props =>
                <IconButton {...props} icon="dots-vertical"
                  onPress={() => navigation.navigate('EditarResidencia', { residenciaId: residencia.id })} />}
            />
          ))}
        </ScrollView>

        <Button
          buttonColor={'#5DB075'}
          textColor={'white'}
          style={styles.addButton}
          mode="contained"
          onPress={() => setModal(!modal)}
        >
          Adicionar nova residência
        </Button>

        <View>
          <Snackbar
            style={{ left: 0, right: 0 }}
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={Snackbar.DURATION_SHORT}
            
            action={{
              icon: 'check-decagram'
            }}
          >
            Residência atualizada com sucesso!
          </Snackbar>
        </View>

      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  raiz: {
    fontFamily: "Roboto",
    backgroundColor: "gray",
  },
  titulo: {
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
    bottom: 10,
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