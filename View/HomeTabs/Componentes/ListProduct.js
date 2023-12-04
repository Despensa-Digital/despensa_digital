import { View } from 'react-native';
import { Divider, List, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { currency } from 'remask';

const ListProduct = ({produtoId, itens}) => {
    const navigation = useNavigation();

    const convertData = (timestamp) =>{
        const dataItem = new Date(timestamp.seconds * 1000);
        dataItem.setMilliseconds(timestamp.nanoseconds / 1000000);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return dataItem.toLocaleDateString('pt-BR', options);
    }

    const lista = itens.map(product =>
    
        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={product.key}
                    left={props => <Text>{`Data de validade: ${convertData(product.validade)}\nLocal de compra: ${product.localCompra}\nPreço: ${currency.mask({ locale: 'pt-BR', currency: 'BRL', value: product.preco })}`}</Text>} 
                    // Quando clicar em editar item, precisa ser enviado só os dados do Item ou do Produto também deve ir junto?
                    //Editar item
                    right={props => <IconButton {...props} icon="pencil" onPress={() => navigation.navigate('EditarUnidade', {product, productId:produtoId})} />}
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