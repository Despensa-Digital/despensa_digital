import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Appbar, Avatar, Button, Divider, FAB, PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListComponent from '../Componentes/ListComponent';

const Despensa = ({ route, navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [products, setProducts] = useState([
        { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', marca: 'Brahma', image: require('../../../Assets/Products/beer.png'), expire: '30/09/2023', quantidade: '6', categoria: 'Geladeira', peso: '350', unidadeMedida: 'mL'   },
        { key: 2, codigoDeBarras: '1234567891234', name: 'Café', marca: 'Pilão', image: require('../../../Assets/Products/Coffee.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '500', unidadeMedida: 'g' },
        { key: 3, codigoDeBarras: '1234567891234', name: 'Coca-Cola', marca: 'Coca-Cola', image: require('../../../Assets/Products/Cola.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '200', unidadeMedida: 'mL'  },
        { key: 4, codigoDeBarras: '1234567891234', name: 'Suco de Laranja', marca: 'Xandô', image: require('../../../Assets/Products/Juice.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L'  },
        { key: 5, codigoDeBarras: '1234567891234', name: 'Leite', marca: 'Parmalat', image: require('../../../Assets/Products/Milk.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L'  },
        { key: 6, codigoDeBarras: '1234567891234', name: 'Arroz', marca: 'Camil', image: require('../../../Assets/Products/Rice.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '1', unidadeMedida: 'kg'  },
    ])

   const [lastProductId, setLastProductId] = useState(7);

   
    console.log("route params: " + route.params)
    useEffect(() => {
        console.log('Estou no useEffect')
        if (route.params?.produtoEditado == true) {
            console.log('Estou no if: ' + route.params.produtoEditado)
            const updatedProducts = products.map(product => {              
                if(product.key === route.params.key) {
                    return{...product,
                        codigoDeBarras: route.params.codigoDeBarras,
                        name: route.params.nomeProduto,
                        marca: route.params.marca,
                        expire: route.params.dataValidade,
                        quantidade: route.params.quantidade,
                        categoria: route.params.categoria,
                        peso: route.params.peso,
                        unidadeMedida: route.params.unidadeMedida
                    }
                }
                return product;
            })
            setProducts(updatedProducts);     
        } 
        if(route.params?.produtoEditado == false) {
            const newProduct = [...products, route.params]
            setProducts(newProduct)
            setLastProductId(lastProductId + 1)
        }
      }, [route.params]);

    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>

                <Text
                    variant="titleLarge"
                    style={{
                        marginTop: 10,
                        marginStart: 22
                    }}>
                    Unidades 
                </Text>
                <View>
                    <ListComponent itens={products} />
                </View>


            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AdicionarProduto',lastProductId)}
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

export default Despensa;