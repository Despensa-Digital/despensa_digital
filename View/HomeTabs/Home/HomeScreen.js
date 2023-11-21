import { useEffect, useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native'
import { Appbar, Avatar, Button, Divider, PaperProvider, Text, TextInput, IconButton } from 'react-native-paper';
import { signOut } from '../../../Model/Firebase/signOut';
import ProfileAvatar from '../Componentes/ProfileAvatar';
import ListComponent from '../Componentes/ListComponent';
import { getResidenciaAtual } from '../../../Controller/Residencia/residenciaController';


const HomeScreen = () => {

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
                    color: '#00000088', 
                    textAlign: 'center', 
                    fontSize: 20, 
                    marginTop: 50,
                    marginHorizontal: 50
                }}>
                    <Text>
                        Nenhuma Residencia encontrada!
                    </Text>
                    <Text>
                        Por favor cadastre uma residencia clicando em:
                    </Text>
                    <IconButton
                        icon="home-group-plus"
                        size={40}
                        iconColor='#5DB075'
                        onPress={() => navigation.navigate('GerenciarResidencias')}
                    />
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