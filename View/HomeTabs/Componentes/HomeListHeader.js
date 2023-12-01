import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import ProfileAvatar from '../Componentes/ProfileAvatar';

//Componente para o ListHeader do FlatList [partes da tela que não são itens da lista]
const HomeListHeader = ({ membros }) => {
    // Ainda vai funcionar
    const [textoQuadro, setTextoQuadro] = useState('Escreva aqui suas anotações...');
    const [textoInput, setTextoInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false)

    //Enviar textoQuadro para o firestore

    const saveText = () => {
        setTextoQuadro(textoInput);
        hideModal();
    }

    const openInputText = () => {
        setTextoInput(textoQuadro);
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <Text
                variant="titleMedium"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Membros
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {membros.map(perfil =>
                        <View key={perfil.id} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                            <ProfileAvatar profileKey={perfil.id} name={perfil.nome} photo={perfil.foto} />
                        </View>
                    )}
                </ScrollView>
            </View>

            <Text
                variant="titleMedium"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Quadro de avisos
            </Text>
            <TouchableOpacity onPress={() => openInputText()}>
                <View style={{ marginTop: 10, marginHorizontal: 22, height: 140, borderWidth: 2, borderColor: '#d9d9d9', borderRadius: 10 }}>
                    <Text
                        variant="titleSmall"
                        style={{
                            marginTop: 5,
                            marginHorizontal: 10,
                            color: '#49454F'
                        }}>
                        {textoQuadro}
                    </Text>
                </View>
            </TouchableOpacity>

            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={{ height: '90%', width: '90%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 8 }}>

                    <Text variant={'titleMedium'} style={{ textAlign: 'center', margin: 10 }}>Adicione seu texto no quadro de mensagens</Text>
                    <TextInput
                        maxLength={150}
                        multiline={true}
                        numberOfLines={8}
                        style={{ marginTop: 10, marginHorizontal: 22 }}
                        value={textoInput}
                        onChangeText={textoInput => setTextoInput(textoInput)}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, marginTop: 20, justifyContent: 'center' }}>
                        <Button
                            textColor='#fff'
                            buttonColor='#5DB075'
                            style={{ borderColor: '#5DB075' }}
                            mode="outlined"
                            onPress={() => saveText()}>
                            Salvar
                        </Button>
                        <Button
                            textColor='#5DB075'
                            buttonColor='#FFFFFF'
                            style={{ borderColor: '#5DB075' }}
                            mode="outlined"
                            onPress={() => hideModal()}>
                            Cancelar
                        </Button>
                    </View>
                </Modal>

            </Portal>



            <Text
                variant="titleMedium"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Itens próximos do vencimento
            </Text>
        </>
    )
}

export default HomeListHeader