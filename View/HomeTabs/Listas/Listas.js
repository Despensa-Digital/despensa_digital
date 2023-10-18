import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList, View } from 'react-native';
import { IconButton, Divider, List, FAB, Modal, Portal, Text, Button, PaperProvider, TextInput } from 'react-native-paper';
import ListasStackScreen from './ListasStackScreen';
import { useNavigation } from '@react-navigation/native';


const Listas = () => {
    const itens = ["Lista do mercado", "Lista do churrasco", "Lista do açougue", "Lista de guloseimas", "Lista do mercado", "Lista do churrasco", "Lista do açougue", "Lista de guloseimas", "Lista do churrasco", "Lista do açougue", "Lista de guloseimas", "Lista do churrasco", "Lista do açougue", "Lista de guloseimas"];
    
    const navigation = useNavigation();

    const [modalOpcoes, setModalOpcoes] = useState(false);

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


    const [modalNovaLista, setModalNovaLista] = useState(false);
    const [nomeDaLista, setNomeDaLista] = useState('');

    return (
        <PaperProvider>
            <FlatList
                data={itens}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => String(item)}
                renderItem={({ item, index }) => {
                    return (
                        <View key={`${index}-${item}`}>
                            <List.Item
                                title={item}
                                titleStyle={styles.textBox}
                                onPress={() => navigation.navigate('Lista Mercado')}
                                right={props => <IconButton {...props} icon="dots-vertical" onPress={() => setModalOpcoes(true)} />}
                                left={props => <List.Icon {...props} icon={require('../../../Assets/Categories/Hamper.png')} />}
                            />
                            <Divider style={{ height: 1 }} />
                        </View>
                    );
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
                        onPress={() => setModalNovaLista(false)}>
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
                        title={"            Remover"}
                        titleStyle={styles.textBoxRemover}
                        right={props => <IconButton {...props} icon="minus-circle-outline" onPress={() => abrrirFecharRemover()} />}
                    />
                    <List.Item
                        title={"            Compartilhar"}
                        titleStyle={styles.textBoxCompartilhar}
                        right={props => <IconButton {...props} icon="share-variant-outline" onPress={() => abrrirFecharCompartilhar()} />}
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
                    >
                        Remover
                    </Button>

                    <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        >
                        Cancelar
                    </Button>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={modalCompartilhar} onDismiss={() => abrrirFecharCompartilhar()} contentContainerStyle={styles.containerStyle}>
                    <Button
                        icon= 'whatsapp'
                        textColor='#FFFFFF'
                        buttonColor='#5DB075'
                        style={{ marginTop: 40, marginHorizontal: 20 }}
                        mode="contained"
                    >
                        Compartilhar com o  Whatsapp
                    </Button>

                    <Button
                        icon= 'email-outline'
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        >
                        Compartilhar com o e-mail
                    </Button>
                </Modal>
            </Portal>

        </PaperProvider>
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
        position: 'center',
        fontSize: 21,
        marginTop: 5,
    },

    textBoxRemover: {
        position: 'center',
        fontSize: 21,
    },

    textBoxCompartilhar: {
        position: 'center',
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