import { PaperProvider, Text } from 'react-native-paper';

const Mais = () => {

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
                Estou na tela Mais
            </Text>                
        </PaperProvider>

    );
};

export default Mais;