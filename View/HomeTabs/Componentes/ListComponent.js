import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';

const ListComponent = (props) => {
    const lista = props.itens.map(product =>
        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={product.key}
                    title={product.name}
                    description={`Data de validade: ${product.expire}`}
                    left={() => <Avatar.Image source={product.image} style={{ backgroundColor: 'transparent' }} size={60} />}
                />
            </View>
            <Divider style={{ height: 1 }} />
        </View>
    )

    return (
        <View>
           {lista} 
        </View>
        
    );
}

export default ListComponent;