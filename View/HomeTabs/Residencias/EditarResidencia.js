import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text, Button, List, Divider } from 'react-native-paper';

import NovoMembro from './NovoMembro';
import EditarNomeResidencia from './EditarNomeResidencia';
import EditarMembro from './EditarMembro';
import ModalExcluir from './ModalExcluir';
import  { getResidencia, deleteResidencia } from '../../../Controller/Residencia/residenciaController';


const EditarResidencia = ({route,navigation}) => {
    const {residenciaId} = route.params;
    const [residencia, setResidencia] = useState({membros:[]});
    const [editarMembro, setEditarMembro] = useState({})


    const [modalMembro, setModalMembro] = useState(false);
    const [modalResidencia, setModalResidencia] = useState(false);
    const [modalEditarMembro, setModalEditarMembro] = useState(false);
    const [modalConfirmarExclusaoResidencia, setModalConfirmarExclusaoResidencia] = useState(false);

    useEffect(()=>{
      editarResidencia(residenciaId, setResidencia);
      return editarResidencia()
    },[])

    const editarResidencia = (id, callback) =>{
      getResidencia(id,callback)
        
    }

    const excluirResidencia = ()=>{
      deleteResidencia(residenciaId)
    }

    const abrirFecharModalMembro = (valor) => {
      if (modalResidencia == true || modalEditarMembro == true){
        return
      }
      setModalMembro(valor)
    }
    const abrirFecharModalResidencia = (valor) => {
      console.log(residencia)
      if (modalMembro == true || modalEditarMembro == true){
        return
      }
      setModalResidencia(valor)
    }
    const abrirFecharModalEditarMembro = (valor, membro) => {
      if (modalMembro == true || modalResidencia == true){
        return
      }
      setModalEditarMembro(valor)
      setEditarMembro(membro)
    }

  return (
    <PaperProvider style={styles.raiz}>
      <View style={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? styles.container_blur : styles.container}>
      <List.Item
              key={"nome-edit-residencia"}
              title={residencia.nome}
              onPress={() => abrirFecharModalResidencia(!modalResidencia)}
              style={styles.listItem}
              right={props => <List.Icon {...props} icon="pencil" />}
              />

        <Text style={styles.tituloMembro}>Membro</Text>
        <Button
          buttonColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#2b5536' : '#5DB075'}
          textColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white'}
          style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 20 }}
          mode="contained"
          onPress={() => abrirFecharModalMembro(!modalMembro)}
        >
          Adicionar novo membro
        </Button>


      {/**
                           {residencia.membros.map((membro, index) => (
                <List.Item
                  key={index}
                  title={membro.nome}
                  description={membro.admin? "Administrador": null}
                  onPress={() => abrirFecharModalEditarMembro(!modalMembro,membro)}
                  style={styles.listItem}
                />
              ))}
       */}

        {residencia.membros.map((membro, index) => (
          <List.Item
            key={index}
            title={membro.nome}
            style={styles.listItem}

            onPress={() => abrirFecharModalEditarMembro(!modalMembro)}
            />
        ))}

        <Button
          textColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white'}
          buttonColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#800000' : '#ff0000'}
          style={styles.buttonExcluir}
          mode="contained"
          onPress={() => setModalConfirmarExclusaoResidencia(true)}
        >
          Excluir residência
        </Button>

        <Button
          textColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#2b5536' : '#5DB075'}
          buttonColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white'}
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonVoltar}
          mode="outlined"
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>

        {modalMembro && (<NovoMembro setModal={abrirFecharModalMembro} modal={modalMembro} />)}
        {modalResidencia && (<EditarNomeResidencia setModal={abrirFecharModalResidencia} modal={modalResidencia} />)}
        {modalEditarMembro && (<EditarMembro setModal={abrirFecharModalEditarMembro} modal={modalEditarMembro} />)}
        {modalConfirmarExclusaoResidencia && (<ModalExcluir setModal={setModalConfirmarExclusaoResidencia} modal={modalConfirmarExclusaoResidencia} />)}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: 'rgba(93, 176, 117, .2)',
    borderBottomWidth: 3,
    marginBottom: 0,
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
  titulo: {
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
    alignSelf: 'flex-start',
    fontSize: 20,
    fontFamily: "Roboto"
  },
  tituloMembro: {
    marginTop: 50,
    marginHorizontal: 15,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontFamily: "Roboto",
  },
  buttonVoltar: {
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonExcluir: {
    marginTop: 50,
    marginHorizontal: 20,
    marginBottom: 5,
  },
});

export default EditarResidencia;
