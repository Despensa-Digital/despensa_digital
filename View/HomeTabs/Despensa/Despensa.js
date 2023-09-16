import { Button, PaperProvider, Text } from 'react-native-paper';

const Despensa = ({navigation}) => {

    return (
        <PaperProvider>
            <Text 
                style={{ 
                    color: '#00000088', 
                    textAlign: 'center', 
                    fontSize: 20, 
                    marginTop: 50,
                    marginHorizontal: 50
                }}>
                Estou na Despensa
            </Text> 
            <Button
                buttonColor='#5DB075'
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => navigation.navigate('AdicionarProduto')}>
                Ir para adicionar produto
            </Button>                 
        </PaperProvider>

    );
};

export default Despensa;