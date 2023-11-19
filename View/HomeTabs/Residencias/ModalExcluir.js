import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ModalExcluir = ({ setModal, modal }) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        // Handle modal close
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textoModal}>
            Tem certeza de que deseja remover? Todas as suas informações serão perdidas.
          </Text>
          <Button
            buttonColor="#ff0000"
            style={styles.buttonModal}
            mode="contained"
            onPress={() => setModal(false)}>
            Remover
          </Button>
          <Button
            buttonColor="white"
            style={styles.buttonModal}
            mode="outlined"
            onPress={() => setModal(false)}
            textColor='#5DB075'
            theme={{ colors: { outline: '#5DB075' } }}>
            Cancelar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textoModal: {
    marginBottom: 10,
    marginHorizontal: 15,
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: 'Roboto',
    textAlign: 'justify',
  },
  buttonModal: {
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

export default ModalExcluir;
