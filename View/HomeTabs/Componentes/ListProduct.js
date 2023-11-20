import { View } from 'react-native';
import { Divider, List, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListProduct = (props) => {
    const navigation = useNavigation();
    const lista = props.itens.map(product =>

        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={product.key}
                    left={props => <Text>{`Data de validade: ${product.expire}\nLocal de compra: ${product.localCompra}\nPreço: ${product.preco}`}</Text>} 
                    right={props => <IconButton {...props} icon="pencil" onPress={() => navigation.navigate('EditarProduto',{product})} />}
                    onPress={() => navigation.navigate('VerItem', { product })}
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

export default ListProduct;