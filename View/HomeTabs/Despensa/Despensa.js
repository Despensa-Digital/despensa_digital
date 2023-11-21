<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { ActivityIndicator, MD2Colors,Appbar, Avatar, Button, Divider, FAB, PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListComponent from '../Componentes/ListComponent';
import { getProdutos } from '../../../Controller/Produtos/produtosController';

const Despensa = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading]= useState(true);
    const onChangeSearch = query => setSearchQuery(query);

    const categorias = [
        { name: 'Todas as categorias', photo: require('../../../Assets/Categories/Hamper.png') },
        { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
        { name: 'Hortifruti', photo: require('../../../Assets/Categories/Fruits.png') },
        { name: 'Armário da cozinha', photo: require('../../../Assets/Categories/Pantry.png') },
        { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png') },
        { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png') }
    ];


    useEffect(()=>{
        getProdutos((produto)=>{
            setProdutos(produto)
            setLoading(false)
        })
    },[])

    


    if(loading){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} color={MD2Colors.grey400} />
            </View>
        )
    }
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Text
                    variant="titleMedium"
                    style={{
                        marginTop: 10,
                        marginStart: 22
                    }}>
                    Filtrar Categorias
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categorias.map(categoria =>
                            <View key={categoria.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                                <CategoryAvatar categoryKey={categoria.name} name={categoria.name} photo={categoria.photo} />
                            </View>
                        )}
                    </ScrollView>
                </View>

                <Text
                    variant="titleLarge"
                    style={{
                        marginTop: 10,
                        marginStart: 22
                    }}>
                    Produtos
                </Text>
                <Text
                    variant="titleSmall"
                    style={{
                        marginStart: 22,
                        color: '#898585'
                    }}>
                    Todas as categorias
                </Text>
                <View style={{ marginTop: 10 }}>
                    <Divider bold style={{ backgroundColor: '#898585' }} />
                    <Searchbar
                        style={{ backgroundColor: '#fff' }}
                        mode='view'
                        placeholder="Procurar produtos"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View>
                    {/* <ListComponent itens={products} /> */}
                    <ListComponent itens={produtos} />
                    
                </View>


            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AdicionarProduto')}
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

=======
import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Appbar, Avatar, Button, Divider, FAB, PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListComponent from '../Componentes/ListComponent';

const Despensa = ({ route, navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const categorias = [
        { name: 'Todas as categorias', photo: require('../../../Assets/Categories/Hamper.png') },
        { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
        { name: 'Hortifruti', photo: require('../../../Assets/Categories/Fruits.png') },
        { name: 'Armário da cozinha', photo: require('../../../Assets/Categories/Pantry.png') },
        { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png') },
        { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png') }
    ];

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
                    variant="titleMedium"
                    style={{
                        marginTop: 10,
                        marginStart: 22
                    }}>
                    Filtrar Categorias
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categorias.map(categoria =>
                            <View key={categoria.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                                <CategoryAvatar categoryKey={categoria.name} name={categoria.name} photo={categoria.photo} />
                            </View>
                        )}
                    </ScrollView>
                </View>

                <Text
                    variant="titleLarge"
                    style={{
                        marginTop: 10,
                        marginStart: 22
                    }}>
                    Produtos
                </Text>
                <Text
                    variant="titleSmall"
                    style={{
                        marginStart: 22,
                        color: '#898585'
                    }}>
                    Todas as categorias
                </Text>
                <View style={{ marginTop: 10 }}>
                    <Divider bold style={{ backgroundColor: '#898585' }} />
                    <Searchbar
                        style={{ backgroundColor: '#fff' }}
                        mode='view'
                        placeholder="Procurar produtos"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
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

>>>>>>> origin/luna_novo
export default Despensa;