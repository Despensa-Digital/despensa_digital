import { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, IconButton, Modal, PaperProvider, Portal, Switch, Text, TextInput } from 'react-native-paper';
import { getProduto, putItemProduto } from '../../../Controller/Produtos/produtosController';
import { DatePickerInput, pt, registerTranslation } from 'react-native-paper-dates';
import { currency, mask, unmask } from 'remask'
import scheduleNotificationControl from '../../../Controller/Despensa/scheduleNotificationControl';
import { Dropdown } from 'react-native-element-dropdown';
import { CategoriasContext } from '../../../App';

registerTranslation('pt', pt)
const AdicionarExistente = ({ route, navigation }) => {
    
    const [produto, setProduto] = useState({})
    const [nomeProduto, setNomeProduto] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [notificarVencimento, setNotificarVencimento] = useState(false);
    const [dataNotificacao, setDataNotificacao] = useState('');
    const [notificarVencimentoView, setNotificarVencimentoView] = useState('none');
    const [notificarVencimentoStyle, setNotificarVencimentoStyle] = useState(styles.notificarVencimentoEnabled);
    const [disableButton, setDisableButton]= useState(false);
    const [categoria, setCategoria] = useState('');
    const [dropdownCategoryIsFocus, setDropdownCategoryIsFocus] = useState(false);
    const {categorias, setCategorias} = useContext(CategoriasContext);
    const categoriasFiltrado = categorias.slice(1);

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
    

    const  {product, productId, nome, codigoDeBarras} = route.params
    console.log("Editar cod de barras: ", product, productId, nome, codigoDeBarras)
    const salvarProduto = async() => {
        const novoProduto = {
            key: product.key,
            categoria:categoria,
            preco: parseFloat(preco),
            validade: dataValidade,
            localCompra: localCompra ? localCompra: ""
        }
        console.log("MINHA CATEGORIA: ", categoria, novoProduto.categoria)
        if (notificarVencimento) {
            
            const notificationId = await scheduleNotificationControl(dataValidade, dataNotificacao, nome, codigoDeBarras).then(id =>  id);
            console.log("IF: ", notificationId);
        }
        console.log("Produto ID", productId,"Item Atualizado", novoProduto)
        await putItemProduto(productId,novoProduto)
        resetarCampos()
        navigation.goBack()
    }

    //Modal
    const [visible, setVisible] = useState(false);
    const [preco, setPreco] = useState('');
    const [localCompra, setLocalCompra] = useState("");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const carregarProduto = () =>{
        console.log("Route params",productId );
        getProduto(productId, (data)=>{
            setProduto(data)
            
        })
        setPreco(product.preco)
        setLocalCompra(product.localCompra)
        setCategoria(product.categoria)
    }

    const convertData = () =>{
        const timestampFromFirestore = product.validade;
        const dateFromTimestamp = new Date(timestampFromFirestore.seconds * 1000 + timestampFromFirestore.nanoseconds / 1000000);
        console.log('Timestamp do Firestore:', timestampFromFirestore);
        console.log('Data Convertida:', dateFromTimestamp);
        setDataValidade(dateFromTimestamp)
        // Se você ainda estiver enfrentando problemas, adicione a formatação:
        // const formattedDate = format(dateFromTimestamp, 'dd/MM/yyyy');
        // console.log('Data Formatada:', formattedDate);

    }

    const resetarCampos = ()=>{
        setDataValidade("")
        setPreco('')
        setLocalCompra('')
        setDataNotificacao('')
    }

    useEffect(() => {

        if (notificarVencimento) {
            setNotificarVencimentoView('flex');
            setNotificarVencimentoStyle(styles.notificarVencimentoFocused);
        } else {
            setNotificarVencimentoView('none');
            setNotificarVencimentoStyle(styles.notificarVencimentoEnabled);
        }

    }, [notificarVencimento])

    useEffect(()=>{ 
            carregarProduto()
            convertData()
            console.log("Minha unidade", product)
            console.log("ProductID", productId)
    },[])
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>
            
                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    label="Nome do produto"
                    mode="outlined"
                    error={false}
                    editable={false}
                    value={produto.nome}
                    onChangeText={nomeProduto => setNomeProduto(nomeProduto)}
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
    
                    value={currency.mask({ locale: 'pt-BR', currency: 'BRL', value: preco})}
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
                        data={categoriasFiltrado}
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

                <Button
                    buttonColor='#5DB075'
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    mode="contained"
                    onPress={()=>salvarProduto()}>
                    Salvar
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
                    <Text variant='titleMedium' style={{textAlign:'center'}}>Você tem certeza que quer sair sem salvar o item? Suas alterações não serão salvas.</Text>

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
    }
})

export default AdicionarExistente; 