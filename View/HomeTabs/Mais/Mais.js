import { Button, PaperProvider, Text } from 'react-native-paper';

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
            <Button
                rippleColor="rgba(0, 0, 0, .32)"
                buttonColor='red'
                style={{ marginTop: 50, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => console.log("signOut()")}>
                Log out
            </Button>                  
        </PaperProvider>

    );
};

export default Mais;