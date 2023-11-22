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

export default Despensa;