import { useState, useEffect, useRef, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Button, IconButton, Modal, PaperProvider, Portal, Switch, Text, TextInput, ActivityIndicator, MD2Colors } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks'
import { useCameraPermission, useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';
import { DatePickerInput, pt, registerTranslation } from 'react-native-paper-dates';
import { postProdutos } from '../../../Controller/Produtos/produtosController';
import { useNavigation } from '@react-navigation/native';
import { currency } from 'remask';
import { Dropdown } from 'react-native-element-dropdown';
import MessageSnackBar from '../Componentes/MessageSnackBar';
import scheduleNotificationControl from '../../../Controller/Despensa/scheduleNotificationControl';
import FastImage from 'react-native-fast-image';
registerTranslation('pt', pt)
const AdicionarProduto = ({ route }) => {
    const navigation = useNavigation();
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [marca, setMarca] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [notificarVencimento, setNotificarVencimento] = useState(false);
    const [dataNotificacao, setDataNotificacao] = useState('');
    const [notificarVencimentoView, setNotificarVencimentoView] = useState('none');
    const [notificarVencimentoStyle, setNotificarVencimentoStyle] = useState(styles.notificarVencimentoEnabled);
    const [preco, setPreco] = useState('');
    const [localCompra, setLocalCompra] = useState('');
    const [categoria, setCategoria] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [peso, setPeso] = useState('');
    const [quantidade, setQuantidade] = useState('1');
    const inputRef = useRef(null);


    const [disableButton, setDisableButton] = useState(false);
    const [dropdownCategoryIsFocus, setDropdownCategoryIsFocus] = useState(false);
    const [dropdownMedidaIsFocus, setDropdownMedidaIsFocus] = useState(false);
    const categorias = route.params.slice(1)
    
    //Snackbar
    const [snackBarVisible, setSnackBarVisible] = useState(false)

    const onToggleSnackBar = () => setSnackBarVisible(!visible);

    const onDismissSnackBar = () => setSnackBarVisible(false);



    const maisQuantidade = () => {
        const sum = parseInt(quantidade) + 1;
        setQuantidade(sum.toString());
    }

    const menosQuantidade = () => {
        const sub = parseInt(quantidade) - 1;

        if(sub >= 1) setQuantidade(sub.toString());
    }


    useEffect(() => {
        if (quantidade <= 0) {
            setQuantidade('0');
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }


    }, [quantidade])

    //Modal
    const [modal, setModal] = useState(false);
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


    // Camera + codigo de barras

    const { hasPermission, requestPermission } = useCameraPermission()
    const [isActive, setIsActive] = useState(true)
    const [oneTime, setOnTime] = useState(true)
    const camera = useRef();
    const device = useCameraDevice('back')
    const isFocused = useIsFocused()
    const appState = useAppState()
    const isCameraActive = isFocused && appState === "active"


    useEffect(() => {
        if (!hasPermission)
            requestPermission()
    }, [])

    const getAhCode = useCallback((code) => {
        const value = code[0]?.value
        if (value == null || !oneTime)
            return

        setCodigoDeBarras(code[0].value)
        setModal(false)
        setIsActive(false)
        setOnTime(false)



    }, [oneTime])


    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13', 'ean-8'],
        onCodeScanned: getAhCode,
    });

    const handleIconPress = () => {
        setModal(!modal)
        setOnTime(true)

        if (inputRef.current)
            inputRef.current.blur();
    }

    const dismissableModalCode = () => {
        setOnTime(true)
        setModal(false)
    }

    const limparCampos = () => {
        setCodigoDeBarras('')
        setNomeProduto('')
        setMarca('')
        setDataValidade('')
        setNotificarVencimento(false)
        setDataNotificacao('')
        setNotificarVencimentoView('none')
        setNotificarVencimento(styles.notificarVencimentoEnabled)
        setPreco('')
        setLocalCompra('')
        setCategoria('')
        setUnidadeMedida('')
        setPeso('')
        setQuantidade('0')
        setIsActive(false)
    }

    //Adicionar Produto na Despensa
    const salvarProduto = async () => {
        const produto = {
            codigoDeBarras: codigoDeBarras,
            nomeProduto: nomeProduto,
            marca: marca,
            dataValidade: dataValidade,
            notificarVencimento: notificarVencimento,
            dataNotificacao: dataNotificacao,
            preco: parseFloat(preco),
            localCompra: localCompra,
            categoria: categoria,
            unidadeMedida: unidadeMedida.toUpperCase(),
            peso: parseFloat(peso),
            quantidade: parseInt(quantidade),
        }
        console.log("Data de Validade", dataValidade)
        console.log(dataValidade instanceof Date)
        console.log("Meu produto", produto)
        //Cria notificacao
        //Adicionar id como parametro
        if (notificarVencimento) {

            const notificationId = await scheduleNotificationControl(dataValidade, dataNotificacao, nomeProduto, codigoDeBarras).then(id =>  id);
            console.log("IF: ", notificationId);
        }


        console.log("Meu produto \n", produto)
        postProdutos(produto)
        limparCampos()
        onToggleSnackBar()
        setTimeout(() => {
            navigation.goBack()
        }, 3000)

    }

    //Executa ao tirar o foco (clicar fora) do TextInput Codigo de barras
    const onEndingCodebar = () => {
        if(codigoDeBarras.length == 8 || codigoDeBarras.length == 13){
            console.log("TERMINEI DE DIGITAR O CÓDIGO DE BARRAS");
            console.log("Meu código de barras", codigoDeBarras)
            setIsActive(false)
        }else{
            console.log('NÃO TERMINEI DE DIGITAR...')
        }
    }

    //Lista de unidade de medidas exibido no dropdown
    const medidas = [
        { name: 'g', value: '1' },
        { name: 'kg', value: '2' },
        { name: 'ml', value: '3' },
        { name: 'l', value: '4' },
        { name: 'unidade(s)', value: '5' },
        { name: 'dúzia', value: '6' }
    ];

    //renderiza label do dropdown categoria
    const renderLabelCategoria = () => {
        if (categoria || dropdownCategoryIsFocus) {
            return (
                <Text style={[styles.label, dropdownCategoryIsFocus && { color: 'rgb(79,55,139)' }]}>
                    Categoria
                </Text>
            );
        }
        return null;
    };

    //renderiza label do dropdown unidade de medida
    const renderLabelMedida = () => {
        if (unidadeMedida || dropdownMedidaIsFocus) {
            return (
                <Text style={[styles.labelMedida, dropdownMedidaIsFocus && { color: 'rgb(79,55,139)' }]}>
                    Unidade de medida
                </Text>
            );
        }
        return null;
    };

    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                {
                    isActive ?
                        <View

                            style={{
                                marginTop: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                backgroundColor: 'lightgrey',
                                borderRadius: 15,
                                width: 100,
                                height: 100
                            }}>

                            <IconButton
                                style={{ flex: 1 }}
                                icon="camera-plus-outline"
                                size={40}
                                onPress={() => {
                                    setModal(!modal)
                                }}
                            />

                        </View> :
                        <View>
                            <FastImage
                                style={{
                                    alignSelf: 'center',
                                    width: 500,
                                    height: 300,
                                    borderRadius: 15
                                }}
                                source={{
                                    uri: `https://cdn-cosmos.bluesoft.com.br/products/${codigoDeBarras}`.toString(),
                                    priority: FastImage.priority.normal,
                                }}
                                defaultSource={require('../../../Assets/Categories/Hamper.png')}
                                resizeMode={FastImage.resizeMode.contain}                       
                            />
                        </View>

                }





                <TextInput
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    ref={inputRef}
                    label="Código de barras"
                    mode="outlined"
                    error={false}
                    value={codigoDeBarras}
                    right={<TextInput.Icon icon='barcode-scan' onPress={handleIconPress} />}
                    onChangeText={codigoDeBarras => setCodigoDeBarras(codigoDeBarras)}
                    keyboardType='numeric'
                    maxLength={13}
                    onEndEditing={onEndingCodebar}
                />
                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    label="Nome do produto"
                    mode="outlined"
                    error={false}
                    value={nomeProduto}
                    onChangeText={nomeProduto => setNomeProduto(nomeProduto)}
                />

                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    label="Marca"
                    mode="outlined"
                    error={false}
                    value={marca}
                    onChangeText={marca => setMarca(marca)}
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

                <View>
                    {renderLabelCategoria()}
                    <Dropdown
                        style={[styles.dropdown, dropdownCategoryIsFocus && { borderColor: 'rgba(79,55,139,0.87)', borderWidth: 2 }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        showsVerticalScrollIndicator={true}
                        autoScroll={false}
                        data={categorias}
                        search
                        maxHeight={300}
                        labelField="nome"
                        valueField="nome"
                        placeholder={!dropdownCategoryIsFocus ? 'Categoria' : '...'}
                        searchPlaceholder="Pesquisar..."
                        value={categoria}
                        onFocus={() => setDropdownCategoryIsFocus(true)}
                        onBlur={() => setDropdownCategoryIsFocus(false)}
                        onChange={item => {
                            setCategoria(item.nome);
                            setDropdownCategoryIsFocus(false);
                        }}
                    />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginStart: 20, marginEnd: 20}} >
                    
                    <TextInput
                        style={{ width: '40%' }}
                        keyboardType='numeric'
                        label="Peso"
                        placeholder='Ex.: 395'
                        mode="outlined"
                        error={false}
                        value={peso}
                        onChangeText={peso => setPeso(peso)}
                    />

                    <View style={{ width: '50%', paddingTop: 6 }}>
                        {renderLabelMedida()}
                        <Dropdown
                            style={[styles.dropdownMedida, dropdownMedidaIsFocus && { borderColor: 'rgb(79,55,139)', borderWidth: 2 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            itemTextStyle={styles.itemTextStyle}
                            showsVerticalScrollIndicator={true}
                            autoScroll={false}
                            data={medidas}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="name"
                            placeholder={!dropdownMedidaIsFocus ? 'Medida' : '...'}
                            searchPlaceholder="Pesquisar..."
                            value={unidadeMedida}
                            onFocus={() => setDropdownMedidaIsFocus(true)}
                            onBlur={() => setDropdownMedidaIsFocus(false)}
                            onChange={item => {
                                setUnidadeMedida(item.name);
                                setDropdownMedidaIsFocus(false);
                            }}
                        />
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginStart: 20, marginEnd: 10, alignItems: 'center' }}>


                    <IconButton
                        icon="minus"
                        size={24}
                        mode='outlined'
                        iconColor='red'
                        style={{ marginEnd: 10, marginTop: 10, borderColor: 'red' }}
                        disabled={disableButton}
                        onPress={menosQuantidade}
                    />
                    <TextInput
                        textAlignVertical='center'
                        keyboardType='numeric'
                        maxLength={2}
                        textAlign='center'
                        style={{ marginEnd: 10, width: 120, textAlign: 'center' }}
                        label="Quantidade"
                        mode="outlined"
                        error={false}
                        value={quantidade}
                        onChangeText={quantidade => setQuantidade(quantidade)}
                    />

                    <IconButton
                        icon="plus"
                        size={24}
                        mode='outlined'
                        iconColor='green'
                        style={{ marginTop: 10, borderColor: 'green' }}
                        onPress={(maisQuantidade)}
                    />
                </View>

                <Button
                    buttonColor='#5DB075'
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    mode="contained"
                    onPress={() => salvarProduto()}>
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
            <MessageSnackBar 
                visible={snackBarVisible}
                setVisible={onDismissSnackBar} 
                message={"Produto adicionado com sucesso!"}
                icon={"check-decagram"}
            />                   
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
            <Portal>
                {/* {modal && (<CameraProduto setModal={setModal} modal={modal}/>)} */}
                <Modal visible={modal}
                    onDismiss={dismissableModalCode}
                    dismissable={true}
                    dismissableBackButton={true}
                    contentContainerStyle={styles.containerStyle}>
                    <View style={{

                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: 'lightgrey',
                        borderRadius: 15,
                        width: "100%",
                        height: 400
                    }}>
                        <Text variant='titleMedium' style={{
                            textAlign: 'center',
                            color: "white",
                            position: 'absolute',
                            zIndex: 1
                        }}>
                            Aponte a camera para o codigo de barras do produto
                        </Text>
                        <Camera
                            ref={camera}
                            style={StyleSheet.absoluteFillObject}
                            device={device}
                            codeScanner={codeScanner}
                            isActive={isCameraActive}
                        />
                    </View>
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
    },
    //dropdown categoria
    dropdown: {
        height: 48,
        borderColor: 'rgb(124, 117, 126)',
        backgroundColor: 'rgb(255, 251, 255)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginTop: 20
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'rgba(79,55,139, 0.87)',
        left: 30,
        top: 12,
        zIndex: 999,
        paddingHorizontal: 4,
        fontSize: 12,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'rgb(0, 0, 0)',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemTextStyle: {
        color: 'rgb(0, 0, 0)',
    },

    //dropdown unidade de medida
    dropdownMedida: {
        height: 50,
        borderColor: 'rgb(124, 117, 126)',
        backgroundColor: 'rgb(255, 251, 255)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15
    },
    labelMedida: {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'rgba(79,55,139, 0.87)',
        left: 10,
        top: -2,
        zIndex: 999,
        fontSize: 12,
        paddingHorizontal:4,
        paddingVertical:0,
        marginVertical:0

    },
})

export default AdicionarProduto;