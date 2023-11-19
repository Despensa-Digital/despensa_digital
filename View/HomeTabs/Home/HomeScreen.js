import { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Appbar, Avatar, Button, Divider, PaperProvider, Text, TextInput, IconButton } from 'react-native-paper';
import { signOut } from '../../../Model/Firebase/signOut';
import ProfileAvatar from '../Componentes/ProfileAvatar';
import ListComponent from '../Componentes/ListComponent';

import { getResidenciaAtual } from '../../../Controller/Residencia/residenciaController';
import { useNavigation } from '@react-navigation/native';


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
    const photoDefault = '../../../Assets/ProfileThumbnail/saitama.png';
    // const perfis = [
    //     { name: 'Lucas', photo: require('../../../Assets/ProfileThumbnail/boy1.png') },
    //     { name: 'Gabriel', photo: require('../../../Assets/ProfileThumbnail/boy2.png') },
    //     { name: 'Carlos', photo: require('../../../Assets/ProfileThumbnail/boy3.png') },
    //     { name: 'Julio', photo: require('../../../Assets/ProfileThumbnail/boy4.png') },
    //     { name: 'Maria', photo: require('../../../Assets/ProfileThumbnail/girl1.png') },
    //     { name: 'Clara', photo: require('../../../Assets/ProfileThumbnail/girl2.png') },
    //     { name: 'Saitama', photo: require('../../../Assets/ProfileThumbnail/saitama.png') }
    // ];

    const products = [
        { name: 'Beer', image: require('../../../Assets/Products/beer.png'), expire: '30/09/2023', key: 1 },
        { name: 'Coffee', image: require('../../../Assets/Products/Coffee.png'), expire: '30/09/2023', key: 2 },
        { name: 'Cola', image: require('../../../Assets/Products/Cola.png'), expire: '30/09/2023', key: 3 },
        { name: 'Juice', image: require('../../../Assets/Products/Juice.png'), expire: '30/09/2023', key: 4 },
        { name: 'Milk', image: require('../../../Assets/Products/Milk.png'), expire: '30/09/2023', key: 5 },
        { name: 'Rice', image: require('../../../Assets/Products/Rice.png'), expire: '30/09/2023', key: 6 },
    ]

    useEffect(() => {
        carregarResidenciaAtual()
        console.log("minha residencia", residencia)
    }, [])


    const carregarResidenciaAtual = () => {
        getResidenciaAtual()
            .then(doc => {
                setResidencia(doc)
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
                        <Image source={require('../../../Assets/Home/empty.jpg')} style={{ alignSelf: "center", width: 190, height: 190 }} /> 
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
                        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {perfis.map(perfil =>
                                <View key={perfil.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                                    <ProfileAvatar profileKey={perfil.name} name={perfil.name} photo={perfil.photo} />
                                </View>
                            )}
                        </ScrollView> */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {residencia.membros.map(perfil =>
                                <View key={perfil.id} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                                    <ProfileAvatar profileKey={perfil.id} name={perfil.nome} photo={perfil.foto ? perfil.foto : photoDefault} />
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
                    <View>
                        <ListComponent itens={products} />
                    </View>


                </ScrollView>
            </PaperProvider>

        );
    }

};

export default HomeScreen;