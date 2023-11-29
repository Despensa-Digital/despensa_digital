import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import { PaperProvider, List, IconButton, Portal, Modal, Button, FAB, TextInput, ActivityIndicator } from 'react-native-paper';
import { getListaDeComprasComItens, postItensNaListaDeCompras, putQuantidade, deleteItem, deleteTodosOsItens } from '../../../Controller/ListaDeCompras/listaController';
import {  useFocusEffect } from '@react-navigation/native';

import { currency } from 'remask';

const ListaMercado = ({route, navigation}) => {
  const {listaId} = route.params
  const [loading, setLoading] = useState(true)
  const [itensDaLista, setItensDaLista] = useState([])
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  const limparLista = async () => {
    setItensDaLista([]);
    await deleteTodosOsItens(listaId)
    carregarItens()
  }

  const mockIncrement = async (index, direction) => {
    let newItens = [...itensDaLista];
    let isRemovido = false
    console.log("Index ", index, "Minha lista ", newItens)
    if (direction == "minus" ) {
      newItens[index].quantidade--;
      if (newItens[index].quantidade <= 0) {
        const removerItem = newItens[index]
        console.log("Item removido", removerItem)
        
        newItens.splice(index, 1);
        isRemovido = true
        await deleteItem(listaId, removerItem)
      }
    }else {
      newItens[index].quantidade++;
    }

    setItensDaLista(newItens);
    if(!isRemovido){
      const item = newItens[index]
      console.log("Item", item)
      await putQuantidade(listaId, item)
    }
    carregarItens()
  }
  

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [total, setTotal] = useState(0);
  
  const recalculateTotal = () => {
    if(itensDaLista === null){
      setTotal(0)
      return
    }
    let novoTotal = 0;
    for (i = 0; i < itensDaLista.length; i++) {
      novoTotal += (itensDaLista[i].quantidade * itensDaLista[i].preco);
    }  
    novoTotal = novoTotal.toFixed(2);
    setTotal(novoTotal);
  }

  adicionarNovoItem = async () => {
    const novoItem = {
      nome: nome,
      preco: parseFloat(valor),
      quantidade: 1
    }

    console.log("item adicionado com sucesso",novoItem)
    await postItensNaListaDeCompras(listaId,novoItem)
    setValor('');
    setNome('');
    hideModal();
    carregarItens()
  }

  const carregarItens = async ()=>{
    const data = await getListaDeComprasComItens(listaId)
   
    if(data.itens){
      console.log("Meus itens")

      setItensDaLista(data.itens)
      
    }else{
      console.log("Lista está vazia")
      setItensDaLista(data.itens)
    }

    setLoading(false)
    // recalculateTotal();
  }

  useEffect(() => {
    carregarItens()
    // recalculateTotal();
  },[]);

  useEffect(() => {
    recalculateTotal();
  }, [itensDaLista]);

  useFocusEffect(
    React.useCallback(()=>{
      carregarItens()
      // recalculateTotal();
      return ()=> console.log("Itens Atualizados")
    },[])
  )


  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator animating={true} color="#00ff00" />
        </View>
    )
}
  return (
  <PaperProvider>
   {itensDaLista === null?
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Image
         source={require('../../../Assets/Categories/Hamper.png')}
         style={{ marginTop: 30, opacity: 0.8 }}
     />
     <Text
         variant="headlineMedium"
         style={{
             fontSize: 18,
             color: '#898585'
         }}>
         Lista vazia!
     </Text>
     
 </View>:
 <View>
  {itensDaLista.map((item, index) =>
    <List.Item
      key={item.itemId}
      title={item.nome}
      description={"R$" + item.preco}
      style={styles.listStyle}
      left={props => <Image source={require('../../../Assets/Products/Hamper.png')} style={{ width: 50, height: 50 }} />} 
      right={props => 
      <View style={{flexDirection:"row"}}>
        <IconButton {...props} style={{borderRadius:10,marginRight:10, backgroundColor: '#ffb3b3'}} icon="minus" onPress={() => mockIncrement(index, "minus")} />
        <Text style={{alignSelf:"center", position:"absolute", left: "47%"}}>{item.quantidade}</Text>
        <IconButton {...props} style={{borderRadius:10, marginLeft:30, backgroundColor: '#b0ea93'}} icon="plus" onPress={() => mockIncrement(index, "plus")} />
      </View>
    }
      // each item should have a plus and a minus button as if it was a counter on the right side of the item, they should be at the bottom of the item and should be clickable
    />
   )}
        <Text onPress={limparLista} style={{alignSelf:"center",marginTop:10, color:"#a2a2a2"}}>Limpar lista</Text>
        {/* the sum of all prices should be a card just like the itens above but with only centralized text*/}

        <Text style={{fontSize:10, alignSelf:"flex-start",margin:20, marginBottom: 0, color:"#a2a2a2"}}>Valor acumulado</Text>

        <View style={{margin: 10, marginTop: 0, padding: 20, borderRadius:15,  backgroundColor:"#f2f2f2"}}>
          <Text style={{alignSelf:"center"}}>R$ {total}</Text>
        </View>
  </View>
  }
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
                  keyboardType={'numeric'}
                  value={currency.mask({ locale: 'pt-BR', currency: 'BRL', value: valor })}
                  onChangeText={valor => setValor(currency.unmask({ locale: 'pt-BR', currency: 'BRL', value: valor }))}
              />

              <Button
                  textColor='#fff'
                  buttonColor='#5DB075'
                  style={{ marginTop: 40, marginHorizontal: 20 }}
                  mode="contained"
                  onPress={() => adicionarNovoItem()}>
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