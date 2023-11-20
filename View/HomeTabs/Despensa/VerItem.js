import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet, Image } from 'react-native'
import { FAB, PaperProvider, Text, List} from 'react-native-paper';
import CategoryAvatar from '../Componentes/CategoryAvatar';
import ListProduct from '../Componentes/ListProduct';

const VerItem = ({ route, navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [product, setProduct] = useState(
        { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', expire: '30/09/2023', localCompra: 'Mercantil', preco: 'R$4,00' },
    )
        const [products, setProducts] = useState([
        { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', expire: '30/09/2023', localCompra: 'Mercantil', preco: 'R$4,00' },
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

            <List.Item
                    description={'Produto: ${product.name}\n Código de barra: ${product.codigoDeBarra}'}
                    left={props => <Image size={70} source= {require('../../../Assets/Products/Rice.png')}/>} 
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
                    <ListProduct itens={products} />
                </View>


            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AdicionarExistente',lastProductId)}
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