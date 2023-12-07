import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Button, IconButton, Modal, PaperProvider, Portal, Switch, Text, TextInput } from 'react-native-paper';
import { DatePickerInput, pt, registerTranslation } from 'react-native-paper-dates';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { currency, mask, unmask } from 'remask'

import scheduleNotificationControl from '../../../Controller/Despensa/scheduleNotificationControl';
import { postItemProduto } from '../../../Controller/Produtos/produtosController';
registerTranslation('pt', pt)
const AdicionarExistente = ({ route }) => {
    const  {produto} = route.params
    const navigation = useNavigation();
    const [codigoDeBarras, setCodigoDeBarras] = useState(produto.codigoDeBarras);
    const [nomeProduto, setNomeProduto] = useState(produto.nome);
    const [dataValidade, setDataValidade] = useState('');
    const [notificarVencimento, setNotificarVencimento] = useState(false);
    const [dataNotificacao, setDataNotificacao] = useState('');
    const [notificarVencimentoView, setNotificarVencimentoView] = useState('none');
    const [notificarVencimentoStyle, setNotificarVencimentoStyle] = useState(styles.notificarVencimentoEnabled);
    const [preco, setPreco] = useState('');
    const [localCompra, setLocalCompra] = useState('');
    const [categoria, setCategoria] = useState('');

    const salvarItemProduto = async () => {
        const novoItemProduto = {
            key: produto.key,
            codigoDeBarras: produto.codigoDeBarras,
            dataValidade: dataValidade,
            preco:parseFloat(preco),
            localCompra:localCompra,
            categoria:categoria
        }

       
        if (notificarVencimento) {
            
            const notificationId = await scheduleNotificationControl(dataValidade, dataNotificacao, nomeProduto, codigoDeBarras).then(id =>  id);
            console.log("IF: ", notificationId);
        }
        postItemProduto(novoItemProduto)
        navigation.goBack()
    }

    //Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    

    useEffect(() => {

        if (notificarVencimento) {
            setNotificarVencimentoView('flex');
            setNotificarVencimentoStyle(styles.notificarVencimentoFocused);
        } else {
            setNotificarVencimentoView('none');
            setNotificarVencimentoStyle(styles.notificarVencimentoEnabled);
        }

    }, [notificarVencimento])


    

    
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>

                <View>
                    <Image
                        source={{ uri: `https://cdn-cosmos.bluesoft.com.br/products/${produto.codigoDeBarras}` }}
                        style={{
                            alignSelf: 'center',
                            width: 500,
                            height: 300,
                            borderRadius: 15
                        }}
                        resizeMode='contain'
                    />
                </View>



                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    label="Nome do produto"
                    mode="outlined"
                    error={false}
                    value={`${produto.nome} ${produto.marca}`}
                    onChangeText={nomeProduto => setNomeProduto(nomeProduto)}
                    editable={false}
                />

                <DatePickerInput
                    style={{ marginTop: 10, marginHorizontal: 20, width: 100 }}
                    locale='pt'
                    label="Data de validade"
                    value={dataValidade}
                    onChange={dataValidade => setDataValidade(dataValidade)}
                    mode='outlined'
                    error={false}
                />

                <View
                    style={notificarVencimentoStyle}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginStart: 15, marginEnd: 10, marginVertical: 10 }} >
                        <Text variant='labelLarge'>Notificar vencimento do produto</Text>
                        <Switch value={notificarVencimento} onValueChange={notificarVencimento => setNotificarVencimento(notificarVencimento)} />
                    </View>
                    <View style={{ display: `${notificarVencimentoView}`, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginStart: 15, marginVertical: 10 }}>
                        <TextInput
                            keyboardType='numeric'
                            maxLength={2}
                            textAlign='center'
                            style={{ marginEnd: 10, width: 70, textAlign: 'center' }}
                            label="Dias"
                            mode="outlined"
                            error={false}
                            value={dataNotificacao}
                            onChangeText={dataNotificacao => setDataNotificacao(dataNotificacao)}
                        />
                        <Text variant='bodyMedium'>antes da validade.</Text>
                    </View>

                </View>


                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    keyboardType='numeric'
                    label="Preço"
                    mode="outlined"
                    error={false}
                    value={currency.mask({ locale: 'pt-BR', currency: 'BRL', value: preco })}
                    onChangeText={preco => setPreco(currency.unmask({ locale: 'pt-BR', currency: 'BRL', value: preco }))}
                />

                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    label="Local da compra"
                    mode="outlined"
                    error={false}
                    value={localCompra}
                    onChangeText={localCompra => setLocalCompra(localCompra)}
                />
                {/* Listar Categorias */}
                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    label="Categoria"
                    mode="outlined"
                    error={false}
                    value={categoria}
                    onChangeText={categoria => setCategoria(categoria)}
                />


                <Button
                    buttonColor='#5DB075'
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    mode="contained"
                    onPress={()=> salvarItemProduto()}>
                    Adicionar
                </Button>

                <Button
                    textColor='#5DB075'
                    buttonColor='#FFFFFF'
                    style={{ marginTop: 20, marginBottom: 50, marginHorizontal: 20, borderColor: '#5DB075' }}
                    mode="outlined"
                    onPress={showModal}>
                    Cancelar
                </Button>
            </ScrollView>

            <Portal>
                <Modal visible={visible} dismissable={false} dismissableBackButton={false} contentContainerStyle={styles.containerStyle}>
                    <Text variant='titleMedium' style={{ textAlign: 'center' }}>Você tem certeza que quer sair sem adicionar o produto?</Text>

                    <Button
                        textColor='#000'
                        buttonColor='#FFEB3B'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                        onPress={() => navigation.goBack()}>
                        Sair sem adicionar
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

        </PaperProvider>

    );
};

const styles = StyleSheet.create({
    notificarVencimentoEnabled: {
        marginTop: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        backgroundColor: 'rgb(255, 251, 255)',
        borderColor: 'rgb(124, 117, 126)',
        borderRadius: 5
    },
    notificarVencimentoFocused: {
        marginTop: 15,
        marginHorizontal: 20,
        borderWidth: 2,
        backgroundColor: 'rgb(255, 251, 255)',
        borderColor: 'rgb(79,55,139)',
        borderRadius: 5
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8
    }
})

export default AdicionarExistente; 