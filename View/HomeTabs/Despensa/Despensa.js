import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native'
import { ActivityIndicator, FAB, PaperProvider, Snackbar } from 'react-native-paper';

import { getProdutos, getProdutosFiltrados } from '../../../Controller/Produtos/produtosController';
import { useFocusEffect } from '@react-navigation/native';
import { getCategorias } from '../../../Controller/Categoria/categoriaController';

import DespensaListHeader from '../Componentes/DespensaListHeader';
import DespensaRenderItem from '../Componentes/DespensaRenderItem';
import DespensaEmptyList from '../Componentes/DespensaEmptyList';
import { SnackbarContext, CategoriasContext } from '../../../App';

const Despensa = ({ route, navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchCategoria, setSearchCategoria] = useState('')
    const [whatCategoryIs, setWhatCategoryIs] = useState(0)
    const [selectedId, setSelectedId] = useState(1);
    const {deleteProductSnackbar, setDeleteProductSnackbar} = useContext(SnackbarContext);
    const {categorias, setCategorias} = useContext(CategoriasContext);
    const onChangeSearch = query => setSearchQuery(query);
    // const produtosOrdenados = produtos.sort((a, b) => {
    //     let x = a?.nome?.toLowerCase();
    //     let y = b?.nome?.toLowerCase();
    //     if (x < y) { return -1; }
    //     if (x > y) { return 1; }
    //     return 0;
    // })

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

    const filtrarProdutos = async (filtro, callback) =>{
        console.log("Estou no filtro")
        await getProdutosFiltrados(filtro,callback)
        
    }

    useEffect(() => {
        
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
        if (categorias && (produtos === null || produtos)) setLoading(false);
    }, [categorias && produtos])


    useEffect(() => {
        
        if (refreshing) {
            // do your heavy or asynchronous data fetching & update your state
            carregarProdutos(setProdutos)
            // set the refreshing back to false
            setRefreshing(false);
            console.log("Dei refresh na lista")
        }
    }, [refreshing]);

    useEffect(()=>{
        let canceled = false
        if(!canceled){
            if(whatCategoryIs !== 0){
                filtrarProdutos(searchCategoria, setProdutos)
                console.log("Filtrando...")
            }else{
                carregarProdutos(setProdutos)
            }
        }       
    return ()=>(canceled = true)
    },[searchCategoria && whatCategoryIs])



    const renderItem = useCallback(({ item }) => (
            <DespensaRenderItem item={item} key={item.key} searchQuery={searchQuery} />
    ), [searchQuery]);

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
                data={produtos}
                keyExtractor={(item, index) => item.key + index}
                ListHeaderComponent={<DespensaListHeader categorias={categorias} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedId={selectedId} setSelectedId={setSelectedId} setSearchCategoria={setSearchCategoria} setWhatCategoryIs={setWhatCategoryIs}/>}
                renderItem={renderItem}
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

            <Snackbar
                visible={deleteProductSnackbar}
                onDismiss={() => { setDeleteProductSnackbar(false) }}
                duration={3000}>
                Produto excluído com sucesso!
            </Snackbar>

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