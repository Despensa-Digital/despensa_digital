import { PaperProvider, Text } from 'react-native-paper';

const AdicionarProduto = () => {

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
                Estou em Adicionar produto
            </Text>
                          
        </PaperProvider>

    );
};

export default AdicionarProduto;