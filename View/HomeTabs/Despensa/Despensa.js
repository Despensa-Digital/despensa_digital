import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Appbar, Avatar, Button, Divider, FAB, List, PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListComponent from '../Componentes/ListComponent';
import DespensaListHeader from '../Componentes/DespensaListHeader';
import DespensaRenderItem from '../Componentes/DespensaRenderItem';
import DespensaEmptyList from '../Componentes/DespensaEmptyList';


const Despensa = ({ route, navigation }) => {

    //--MOCK--
    // const [products, setProducts] = useState([
    //     { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', marca: 'Brahma', image: require('../../../Assets/Products/beer.png'), expire: '30/09/2023', quantidade: '6', categoria: 'Geladeira', peso: '350', unidadeMedida: 'mL'   },
    //     { key: 2, codigoDeBarras: '1234567891234', name: 'Café', marca: 'Pilão', image: require('../../../Assets/Products/Coffee.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '500', unidadeMedida: 'g' },
    //     { key: 3, codigoDeBarras: '1234567891234', name: 'Coca-Cola', marca: 'Coca-Cola', image: require('../../../Assets/Products/Cola.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '200', unidadeMedida: 'mL'  },
    //     { key: 4, codigoDeBarras: '1234567891234', name: 'Suco de Laranja', marca: 'Xandô', image: require('../../../Assets/Products/Juice.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L'  },
    //     { key: 5, codigoDeBarras: '1234567891234', name: 'Leite', marca: 'Parmalat', image: require('../../../Assets/Products/Milk.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L'  },
    //     { key: 6, codigoDeBarras: '1234567891234', name: 'Arroz', marca: 'Camil', image: require('../../../Assets/Products/Rice.png'), expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '1', unidadeMedida: 'kg'  },
    // ])

    const [products, setProducts] = useState([
        { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', marca: 'Brahma', image: 'https://cdn-cosmos.bluesoft.com.br/products/7891149102488', expire: '30/09/2023', quantidade: '6', categoria: 'Geladeira', peso: '350', unidadeMedida: 'mL' },
        { key: 2, codigoDeBarras: '1234567891234', name: 'Café', marca: 'Pilão', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896089012453', expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '500', unidadeMedida: 'g' },
        { key: 3, codigoDeBarras: '1234567891234', name: 'Coca-Cola', marca: 'Coca-Cola', image: 'https://cdn-cosmos.bluesoft.com.br/products/7894900019155', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '200', unidadeMedida: 'mL' },
        { key: 4, codigoDeBarras: '1234567891234', name: 'Suco de Laranja', marca: 'Xandô', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896623100028', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L' },
        { key: 5, codigoDeBarras: '1234567891234', name: 'Leite', marca: 'Parmalat', image: 'https://cdn-cosmos.bluesoft.com.br/products/3789603461001', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L' },
        { key: 6, codigoDeBarras: '1234567891234', name: 'Arroz', marca: 'Camil', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896006711117', expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '1', unidadeMedida: 'kg' },
    ])

    // const [products, setProducts] = useState([])

    const [lastProductId, setLastProductId] = useState(7);

    useEffect(() => {
        console.log('Estou no useEffect')
        if (route.params?.produtoEditado == true) {
            console.log('Estou no if: ' + route.params.produtoEditado)
            const updatedProducts = products.map(product => {
                if (product.key === route.params.key) {
                    return {
                        ...product,
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
        if (route.params?.produtoEditado == false && route.params.key > products.length) {
            const newProduct = [...products, route.params]
            setProducts(newProduct)
            setLastProductId(lastProductId + 1)
        }
    }, [route.params]);

    //--FIM DO MOCK--    
    return (
        <PaperProvider>
            {/* <ScrollView style={{ backgroundColor: '#fff' }}>
                <DespensaListHeader />
                <ListComponent itens={products} />
            </ScrollView> */}

            <FlatList
                style={{ backgroundColor: '#fff' }}
                data={products}
                keyExtractor={item => item.key}
                ListHeaderComponent={DespensaListHeader}
                renderItem={({ item }) => <DespensaRenderItem item={item} />}
                ListEmptyComponent={DespensaEmptyList}
                onRefresh={() => console.log("refreshing")}
                //if set to true, the UI will show a loading indicator
                refreshing={false}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AdicionarProduto', lastProductId)}
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