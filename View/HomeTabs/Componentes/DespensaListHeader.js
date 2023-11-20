import { useState } from 'react';
import { View, ScrollView } from 'react-native'
import { Divider, Searchbar, Text } from 'react-native-paper';
import CategoryAvatar from './CategoryAvatar';

//Componente para o ListHeader do FlatList [partes da tela que não são itens da lista]
const DespensaListHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    //dados mockados -- remover no futuro
    const categorias = [
        { name: 'Todas as categorias', photo: require('../../../Assets/Categories/Hamper.png') },
        { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
        { name: 'Hortifruti', photo: require('../../../Assets/Categories/Fruits.png') },
        { name: 'Armário da cozinha', photo: require('../../../Assets/Categories/Pantry.png') },
        { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png') },
        { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png') }
    ];

    return (
        <>
            <Text
                variant="titleMedium"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Filtrar Categorias
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categorias.map(categoria =>
                        <View key={categoria.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                            <CategoryAvatar categoryKey={categoria.name} name={categoria.name} photo={categoria.photo} />
                        </View>
                    )}
                </ScrollView>
            </View>

            <Text
                variant="titleLarge"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Produtos
            </Text>
            <Text
                variant="titleSmall"
                style={{
                    marginStart: 22,
                    color: '#898585'
                }}>
                Todas as categorias
            </Text>
            <View style={{ marginTop: 10 }}>
                <Divider bold style={{ backgroundColor: '#898585' }} />
                <Searchbar
                    style={{ backgroundColor: '#fff' }}
                    mode='view'
                    placeholder="Procurar produtos"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
        </>
    )
}

export default DespensaListHeader