import { useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native'
import { Appbar, Avatar, Button, Divider, PaperProvider, Text, TextInput } from 'react-native-paper';
import { signOut } from '../../../Model/Firebase/signOut';
import ProfileAvatar from '../Componentes/ProfileAvatar';
import ListItem from '../Componentes/ListItem';

const HomeScreen = () => {

    const [textoQuadro, setTextoQuadro] = useState('Escreva aqui suas anotações...');

    const perfis = [
        { name: 'Lucas', photo: require('../../../Assets/ProfileThumbnail/boy1.png') },
        { name: 'Gabriel', photo: require('../../../Assets/ProfileThumbnail/boy2.png') },
        { name: 'Carlos', photo: require('../../../Assets/ProfileThumbnail/boy3.png') },
        { name: 'Julio', photo: require('../../../Assets/ProfileThumbnail/boy4.png') },
        { name: 'Maria', photo: require('../../../Assets/ProfileThumbnail/girl1.png') },
        { name: 'Clara', photo: require('../../../Assets/ProfileThumbnail/girl2.png') },
        { name: 'Saitama', photo: require('../../../Assets/ProfileThumbnail/saitama.png') }
    ];

    const products = [
        { name: 'Beer', image: require('../../../Assets/Products/beer.png'), expire: '30/09/2023', key: 1 },
        { name: 'Coffee', image: require('../../../Assets/Products/Coffee.png'), expire: '30/09/2023', key: 2 },
        { name: 'Cola', image: require('../../../Assets/Products/Cola.png'), expire: '30/09/2023', key: 3 },
        { name: 'Juice', image: require('../../../Assets/Products/Juice.png'), expire: '30/09/2023', key: 4 },
        { name: 'Milk', image: require('../../../Assets/Products/Milk.png'), expire: '30/09/2023', key: 5 },
        { name: 'Rice', image: require('../../../Assets/Products/Rice.png'), expire: '30/09/2023', key: 6 },
    ]


    return (
        <PaperProvider>
            <ScrollView>
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
                        {perfis.map(perfil =>
                            <View key={perfil.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                                <ProfileAvatar profileKey={perfil.name} name={perfil.name} photo={perfil.photo} />
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
                    {products.map(product =>
                        <ListItem productName={product.name} productImage={product.image} expireDate={product.expire} productKey={product.key} />
                    )}
                </View>


            </ScrollView>
        </PaperProvider>

    );
};

export default HomeScreen;