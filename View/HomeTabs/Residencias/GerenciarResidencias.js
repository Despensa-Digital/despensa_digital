import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text, Button, List } from 'react-native-paper';
import NovaResidencia from './NovaResidencia';
import { useNavigation } from '@react-navigation/native';

const GerenciarResidencias = () => {
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
