import { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Appbar, Avatar, Button, Divider, FAB, PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListComponent from '../Componentes/ListComponent';
// import { getProdutos } from '../../../Controller/Produtos/produtosController';

const Despensa = ({ navigation }) => {

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

    const products = [
        { name: 'Beer', image: require('../../../Assets/Products/beer.png'), expire: '30/09/2023', key: 1 },
        { name: 'Coffee', image: require('../../../Assets/Products/Coffee.png'), expire: '30/09/2023', key: 2 },
        { name: 'Cola', image: require('../../../Assets/Products/Cola.png'), expire: '30/09/2023', key: 3 },
        { name: 'Juice', image: require('../../../Assets/Products/Juice.png'), expire: '30/09/2023', key: 4 },
        { name: 'Milk', image: require('../../../Assets/Products/Milk.png'), expire: '30/09/2023', key: 5 },
        { name: 'Rice', image: require('../../../Assets/Products/Rice.png'), expire: '30/09/2023', key: 6 },
    ]


    useEffect(()=>{
        //getProdutos()
            // .then((doc)=>{
            //     console.log(doc)
            // })
    },[])

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

export default Despensa;