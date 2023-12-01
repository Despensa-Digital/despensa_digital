import React,{ useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { FAB, PaperProvider, Text, List} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import ListProduct from '../Componentes/ListProduct';
import { getProduto } from '../../../Controller/Produtos/produtosController';
import {  useFocusEffect } from '@react-navigation/native';

const VerItem = ({ route, navigation }) => {
    const [produto, setProduto] = useState({itensProdutos:[]})
    const [id, setId] = useState('')
   

    

    const carregarProduto = () =>{
        const idProduto = route.params
        setId(idProduto)
        console.log("Route params",idProduto );
        getProduto(idProduto, (data)=>{
            setProduto(data)
            
        })
    }

    useEffect(()=>{
        carregarProduto()
        console.log('Meu produto', produto)
        return ()=> carregarProduto()
    }, [])


    useFocusEffect(
        React.useCallback(() => {
            carregarProduto()
            return () => console.log("lista atualizada");
        }, [])
    );
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>

            <List.Item
                    description={`Produto: ${produto.nome}\nCódigo de barra: ${produto.codigoDeBarras}`}
                    left={props =>
                        <FastImage

                            style={{ width: 70,height:70 }}
                            source={{
                                uri: `https://cdn-cosmos.bluesoft.com.br/products/${produto.codigoDeBarras}`.toString(),
                                priority: FastImage.priority.normal,
                            }}
                            defaultSource={require('../../../Assets/Categories/Hamper.png')}
                            // resizeMode={FastImage.resizeMode.contain}

                        />
                        }
                    /*right={props => <Text>Produto: {product.name}{'\n'}Código de barra:{product.codigoDeBarra}</Text>}*/
                />
                <Text
                    variant="titleLarge"
                    style={{
                        marginTop: 10,
                        marginStart: 22
                    }}>
                    Unidades 
                </Text>
                <View>
                    <ListProduct produtoId={id} itens={produto.itensProdutos} />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('EditarProduto',{produto})} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                <List.Item
                    description={'Editar Produto'}
                    /*right={props => <Text>Produto: {product.name}{'\n'}Código de barra:{product.codigoDeBarra}</Text>}*/
                />
                </TouchableOpacity>

            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                //Pagina de adicionar item, está correta
                onPress={() => navigation.navigate('AdicionarExistente',{produto})}
            />           
        </PaperProvider>

    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#b0ea93'
    },
})

export default VerItem;