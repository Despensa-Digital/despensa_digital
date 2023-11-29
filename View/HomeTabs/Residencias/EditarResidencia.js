import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Text, Button, List, Snackbar, View } from 'react-native-paper';

import NovoMembro from './NovoMembro';
import EditarNomeResidencia from './EditarNomeResidencia';
import EditarMembro from './EditarMembro';
import ModalExcluir from './ModalExcluir';

import { getResidencia, deleteResidencia } from '../../../Controller/Residencia/residenciaController';


const EditarResidencia = ({ route, navigation }) => {
  const { residenciaId } = route.params;
  const [residencia, setResidencia] = useState({ membros: [] });
  const [editarMembro, setEditarMembro] = useState({})

  //Modal
  const [modalMembro, setModalMembro] = useState(false);
  const [modalResidencia, setModalResidencia] = useState(false);
  const [modalEditarMembro, setModalEditarMembro] = useState(false);
  const [modalConfirmarExclusaoResidencia, setModalConfirmarExclusaoResidencia] = useState(false);

  //Snackbar
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    editarResidencia(residenciaId, setResidencia);
    return editarResidencia()
  }, [])

  const editarResidencia = (id, callback) => {
    getResidencia(id, callback)

  }

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);


  const excluirResidencia = () => {
    deleteResidencia(residenciaId)
    onToggleSnackBar()
    setTimeout(() => {
      navigation.goBack()
    }, 2000)
  }

  const abrirFecharModalMembro = (valor) => {
    if (modalResidencia == true || modalEditarMembro == true) {
      return
    }
    setModalMembro(valor)
  }
  const abrirFecharModalResidencia = (valor) => {
    if (modalMembro == true || modalEditarMembro == true) {
      return
    }
    setModalResidencia(valor)
  }
  const abrirFecharModalEditarMembro = (valor, membro) => {
    if (modalMembro == true || modalResidencia == true) {
      return
    }
    setModalEditarMembro(valor)
    setEditarMembro(membro)
  }



  return (
    <PaperProvider style={styles.raiz}>
      <GestureHandlerRootView style={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? styles.container_blur : styles.container)}>

        <Text style={styles.tituloEditar}>Editar</Text>
        <List.Item
          title={residencia.nome}
          onPress={() => abrirFecharModalResidencia(!modalResidencia)}
          style={styles.listItem}

        />

        <Text style={styles.tituloMembro}>Membro</Text>
        <Button
          buttonColor={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#2b5536' : '#5DB075')}
          textColor={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white')}
          style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 20 }}
          mode="contained"
          onPress={() => abrirFecharModalMembro(!modalMembro)}>
          Adicionar novo membro
        </Button>

        {residencia.membros.map((membro, index) => (
          <List.Item
            key={index}
            title={membro.nome}
            description={membro.admin ? "Administrador" : null}
            onPress={() => abrirFecharModalEditarMembro(!modalMembro, membro)}
            style={styles.listItem}
          />
        ))}

        <Button
          textColor={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white')}
          buttonColor={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#800000' : '#ff0000')}
          style={styles.buttonExcluir}
          mode="contained"
          onPress={() => setModalConfirmarExclusaoResidencia(true)}>
          Excluir residência
        </Button>

        <Button
          textColor={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#2b5536' : '#5DB075')}
          buttonColor={(modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white')}
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonVoltar}
          mode="outlined"
          //setModal(false)
          onPress={() => navigation.goBack()}>
          Voltar
        </Button>
        
        {modalMembro && (<NovoMembro residenciaId={residenciaId} setModal={abrirFecharModalMembro} modal={modalMembro} />)}
        {modalResidencia && (<EditarNomeResidencia residenciaId={residenciaId} editarNomeResidencia={residencia.nome} setModal={abrirFecharModalResidencia} modal={modalResidencia} />)}
        {modalEditarMembro && (<EditarMembro residenciaId={residenciaId} editarMembro={editarMembro} setModal={abrirFecharModalEditarMembro} modal={modalEditarMembro} />)}
        {modalConfirmarExclusaoResidencia && (<ModalExcluir setModal={setModalConfirmarExclusaoResidencia} modal={modalConfirmarExclusaoResidencia} onExcluir={excluirResidencia} />)}
        <Snackbar
            style={{ position: 'absolute', left: 0, right: 0, bottom: 10, marginLeft:10 }}
            visible={visible}
            onDismiss={onDismissSnackBar}
            // duration={Snackbar.DURATION_SHORT}

            action={{
              icon: 'check-decagram'
            }}
          >
            Residência excluida com sucesso!
          </Snackbar>
      </GestureHandlerRootView>
      
          
        
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
    marginTop: 10,
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
  textoModal: {
    marginBottom: 10,
    marginHorizontal: 15,
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: "Roboto",
    textAlign: 'justify'
  },
  buttonModal: {
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 20,
    width: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 40,
    width: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default EditarResidencia;