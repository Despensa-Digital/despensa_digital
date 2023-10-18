import * as React from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';

import { PaperProvider, List, IconButton } from 'react-native-paper';



const itens = [
  {
    "title": "Arroz 1kg",
    "description": "R$4,99",
    "image": require('../../../Assets/Products/Rice.png'),
    "counter": "0"
  },
  {
    "title": "Cerveja",
    "description": "R$6,99",
    "image": require('../../../Assets/Products/beer.png'),
    "counter": "0"
  },
  {
    "title": "Leite",
    "description": "R$7,99",
    "image": require('../../../Assets/Products/Milk.png'),
    "counter": "0"
  },
]

const ListaMercado = () => (
  <PaperProvider>
   
   {itens.map((item) =>
    <List.Item
      title={item.title}
      description={item.description}
      style={styles.listStyle}
      left={props => <Image source={item.image} style={{ width: 50, height: 50 }} />} 
      right={props => 
      <View style={{flexDirection:"row"}}>
        <IconButton {...props} style={{backgroundColor: '#ffb3b3'}} icon="minus" onPress={() => console.log("TESTE")} />
        <Text style={{border: 10,alignSelf:"center", position:"absolute", left: "50%"}}>{item.counter}</Text>
        <IconButton {...props} style={{backgroundColor: '#b0ea93'}} icon="plus" onPress={() => console.log("TESTE")} />
      </View>
    }
      // each item should have a plus and a minus button as if it was a counter on the right side of the item, they should be at the bottom of the item and should be clickable
    />
   )}

  </PaperProvider>
);


const styles = StyleSheet.create({
    listStyle: {
        // each item should a light gray background, they must be separated by a thin line and should have a lateral border
        backgroundColor: '#f2f2f2',
        padding: 5,
        margin: 2,
        borderRadius: 8
    }, 
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