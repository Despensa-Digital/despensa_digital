import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Text, Button, List } from 'react-native-paper';
import NovoMembro from './NovoMembro';
import EditarNomeResidencia from './EditarNomeResidencia';
import EditarMembro from './EditarMembro';
import ModalExcluir from './ModalExcluir';

const EditarResidencia = ({ navigation }) => {
  const [modalMembro, setModalMembro] = useState(false);
  const [modalResidencia, setModalResidencia] = useState(false);
  const [modalEditarMembro, setModalEditarMembro] = useState(false);
  const [modalConfirmarExclusaoResidencia, setModalConfirmarExclusaoResidencia] = useState(false);

  const abrirFecharModalMembro = (valor) => {
    if (modalResidencia || modalEditarMembro) return;
    setModalMembro(valor);
  };

  const abrirFecharModalResidencia = (valor) => {
    if (modalMembro || modalEditarMembro) return;
    setModalResidencia(valor);
  };

  const abrirFecharModalEditarMembro = (valor) => {
    if (modalMembro || modalResidencia) return;
    setModalEditarMembro(valor);
  };

  return (
    <PaperProvider style={styles.raiz}>
      <GestureHandlerRootView style={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? styles.container_blur : styles.container}>

        <Text style={styles.tituloEditar}>Editar</Text>
        <List.Item
          title="Primeira residência"
          onPress={() => abrirFecharModalResidencia(!modalResidencia)}
          style={styles.listItem}
        />
        <List.Item
          title="Segunda residencia"
          onPress={() => abrirFecharModalResidencia(!modalResidencia)}
          style={styles.listItem}
        />

        <Text style={styles.tituloMembro}>Membro</Text>
        <Button
          color={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#2b5536' : '#5DB075'}
          textColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white'}
          style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 20 }}
          mode="contained"
          onPress={() => abrirFecharModalMembro(!modalMembro)}
        >
          Adicionar novo membro
        </Button>

        <List.Item
          title="Primeiro membro"
          onPress={() => abrirFecharModalEditarMembro(!modalMembro)}
          style={styles.listItem}
        />
        <List.Item
          title="Segundo membro"
          onPress={() => abrirFecharModalEditarMembro(!modalMembro)}
          style={styles.listItem}
        />

        <Button
          textColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white'}
          color={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#800000' : '#ff0000'}
          style={styles.buttonExcluir}
          mode="contained"
          onPress={() => setModalConfirmarExclusaoResidencia(true)}
        >
          Excluir residência
        </Button>

        <Button
          textColor={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? '#2b5536' : '#5DB075'}
          color={modalMembro || modalResidencia || modalEditarMembro || modalConfirmarExclusaoResidencia ? 'gray' : 'white'}
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
});

export default EditarResidencia;
