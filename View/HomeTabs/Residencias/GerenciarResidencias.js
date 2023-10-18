import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider, Text, Button, List } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NovaResidencia from './NovaResidencia';
import { useNavigation } from '@react-navigation/native';

const GerenciarResidencias = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);

  return (
    <PaperProvider style={styles.raiz}>
      <GestureHandlerRootView style={modal ? styles.container_blur : styles.container}>

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
          color={modal ? '#2b5536' : '#5DB075'}
          textColor={modal ? 'gray' : 'white'}
          style={styles.addButton}
          mode="contained"
          onPress={() => setModal(!modal)}
        >
          Adicionar nova residência
        </Button>

        {modal && (<NovaResidencia setModal={setModal} modal={modal} />)}

      </GestureHandlerRootView>
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
    backgroundColor: 'transparent',
  },
  container_blur: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
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
