import { View } from 'react-native';
import { Divider, List, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListProduct = (props) => {
    const navigation = useNavigation();

    const convertData = (data) =>{
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return data.toDate().toLocaleString('pt-BR',options)
    }

    const lista = props.itens.map(product =>
    
        // A chave precisa estar no componente pai, no caso a View
        <View key={product.key}>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={product.key}
                    left={props => <Text>{`Data de validade: ${convertData(product.validade)}\nLocal de compra: ${product.localCompra? product.localCompra: 'Indisponivel'}\nPreço: R$${product.preco}`}</Text>} 
                    // Quando clicar em editar item, precisa ser enviado só os dados do Item ou do Produto também deve ir junto?
                    //Editar item
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