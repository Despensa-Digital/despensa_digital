import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';

import { PaperProvider, List, IconButton, Portal, Modal, Button, FAB, TextInput } from 'react-native-paper';



const ListaMercado = () => {
  const [itens, setItens] = useState(
    [
      {
        "title": "Arroz 1kg",
        "description": "R$4,99",
        "image": require('../../../Assets/Products/Rice.png'),
        "counter": 0
      },
      {
        "title": "Cerveja",
        "description": "R$6,99",
        "image": require('../../../Assets/Products/beer.png'),
        "counter": 0
      },
      {
        "title": "Leite",
        "description": "R$7,99",
        "image": require('../../../Assets/Products/Milk.png'),
        "counter": 0
      },
    ]
  )

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState(0);

  return (
  <PaperProvider>
   
   {itens.map((item) =>
    <List.Item
      title={item.title}
      description={item.description}
      style={styles.listStyle}
      left={props => <Image source={item.image} style={{ width: 50, height: 50 }} />} 
      right={props => 
      <View style={{flexDirection:"row"}}>
        <IconButton {...props} style={{borderRadius:10,marginRight:10, backgroundColor: '#ffb3b3'}} icon="minus" onPress={() => console.log("menos")} />
        <Text style={{alignSelf:"center", position:"absolute", left: "47%"}}>{item.counter}</Text>
        <IconButton {...props} style={{borderRadius:10, marginLeft:30, backgroundColor: '#b0ea93'}} icon="plus" onPress={() => console.log("mais")} />
      </View>
    }
      // each item should have a plus and a minus button as if it was a counter on the right side of the item, they should be at the bottom of the item and should be clickable
    />
   )}
        <Text style={{alignSelf:"center",marginTop:10, color:"#a2a2a2"}}>Limpar lista</Text>
        {/* the sum of all prices should be a card just like the itens above but with only centralized text*/}

        <Text style={{fontSize:10, alignSelf:"left",margin:20, marginBottom: 0, color:"#a2a2a2"}}>Valor acumulado</Text>

        <View style={{margin: 10, marginTop: 0, padding: 20, borderRadius:15,  backgroundColor:"#f2f2f2"}}>
          <Text style={{alignSelf:"center"}}>R$ 19,97</Text>
        </View>

        <Portal>
          <Modal visible={visible} dismissable={false} dismissableBackButton={false} contentContainerStyle={styles.containerStyle}>
              <TextInput
                  style={{ marginTop: 20, marginHorizontal: 20 }}
                  label="Nome"
                  mode="outlined"
                  error={false}
                  value={nome}
                  onChangeText={nome => setNome(nome)}
              />
                <TextInput
                  style={{ marginTop: 20, marginHorizontal: 20 }}
                  label="Valor do produto"
                  mode="outlined"
                  error={false}
                  value={valor}
                  onChangeText={nome => setValor(valor)}
              />
              <Button
                  textColor='#fff'
                  buttonColor='#5DB075'
                  style={{ marginTop: 40, marginHorizontal: 20 }}
                  mode="contained"
                  onPress={() => hideModal()}>
                  Adicionar
              </Button>
              <Button
                  textColor='#5DB075'
                  buttonColor='#FFFFFF'
                  style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                  mode="outlined"
                  onPress={hideModal}>
                  Cancelar
              </Button>
            </Modal>
        </Portal>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => showModal()}
      />
  </PaperProvider>
);}

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