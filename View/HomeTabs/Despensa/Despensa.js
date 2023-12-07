import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native'
import { ActivityIndicator,FAB, PaperProvider} from 'react-native-paper';

import { getProdutos, getProdutosFiltrados } from '../../../Controller/Produtos/produtosController';
import {  useFocusEffect } from '@react-navigation/native';
import { getCategorias } from '../../../Controller/Categoria/categoriaController';

import DespensaListHeader from '../Componentes/DespensaListHeader';
import DespensaRenderItem from '../Componentes/DespensaRenderItem';
import DespensaEmptyList from '../Componentes/DespensaEmptyList';

const Despensa = ({ route, navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchCategoria, setSearchCategoria] = useState('')
    const [whatCategoryIs, setWhatCategoryIs] = useState(0)
    const onChangeSearch = query => setSearchQuery(query);

    const carregarProdutos =  (callback)=>{
        getProdutos(callback)
        
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

    const filtrarProdutos = (filtro, callback) =>{
        console.log("Estou no filtro")
        getProdutosFiltrados(filtro,callback)
        setLoading(false)
    }

    useEffect(() => {
        console.log("USE EFFECT PRODUTOS E CATEGORIAS")
        
        carregarCategorias()
        carregarProdutos(setProdutos)
       
        return () => console.log("lista atualizada");
    }, [])

    useFocusEffect(

        React.useCallback(() => {
            carregarCategorias()
            carregarProdutos(setProdutos)
            return () => console.log("lista atualizada");
        }, [])
    );

    useEffect(() => {
        console.log("USE EFFECT LOADING")
        if (categorias && (produtos === null || produtos)) setLoading(false);
    }, [categorias && produtos])


    useEffect(() => {
        console.log("USE EFFECT REFRESHING")
        if (refreshing) {
            // do your heavy or asynchronous data fetching & update your state
            carregarProdutos(setProdutos)
            // set the refreshing back to false
            setRefreshing(false);
            console.log("Dei refresh na lista")
        }
    }, [refreshing]);

    useEffect(()=>{
        console.log("\n\n\n\n\n\n");
        console.log("Total:", produtos.length);
    }, [produtos])

    useEffect(()=>{
        setLoading(true)
        if(whatCategoryIs !== 0){
            filtrarProdutos(searchCategoria, setProdutos)
            console.log("Filtrando...")
        }else{
            carregarProdutos(setProdutos)
        }

    },[searchCategoria && whatCategoryIs])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator animating={true} color="#00ff00" />
            </View>
        )
    }
    return (
        <PaperProvider>

            <FlatList
                style={{ backgroundColor: '#fff' }}
                data={produtos 
                //     ? produtos.sort((a, b) => {
                //     let x = a?.nome?.toLowerCase();
                //     let y = b?.nome?.toLowerCase();
                //     if (x < y) { return -1; }
                //     if (x > y) { return 1; }
                //     return 0;
                // }) : produtos
                }
                keyExtractor={(item, index) => item.key + index}
                ListHeaderComponent={<DespensaListHeader categorias={categorias} setSearchCategoria={setSearchCategoria} setWhatCategoryIs={setWhatCategoryIs}/>}
                renderItem={({ item }) => <DespensaRenderItem item={item} />}
                ListEmptyComponent={DespensaEmptyList}
                onRefresh={() => setRefreshing(true)}
                //if set to true, the UI will show a loading indicator
                refreshing={refreshing}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AdicionarProduto', categorias)}
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