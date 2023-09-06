import { useState } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Cadastro = () => {
    const navigation = useNavigation();
    return(
        <PaperProvider>
            <View style={{ marginVertical: 30, alignSelf: 'center' }}>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={() => googleSignIn().then(() => console.log('Signed in with Google!'))}
                />
            </View>
            <Divider horizontalInset bold />
            <View
            style = {{}}
            >
            <Button
                buttonColor='#5DB075'
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => navigation.navigate("CadastroEmail")}>
                Cadastrar usando um e-mail
            </Button>
            </View>
        </PaperProvider>
        
    )
}

export default Cadastro;