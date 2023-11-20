import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, IconButton, Modal, PaperProvider, Portal, Switch, Text, TextInput } from 'react-native-paper';

//Adicionar props nos estados
const EditarProduto = ({route, navigation}) => {
    const {product} = route.params;
    //console.log(product.name)

    const [codigoDeBarras, setCodigoDeBarras] = useState(product.codigoDeBarras);
    const [nomeProduto, setNomeProduto] = useState(product.name);
    const [marca, setMarca] = useState(product.marca);
    const [categoria, setCategoria] = useState(product.categoria);
    const [unidadeMedida, setUnidadeMedida] = useState(product.unidadeMedida);
    const [peso, setPeso] = useState(product.peso);
    const [quantidade, setQuantidade] = useState(product.quantidade);
    const [disableButton, setDisableButton]= useState(false);
    
    const editarProduto = () => {
        const produtoEditado = {
            produtoEditado: true,
            key: product.key,
            codigoDeBarras: codigoDeBarras,
            nomeProduto: nomeProduto,
            marca: marca,
            categoria: categoria,
            unidadeMedida: unidadeMedida,
            peso: peso,
            quantidade: quantidade
        }

        navigation.navigate({
            name: 'Despensa',
            params: produtoEditado,
            merge: true
        })
    }

    const maisQuantidade = () =>{
       const sum = parseInt(quantidade) + 1;
       setQuantidade(sum.toString()); 
    }
    
    const menosQuantidade = () =>{
        const sub = parseInt(quantidade) - 1;
        setQuantidade(sub.toString()); 
    }
    
   
    useEffect(() => {
        if(quantidade <= 0) {
            setQuantidade('0');
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [quantidade])

    //Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
    return (
        <PaperProvider>
            <ScrollView style={{ backgroundColor: '#fff' }}>

                <TextInput
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    label="Código de barras"
                    mode="outlined"
                    error={false}
                    value={codigoDeBarras}
                    onChangeText={codigoDeBarras => setCodigoDeBarras(codigoDeBarras)}
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

                <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20 }}
                    keyboardType='numeric'
                    label="Categoria"
                    mode="outlined"
                    error={false}
                    value={categoria}
                    onChangeText={categoria => setCategoria(categoria)}
                />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginStart: 20, marginEnd: 10 }} >

                    <TextInput
                        style={{ marginEnd: 10, width: '40%' }}
                        keyboardType='numeric'
                        label="Peso"
                        placeholder='Ex.: 395'
                        mode="outlined"
                        error={false}
                        value={peso}
                        onChangeText={peso => setPeso(peso)}
                    />

                    <TextInput
                        style={{ marginEnd: 10, width: '50%' }}
                        keyboardType='numeric'
                        label="Unidade de medida"
                        placeholder='Ex.: g, kg, ml'
                        mode="outlined"
                        error={false}
                        value={unidadeMedida}
                        onChangeText={unidadeMedida => setUnidadeMedida(unidadeMedida)}
                    />
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
                        onPress={maisQuantidade}
                    />
                </View>

                <Button
                    buttonColor='#5DB075'
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    mode="contained"
                    onPress={editarProduto}>
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
                    <Text variant='titleMedium' style={{textAlign:'center'}}>Você tem certeza que quer sair sem adicionar o produto?</Text>

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

export default EditarProduto;