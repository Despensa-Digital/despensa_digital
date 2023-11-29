import React, { useState, useEffect} from 'react';
import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native'
import { PaperProvider, IconButton, ActivityIndicator, MD2Colors } from 'react-native-paper';

import HomeListHeader from '../Componentes/HomeListHeader';
import HomeRenderItem from '../Componentes/HomeRenderItem';
import HomeEmptyList from '../Componentes/HomeEmptyList';
import { getResidenciaAtual } from '../../../Controller/Residencia/residenciaController';
import { getProdutos } from '../../../Controller/Produtos/produtosController';

import { useNavigation, useFocusEffect } from '@react-navigation/native';



const HomeScreen = () => {
    const navigation = useNavigation();
    const [textoQuadro, setTextoQuadro] = useState('Escreva aqui suas anotações...');
    //const [membros, setMembros] = useState([]);
    const [residencia, setResidencia] = useState({ membros: [] });
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading]= useState(true);
    //Pegar o id do usuario

    //Listar suas residencias
    //Exibir a primeira residencia
    //Residencia obtida: mostrar a lista de usuários
    //Itens próximos do vencimento?
    
    const [products, setProducts] = useState([
        { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', marca: 'Brahma', image: 'https://cdn-cosmos.bluesoft.com.br/products/7891149102488', expire: '30/09/2023', quantidade: '6', categoria: 'Geladeira', peso: '350', unidadeMedida: 'mL' },
        { key: 2, codigoDeBarras: '1234567891234', name: 'Café', marca: 'Pilão', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896089012453', expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '500', unidadeMedida: 'g' },
        { key: 3, codigoDeBarras: '1234567891234', name: 'Coca-Cola', marca: 'Coca-Cola', image: 'https://cdn-cosmos.bluesoft.com.br/products/7894900019155', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '200', unidadeMedida: 'mL' },
        { key: 4, codigoDeBarras: '1234567891234', name: 'Suco de Laranja', marca: 'Xandô', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896623100028', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L' },
        { key: 5, codigoDeBarras: '1234567891234', name: 'Leite', marca: 'Parmalat', image: 'https://cdn-cosmos.bluesoft.com.br/products/3789603461001', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L' },
        { key: 6, codigoDeBarras: '1234567891234', name: 'Arroz', marca: 'Camil', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896006711117', expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '1', unidadeMedida: 'kg' },
    ])


    useEffect(() => {
        // removeResidenciaStorage()
        carregarResidenciaAtual()
        carregarProdutos()
        return ()=> carregarProdutos()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            carregarResidenciaAtual()
            carregarProdutos()
            
            return () => console.log("lista atualizada");
        }, [])
    );


   

    const carregarResidenciaAtual = () => {
        getResidenciaAtual()
            .then(doc => {
                setResidencia(doc)
                // setLoading(false)
            })
            
    }


    const carregarProdutos = ()=>{
        getProdutos((produto)=>{
            setProdutos(produto)
            setLoading(false)
            // console.log("Produtos", produtos)
        })
        
    }
    

    
    if (residencia === null) {
        return (
            <PaperProvider>
                <View style={{ 
                    textAlign: 'center', 
                    marginTop: 230,
                }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('GerenciarResidencias')} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                        <Image source={require('../../../Assets/Home/empty.jpg')} style={{ alignSelf: "center", width: 170, height: 170 }} /> 
                        <Text  style={{color:'black', textAlign: "center", fontSize: 18, paddingHorizontal: 20}}>
                        Parece que ainda não há residências vinculadas à sua conta. {"\n"}{"\n"}Clique aqui para criar uma nova residência.
                        </Text>
                    </TouchableOpacity>
    
                </View>
            </PaperProvider>
        )
    }else{
        return (
            <PaperProvider>          
                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    data={produtos ? produtos.sort((a,b)=>{
                        return a.itensProdutos.validade - b.itensProdutos.validade
                    }): produtos}
                    keyExtractor={item => item.key}
                    ListHeaderComponent={<HomeListHeader membros={residencia.membros}/>}
                    renderItem={({ item }) => <HomeRenderItem item={item} />}
                    ListEmptyComponent={
                        loading ?
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <ActivityIndicator animating={true} color="#00ff00" />
                        </View>
                        :<HomeEmptyList/>
                    }
                    onRefresh={() => {
                        console.log("refreshing")}}
                    //if set to true, the UI will show a loading indicator
                    refreshing={false}
                />
            </PaperProvider>
        )
    };

}


export default HomeScreen;