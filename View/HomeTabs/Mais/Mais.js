import { Button, PaperProvider, Text } from 'react-native-paper';
import { signOut } from '../../../Model/Firebase/signOut';
import { removeResidenciaStorage } from '../../../Controller/Despensa/storage';

const Mais = () => {
    const deslogar = ()=>{
        // removeResidenciaStorage()
        signOut()
    }

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
            <Button
                rippleColor="rgba(0, 0, 0, .32)"
                buttonColor='red'
                style={{ marginTop: 50, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => deslogar()}>
                Log out
            </Button>                  
        </PaperProvider>

    );
};

export default Mais;