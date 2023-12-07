import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { FAB, Button, IconButton, Modal, PaperProvider, Portal, Snackbar, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import ListProduct from '../Componentes/ListProduct';
import { getProduto } from '../../../Controller/Produtos/produtosController';
import {  useFocusEffect } from '@react-navigation/native';
import { deleteProduto } from '../../../Controller/Produtos/produtosController';
import { SnackbarContext } from '../../../App';

const VerItem = ({ route, navigation }) => {
    const [produto, setProduto] = useState({itensProdutos:[]})
    const [id, setId] = useState('')
    const [deleteItemSnackbar, setDeleteItemSnackbar] = useState(false);
    const [codigoDeBarras, setCodigoDeBarras] = useState();
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');

    const {deleteProductSnackbar, setDeleteProductSnackbar} = useContext(SnackbarContext);

    //Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const excluirProduto = async () => {
        hideModal();
        setDeleteProductSnackbar(true);
        navigation.goBack();                 
        const res = await deleteProduto(id)   
        console.log(res) ;
    }

    const carregarProduto = () => {
        const idProduto = route.params
        setId(idProduto)
        console.log("Route params",idProduto );
        getProduto(idProduto, (data)=>{
            setProduto(data)

        })
    }

    useEffect(()=>{ 
        setCodigoDeBarras(produto.codigoDeBarras);
        setNome(produto.nome);
        setMarca(produto.marca);
        setValorUnitario(produto?.unidade?.valorUnitario);
        setUnidadeMedida(produto?.unidade?.unidadeMedida);
    }, [produto])

    useEffect(() => {
        let ignore = false;
        const idProduto = route.params
        setId(idProduto)
        console.log("Route params", idProduto);
        getProduto(idProduto, (data) => {
            if (!ignore) {
                setProduto(data)
                console.log('Meu produto', produto)
            }
        })
        return () => { ignore = true };
    }, [deleteItemSnackbar])


    useFocusEffect(
        React.useCallback(() => {
            carregarProduto()
            return () => console.log("lista atualizada");
        }, [])
    );
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#00000010', borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}>
                    <FastImage
                        style={{ width: 150, height: 150, alignSelf: 'center', margin: 10, borderRadius: 10, backgroundColor:'white' }}
                        source={{
                            uri: `https://cdn-cosmos.bluesoft.com.br/products/${codigoDeBarras}`.toString(),
                            priority: FastImage.priority.normal,
                        }}
                        defaultSource={require('../../../Assets/Categories/Hamper.png')}
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text variant='titleMedium'>{nome} {marca} {valorUnitario} {unidadeMedida}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text variant='titleSmall'>Código de barras: </Text>
                                <Text variant='bodyMedium'>{codigoDeBarras}</Text>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <IconButton icon="pencil" onPress={() => navigation.navigate('EditarProduto', { produto })} />
                            <IconButton icon="delete" onPress={showModal} />
                        </View>
                    </View>
                </View>

                <View>
                    <Text variant="titleLarge" style={{ marginTop: 20, marginStart: 22 }}>Unidades</Text>

                    <ListProduct produtoId={id} produto={produto} setDeleteItemSnackbar={setDeleteItemSnackbar}/>
                </View>
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                //Pagina de adicionar item, está correta
                onPress={() => navigation.navigate('AdicionarExistente', { produto })}
            />

            <Portal>
                <Modal visible={visible} dismissable={false} dismissableBackButton={false} contentContainerStyle={styles.containerStyle}>
                    <Text variant='titleMedium' style={{ textAlign: 'center' }}>Você tem certeza que deseja excluir este produto? Todos os itens serão removidos juntos.</Text>

                    <Button
                        textColor='#fff'
                        buttonColor='red'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                        onPress={() => excluirProduto()}>
                        Excluir
                    </Button>

                    <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        onPress={hideModal}>
                        Cancelar
                    </Button>
                </Modal>
            </Portal>

            <Snackbar
                visible={deleteItemSnackbar}
                onDismiss={() => { setDeleteItemSnackbar(false) }}
                duration={3000}>
                Item excluído com sucesso!
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
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8
    }
})

export default VerItem;