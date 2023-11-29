import { useState } from 'react';
import { View, ScrollView } from 'react-native'
import {  Text } from 'react-native-paper';
import ProfileAvatar from '../Componentes/ProfileAvatar';

//Componente para o ListHeader do FlatList [partes da tela que não são itens da lista]
const HomeListHeader = ({membros}) => {
    // Ainda vai funcionar
    const [textoQuadro, setTextoQuadro] = useState('Escreva aqui suas anotações...');


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

            {/* <TextInput 
                maxLength={150} 
                multiline 
                style={{marginTop:10, marginHorizontal: 22}}
                onChangeText={textoQuadro => setTextoQuadro(textoQuadro)}
            /> */}

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