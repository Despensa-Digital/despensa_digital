import { useState } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';

//import da Model
//alterar futuramente


const Cadastro = ({ navigation }) => {
    
    return (
        <PaperProvider>
            <View style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
             
                <Divider horizontalInset bold />

                <Button
                    buttonColor='#5DB075'
                    style={{ marginTop: 30, marginHorizontal: 20 }}
                    mode="contained"
                    onPress={() => navigation.navigate('CadastroEmail')}>
                    Cadastrar usando um e-mail
                </Button>

            </View>
        </PaperProvider>

    )
}

export default Cadastro;