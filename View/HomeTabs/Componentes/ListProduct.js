import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { currency } from 'remask';
import { deleteItemProduto } from '../../../Controller/Produtos/produtosController';
import { SnackbarContext } from '../../../App';

const ListProduct = ({ produtoId, produto, setDeleteItemSnackbar }) => {
    const itens = produto.itensProdutos;
    const navigation = useNavigation();

    const {deleteProductSnackbar, setDeleteProductSnackbar} = useContext(SnackbarContext);
    //Modal
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState();
    const showModal = (itemId) => {
        setVisible(true)
        setId(itemId);
    };
    const hideModal = () => setVisible(false);
    
    const excluirItem = async (itemId) => {
        const res = await deleteItemProduto(produtoId, itemId)   
        console.log(res) ;
        hideModal();
        if(res == 1){
            setDeleteItemSnackbar(true);
        }else {
            setDeleteProductSnackbar(true);
            navigation.goBack();          
        }
        
    }

    const convertData = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return data.toDate().toLocaleString('pt-BR', options)
    }

    const lista = itens.map(product =>

        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <View key={product.key} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center' }}>
                            <Text variant='titleMedium'>Data de validade: </Text>
                            <Text variant='bodyLarge'>{convertData(product.validade)}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text variant='titleMedium'>Local de compra: </Text>
                            <Text variant='bodyLarge'>{product.localCompra}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text variant='titleMedium'>Preço: </Text>
                            <Text variant='bodyLarge'>{currency.mask({ locale: 'pt-BR', currency: 'BRL', value: product.preco })}</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <IconButton icon="pencil" onPress={() => navigation.navigate('EditarUnidade', { product, productId: produtoId, nome: produto.nome, codigoDeBarras: produto.codigoDeBarras })} />
                        <IconButton icon="delete" onPress={() => showModal(product.key)} />
                    </View>
                </View>
            </View>

            <Divider style={{ height: 1 }} />

            <Portal>
                <Modal visible={visible} dismissable={false} dismissableBackButton={false} contentContainerStyle={styles.containerStyle}>
                    <Text variant='titleMedium' style={{ textAlign: 'center' }}>Você tem certeza que deseja excluir este item?</Text>

                    <Button
                        textColor='#fff'
                        buttonColor='red'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                        onPress={() => excluirItem(id)}>
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
        </View>
    )

    return (
        <View>
            {lista}
        </View>

    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8
    }
})

export default ListProduct;