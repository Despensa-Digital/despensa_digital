import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//Renderiza item da FlatList da Home
const HomeRenderItem = ({item}) => {
    const navigation = useNavigation();
    
    return (
        <View key={item.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={item.key}
                    title={item.name}
                    description={`Data de validade: ${item.expire}`}
                    left={() =>
                        <FastImage
                            style={{ width: 60 }}
                            source={{
                                uri: item.image.toString(),
                                priority: FastImage.priority.normal,
                            }}
                            defaultSource={require('../../../Assets/Categories/Hamper.png')}
                            resizeMode={FastImage.resizeMode.contain}

                        />
                    }
                    onPress={() => navigation.navigate('DespensaTab', {screen: 'EditarProduto', params: item} )}
                />
            </View>
            <Divider style={{ height: 1 }} />
        </View>
    );
}

export default HomeRenderItem;