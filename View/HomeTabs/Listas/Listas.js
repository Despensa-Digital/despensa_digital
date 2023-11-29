import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Linking, Image } from 'react-native';
import { ActivityIndicator, IconButton, Divider, List, FAB, Modal, Portal, Text, Button, PaperProvider, TextInput } from 'react-native-paper';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { deleteListaDeCompras, getListaDeCompras, postListaDeCompras } from '../../../Controller/ListaDeCompras/listaController';


const Listas = () => {
    const [itens, setItens] = useState(
        [
            "Lista do mercado",
            "Lista do churrasco",
            "Lista do açougue", 
            "Lista de guloseimas", 
            "Lista da festa ",
            "Lista do Supermercado",
            "Lista de Produto/Limpeza", 
            "Lista do Pet Shop",
            "Lista do café da manha",
            "Lista dos congelados"
        ]
    );

    const navigation = useNavigation();

    const [modalOpcoes, setModalOpcoes] = useState(false);
    const [indexEditando, setIndexEditando] = useState();
    const [loading, setLoading] = useState(true);
    const [listaDeCompras, setListasDeCompras] = useState([])

    const editandoOpcoes = (index) => {
        setIndexEditando(index);
        setModalOpcoes(true);
    }

    const removerItemEditando =  async () => {
        console.log("Lista removida com sucesso!", indexEditando)

        await deleteListaDeCompras(indexEditando)
        setModalOpcoes(false);
        setModalRemover(false)
        setIndexEditando(null);
        carregarListaDeCompras()
    }

    const [modalRemover, setModalRemover] = useState(false);

    const [modalCompartilhar, setModalCompartilhar] = useState(false);

    const abrrirFecharRemover = () => {
        setModalRemover(!modalRemover);
        setModalOpcoes(!modalOpcoes);
    }

    const abrrirFecharCompartilhar = () => {
        setModalCompartilhar(!modalCompartilhar);
        setModalOpcoes(!modalOpcoes);
    }

    const adicionarNovaLista = () => {
        console.log("Lista adicionada com sucesso", nomeDaLista)
        if(nomeDaLista !== '')
            postListaDeCompras(nomeDaLista)

        setNomeDaLista('')
        setModalNovaLista(false);
        carregarListaDeCompras()
    }
    const [modalNovaLista, setModalNovaLista] = useState(false);
    const [nomeDaLista, setNomeDaLista] = useState('');


    const carregarListaDeCompras = async ()=>{
        const lista = await getListaDeCompras()

        console.log("Lista de Compras", lista)
        setListasDeCompras(lista)
        setLoading(false)
    }


    useEffect(()=>{
        carregarListaDeCompras()
    },[])

    useFocusEffect(
        React.useCallback(() => {
            carregarListaDeCompras()
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
    return (
        <PaperProvider>
            <FlatList
                data={listaDeCompras}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index}) => {
                    return (
                        <View key={`${index}-${item.key}`}>
                            <List.Item
                                title={item.nome}
                                titleStyle={styles.textBox}
                                onPress={() => navigation.navigate('Lista de compras', {listaId:item.key})}
                                right={props => <IconButton {...props} icon="dots-vertical" onPress={() => editandoOpcoes(item.key)} />}
                                left={props => <List.Icon {...props} icon={require('../../../Assets/Categories/Hamper.png')} />}
                            />
                            <Divider style={{ height: 1 }} />
                        </View>
                    );
                }}
                ListEmptyComponent={()=>{
                    return(
                        <View style={{  flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../../../Assets/Categories/Hamper.png')}
                                style={{ marginTop: 30, opacity: 0.8 }}
                            />
                            <Text
                                variant="headlineMedium"
                                style={{
                                    fontSize: 18,
                                    color: '#898585',
                                    textAlign: 'center',
                                    marginTop: 10,
                                }}>
                                Listas de Compras vazia!
                            </Text>
                        </View>
                    )
                }}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setModalNovaLista(true)}
            />
            <Portal>
                <Modal visible={modalNovaLista} onDismiss={() => setModalNovaLista(false)} contentContainerStyle={styles.containerStyle}>
                    <TextInput
                        style={{ marginTop: 20, marginHorizontal: 20 }}
                        label="Nome da nova lista"
                        mode="outlined"
                        error={false}
                        value={nomeDaLista}
                        onChangeText={nomeDaLista => setNomeDaLista(nomeDaLista)}
                    />
                    <Button
                        textColor='#fff'
                        buttonColor='#5DB075'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                        onPress={() => adicionarNovaLista()}>
                        Adicionar
                    </Button>
                    <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        onPress={() => setModalNovaLista(false)}>
                        Cancelar
                    </Button>
                </Modal>
            </Portal>
            <Portal>
                <Modal visible={modalOpcoes} onDismiss={() => setModalOpcoes(false)} contentContainerStyle={styles.containerStyle}>
                    <List.Item
                        onPress={() => abrrirFecharRemover()}
                        title={"            Remover"}
                        titleStyle={styles.textBoxRemover}
                        right={props => <IconButton {...props} icon="minus-circle-outline"  />}
                    />
                    <List.Item
                        onPress={() => abrrirFecharCompartilhar()}
                        title={"            Compartilhar"}
                        titleStyle={styles.textBoxCompartilhar}
                        right={props => <IconButton {...props} icon="share-variant-outline"  />}
                    />
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={modalRemover} onDismiss={() => abrrirFecharRemover()} contentContainerStyle={styles.containerStyle}>
                    <Text variant='titleMedium' style={{ textAlign: 'center' }}>Você tem certeza que quer excluir essa lista de compras?</Text>

                    <Button
                        textColor='#FFFFFF'
                        buttonColor='#ff0000'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                        onPress={() => removerItemEditando()}
                    >
                        Remover
                    </Button>

                    <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        onPress={() => abrrirFecharRemover()}
                    >
                        Cancelar
                    </Button>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={modalCompartilhar} onDismiss={() => abrrirFecharCompartilhar()} contentContainerStyle={styles.containerStyle}>
                    <Button
                        icon='whatsapp'
                        textColor='#FFFFFF'
                        buttonColor='#5DB075'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                        //Enviar os itens da lista selecionada para o Whatsapp
                        onPress={() => Linking.openURL('whatsapp://send?text=LISTA DE COMPRA:\n Arroz, Cerveja, Leite&')}
                    >
                        Compartilhar com o  Whatsapp
                    </Button>

                    <Button
                        icon='email-outline'
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        //Enviar os itens da lista selecionada para o Email
                        onPress={() => Linking.openURL('mailto:giulianna.lancellotti@gmail.com?subject=Lista do mercado&body= LISTA DE COMPRAS:\n Arroz, Cerveja, Leite')}
                    >
                        Compartilhar com o e-mail
                    </Button>
                </Modal>
            </Portal>

        </PaperProvider >
    )
}


const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8
    },

    textBox: {
        // position: 'center',
        fontSize: 21,
        marginTop: 5,
    },

    textBoxRemover: {
        // position: 'center',
        fontSize: 21,
    },

    textBoxCompartilhar: {
        // position: 'center',
        fontSize: 21,
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#b0ea93'
    },
});


export default Listas