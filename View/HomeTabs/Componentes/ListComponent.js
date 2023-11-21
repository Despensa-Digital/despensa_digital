<<<<<<< HEAD
import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, List,Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListComponent = (props) => {
    const navigation = useNavigation();
    const lista = props.itens.map(product =>
        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item               
                    key={product.key}
                    title={`${product.nome} ${product.marca}`}
                    // description={`Data de validade: ${product.expire}`}
                    left={() => 
                        <View>
                            <Avatar.Image source={{uri:`https://cdn-cosmos.bluesoft.com.br/products/${product.codigoDeBarras}`}} style={{ backgroundColor: 'transparent' }} size={60} />
                            <Badge  style={{ backgroundColor: 'green', marginTop: -20}}>{product.size}</Badge>
                        </View>  
                    }
                    onPress={() => navigation.navigate('EditarProduto')}
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

=======
import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListComponent = (props) => {
    const navigation = useNavigation();
    const lista = props.itens.map(product =>
        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item               
                    key={product.key}
                    title={product.name}
                    description={`Data de validade: ${product.expire}`}
                    left={() => <Avatar.Image source={product.image} style={{ backgroundColor: 'transparent' }} size={60} />}
                    onPress={() => navigation.navigate('EditarProduto',{product}) }
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

>>>>>>> origin/luna_novo
export default ListComponent;