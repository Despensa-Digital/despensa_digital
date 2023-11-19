import { useState } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
//import da Model
//alterar futuramente
import { googleSignIn } from '../Model/Firebase/googleSignIn';

const Cadastro = ({ navigation }) => {

    return (
        <PaperProvider>
            <View style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                <View style={{ alignSelf: 'center', marginBottom: 30 }}>
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={() => googleSignIn().then(() => console.log('Signed in with Google!'))}
                    />
                </View>
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