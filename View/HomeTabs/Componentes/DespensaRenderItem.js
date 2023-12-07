import {View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//Renderiza item da FlatList da Despensa
const DespensaRenderItem = ({item}) => {
    const navigation = useNavigation();
    const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const convertData = 
        item.itensProdutos?.vencido ? "Produto vencido":
        item?.itensProdutos?.validade.toDate().toLocaleString('pt-BR', options);

    return (
        <View key={item.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={`${item.key}-${numeroAleatorio}`}
                    title={`${item.nome} ${item.marca}`}
                    description={`Data de validade: ${convertData}`}
                    descriptionStyle={
                        item?.itensProdutos?.vencido ? {color:'red'}:null
                    }
                    left={() =>
                        <FastImage
                            style={{ width: 60 }}
                            source={{
                                uri: `https://cdn-cosmos.bluesoft.com.br/products/${item.codigoDeBarras}`.toString(),
                                priority: FastImage.priority.normal,
                            }}
                            defaultSource={require('../../../Assets/Categories/Hamper.png')}
                            resizeMode={FastImage.resizeMode.contain}

                        />
                    }
                        onPress={() => navigation.navigate('VerItem',  item.key )}
                    />
                </View>
                <Divider style={{ height: 1 }} />
            </View>
        );
    }

export default DespensaRenderItem;