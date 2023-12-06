import React, { useState, useEffect} from 'react';
import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native'
import { PaperProvider, IconButton, ActivityIndicator, MD2Colors } from 'react-native-paper';

import HomeListHeader from '../Componentes/HomeListHeader';
import HomeRenderItem from '../Componentes/HomeRenderItem';
import HomeEmptyList from '../Componentes/HomeEmptyList';
import { getResidenciaAtual } from '../../../Controller/Residencia/residenciaController';
import { getProdutosProximosDaValidade } from '../../../Controller/Produtos/produtosController';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { set } from 'date-fns';



const HomeScreen = () => {
    const navigation = useNavigation();
    const [textoQuadro, setTextoQuadro] = useState('Escreva aqui suas anotações...');
    //const [membros, setMembros] = useState([]);
    const [residencia, setResidencia] = useState({ membros: [] });
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading]= useState(true);
    //timestamp da data daqui 30 dias
    const dataAtualMais30 = Date.now()/1000 + 2592000;
    //Pegar o id do usuario

    //Listar suas residencias
    //Exibir a primeira residencia
    //Residencia obtida: mostrar a lista de usuários
    //Itens próximos do vencimento?


    




    const carregarResidenciaAtual = () => {
        getResidenciaAtual()
            .then(doc => {
                setResidencia(doc)
            })
            
    }


    const carregarProdutos =async ()=>{
        const data = await getProdutosProximosDaValidade()
        setProdutos(data)
        setLoading(false)
    }
    
    useEffect(() => {
        carregarResidenciaAtual()
        carregarProdutos()
        return ()=> console.log("finalizei produtos")
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            carregarResidenciaAtual()
            carregarProdutos()
            
            return () => console.log("lista atualizada");
        }, [])
    );
    

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator animating={true} color="#00ff00" />
            </View>
        )
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
                    data={produtos ? produtos.filter((produto) => produto?.itensProdutos?.validade?.seconds < dataAtualMais30).sort((a,b)=>{
                        return a?.itensProdutos?.validade - b?.itensProdutos?.validade
                    }): produtos}
                    keyExtractor={(item, index) => item.key + index}
                    ListHeaderComponent={<HomeListHeader membros={residencia.membros}/>}
                    renderItem={({ item }) => <HomeRenderItem item={item} />}
                    ListEmptyComponent={
                        loading 
                        ?
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <ActivityIndicator animating={true} color="#00ff00" />
                            </View>
                        :
                            <HomeEmptyList/>
                    }
                    onRefresh={() => {
                       carregarProdutos()}}
                    //if set to true, the UI will show a loading indicator
                    refreshing={false}
                />
            </PaperProvider>
        )
    };

}


export default HomeScreen;