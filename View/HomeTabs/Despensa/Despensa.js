import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native'
import { ActivityIndicator,FAB, PaperProvider} from 'react-native-paper';

import { getProdutos } from '../../../Controller/Produtos/produtosController';
import {  useFocusEffect } from '@react-navigation/native';
import { getCategorias } from '../../../Controller/Categoria/categoriaController';

import DespensaListHeader from '../Componentes/DespensaListHeader';
import DespensaRenderItem from '../Componentes/DespensaRenderItem';
import DespensaEmptyList from '../Componentes/DespensaEmptyList';




const Despensa = ({ route, navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true);

    const onChangeSearch = query => setSearchQuery(query);

    const carregarProdutos = ()=>{
        getProdutos((produto)=>{
            setProdutos(produto)
            setLoading(false)
        })
        
    }

    const carregarCategorias = ()=>{
        const categoriaEva = { key:1, nome: 'Todas as categorias', foto: 'Hamper.png' }
        getCategorias().then(
            (categoria)=>{
                let aux = categoria
                if(aux && aux.length > 0){
                    aux.unshift(categoriaEva)
                    setCategorias(aux)
                }else{
                    setCategorias([categoriaEva])
                }
                
                
                setLoading(false)
            }
        )
    }





    useEffect(() => {
        carregarCategorias()
        carregarProdutos()
        return ()=> carregarProdutos()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            carregarCategorias()
            carregarProdutos()
            return () => console.log("lista atualizada");
        }, [])
    );

    
    

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




    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator animating={true} color="#00ff00" />
            </View>
        )
    }  
    return (
        <PaperProvider>
            {/* <ScrollView style={{ backgroundColor: '#fff' }}>
                <DespensaListHeader />
                <ListComponent itens={products} />
            </ScrollView> */}

            <FlatList
                style={{ backgroundColor: '#fff' }}
                data={produtos}
                keyExtractor={item => item.key}
                ListHeaderComponent={<DespensaListHeader categorias={categorias}/>}
                renderItem={({ item }) => <DespensaRenderItem item={item} />}
                ListEmptyComponent={DespensaEmptyList}
                onRefresh={() => console.log("refreshing")}
                //if set to true, the UI will show a loading indicator
                refreshing={false}
            />

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