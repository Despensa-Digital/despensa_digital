import * as React from 'react';
import { PaperProvider, List } from 'react-native-paper';

const ListaMercado = () => (
    <PaperProvider>
  <List.Item
    title="Arroz 1kg"
    description="R$4,99"
    titleStyle={styles.listStyle}
    left={props => <List.Icon {...props} icon="folder" />}
  />
  <List.Item
    title="Leite"
    description="R$17,63"
    left={props => <List.Icon {...props} icon="folder" />}
  />
  <List.Item
    title="Suco de laranja"
    description="R$8,40"
    left={props => <List.Icon {...props} icon={require('../../../Assets/Products/Juice.png')} />}
  />
  <List.Item
    title="Queijo Parmessão"
    description="R$30,89"
    left={props => <List.Icon {...props} icon="folder" />}
  />
  </PaperProvider>
);


const styles = StyleSheet.create({
    /* listStyle: {
        backgroundColor: 'gray',
        border: 20,
    }, */
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#b0ea93'
    },
});

export default ListaMercado;