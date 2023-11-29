import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet, Image } from 'react-native'
import { FAB, PaperProvider, Text, List} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListProduct from '../Componentes/ListProduct';
import { getProduto } from '../../../Controller/Produtos/produtosController';

const VerItem = ({ route, navigation }) => {
    const [produto, setProduto] = useState({itensProdutos:[]})
    
   

    useEffect(()=>{
        carregarProduto()
        console.log('Meu produto', produto);
        return ()=> carregarProduto()
    }, [])

    const carregarProduto = () =>{
        const idProduto = route.params
        console.log("Route params",idProduto );
        getProduto(idProduto, (data)=>{
            setProduto(data)
            
        })
    }
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>

            <List.Item
                    description={`Produto: ${produto.nome}\n Código de barra: ${produto.codigoDeBarras}`}
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
                    <ListProduct itens={produto.itensProdutos} />
                </View>


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