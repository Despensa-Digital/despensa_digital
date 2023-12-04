import React from 'react'
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


//Renderiza item da FlatList da Home
const HomeRenderItem = ({item}) => {
  
    const navigation = useNavigation();
    const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
    
    
    const convertData = (timestamp) =>{
        console.log("Primeiro a carregar HEHE");
        const dataItem = new Date(timestamp.seconds * 1000);
        dataItem.setMilliseconds(timestamp.nanoseconds / 1000000);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return dataItem.toLocaleString('pt-BR', options);
        
    }

    const dataValidadeConvertida = convertData(item.itemProduto.validade);
    
    return ( 
        <View >
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={`${item.key}-${numeroAleatorio}`}
                    title={`${item.nome} ${item.marca}` }
                    description={`Data de validade: ${dataValidadeConvertida}`}
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
                    //onPress={() => navigation.navigate('DespensaTab', {screen: 'VerItem', params: item} )}
                />
            </View>
            <Divider style={{ height: 1 }} />
        </View>
    );

}

export default HomeRenderItem;