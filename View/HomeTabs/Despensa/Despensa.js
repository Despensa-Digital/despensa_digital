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
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const onChangeSearch = query => setSearchQuery(query);

    const carregarProdutos = async ()=>{
       await getProdutos((doc)=>{
        setProdutos(doc)
        setLoading(false)
       })
            
        
        
        return ()=> getProdutos
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
            }
        )
    }

    useEffect(() => {
        carregarCategorias()
        carregarProdutos()
       

        return ()=> console.log("finalizei produtos")
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            carregarCategorias()
            // carregarProdutos()
            return () => console.log("lista atualizada");
        }, [])
    );

    useEffect(() => {
        if (categorias && (produtos === null || produtos)) setLoading(false);
    }, [categorias, produtos])

    
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
                keyExtractor={(item, index)  => item.key + index}
                ListHeaderComponent={<DespensaListHeader categorias={categorias}/>}
                renderItem={({ item }) => <DespensaRenderItem item={item} />}
                ListEmptyComponent={
                    loading 
                        ?
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <ActivityIndicator animating={true} color="#00ff00" />
                        </View>
                        :
                        DespensaEmptyList}
                onRefresh={() => carregarProdutos()}
                //if set to true, the UI will show a loading indicator
                refreshing={false}
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