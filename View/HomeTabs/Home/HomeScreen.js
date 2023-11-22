import React, { useState, useEffect} from 'react';
import { View, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Appbar, Avatar, Button, Divider, PaperProvider, Text, TextInput, IconButton } from 'react-native-paper';
import { signOut } from '../../../Model/Firebase/signOut';
import ProfileAvatar from '../Componentes/ProfileAvatar';
import ListComponent from '../Componentes/ListComponent';
import { getResidenciaAtual } from '../../../Controller/Residencia/residenciaController';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation();

    const [textoQuadro, setTextoQuadro] = useState('Escreva aqui suas anotações...');
    //const [membros, setMembros] = useState([]);
    const [residencia, setResidencia] = useState({ membros: [] });
    //Pegar o id do usuario

    //Listar suas residencias
    //Exibir a primeira residencia
    //Residencia obtida: mostrar a lista de usuários
    //Itens próximos do vencimento?
    

    useEffect(() => {
        carregarResidenciaAtual()
        
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            carregarResidenciaAtual()
            return () => console.log("lista atualizada");
        }, [])
      );

    const carregarResidenciaAtual = () => {
        getResidenciaAtual()
            .then(doc => {
                setResidencia(doc)
                console.log("Home", residencia)
            })
            
    }



    if (residencia == null) {
        return (
            <PaperProvider>
                <View style={{ 
                    textAlign: 'center', 
                    marginTop: 230,
                }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('GerenciarResidencias')} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                        {/* <Image source={require('../../../Assets/Home/empty.jpg')} style={{ alignSelf: "center", width: 170, height: 170 }} />  */}
                        <Text  style={{color:'black', textAlign: "center", fontSize: 18, paddingHorizontal: 20}}>
                        Parece que ainda não há residências vinculadas à sua conta. {"\n"}{"\n"}Clique aqui para criar uma nova residência.
                        </Text>
                    </TouchableOpacity>

                </View>
            </PaperProvider>
        )
    }
    else {
        return (
            <PaperProvider>
                <ScrollView >
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
                            {residencia.membros.map(perfil =>
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
                    {/* <View>
                        <ListComponent itens={products} />
                    </View> */}


                </ScrollView>
            </PaperProvider>

        );
    }

};

export default HomeScreen;