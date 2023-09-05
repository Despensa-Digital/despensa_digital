import { useState } from 'react';
import { Appbar, Button, PaperProvider, Text, TextInput } from 'react-native-paper';



const RecuperarSenha = ({navigation}) => {
    const [email, setEmail] = useState('');

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
                Insira seu e-mail para redefinir sua senha
            </Text>

            <TextInput
                style={{ marginTop: 50, marginHorizontal: 20 }}
                label="E-mail"
                mode="outlined"
                keyboardType='email-address'
                placeholder='Digite o e-mail cadastrado'
                error={false}
                value={email}
                onChangeText={email => setEmail(email)}
            />

            <Button
                buttonColor='#5DB075'
                style={{ marginTop: 50, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => console.log('Pressed')}>
                Confirmar
            </Button>

            <Button
                textColor='#5DB075'
                buttonColor='#FFFFFF'           
                style={{ marginVertical: 20, marginHorizontal: 20, borderColor: '#5DB075' }}
                mode="outlined"
                onPress={() => navigation.goBack()}>
                Cancelar
            </Button>
          

        </PaperProvider>

    );
};

export default RecuperarSenha;