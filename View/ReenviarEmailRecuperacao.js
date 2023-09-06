import { useState } from 'react';
import { Appbar, Button, PaperProvider, Text, TextInput } from 'react-native-paper';
import { forgotPassword } from '../Model/Firebase/forgotPassword';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const ReenvirEmailRecuperacao = ({navigation, route}) => {
    const {emailUser} = route.params;
    console.log(emailUser)
    const reenviarEmail = () => {
        forgotPassword(emailUser);
    }

    return (
        <PaperProvider >
            
            <Text 
                style={{ 
                    color: '#00000055', 
                    textAlign: 'center', 
                    fontSize: 20, 
                    marginTop: 50,
                    marginHorizontal: 50 
                }}>
                Verifique se você recebeu um e-mail para redefinir sua senha
            </Text>
            

            <MCIcon name='email-alert-outline' size={60} style={{ textAlign: 'center', marginTop: 50 }}/>

            <Button
                buttonColor='#5DB075'
                style={{ marginTop: 50, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => reenviarEmail()}>
                Reenviar
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

export default ReenvirEmailRecuperacao;