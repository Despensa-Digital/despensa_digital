import { useState } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';

const Cadastro = () => {
    return(
        <PaperProvider>
            <Appbar.Header style={{ marginTop: 20 }}>
                <Appbar.Content 
                    title="Cadastro" 
                    color='rgba(0,0,0,0.2)' 
                    titleStyle={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}
                />
                <TouchableRipple
                    style={{ position: 'absolute', right: 20, top: 20, color: '#5DB075' }}
                    onPress={() => console.log('Pressionei o cadastras')}
                    rippleColor="rgba(0, 0, 0, .32)">
                    <Text style={{ color: '#5DB075', fontSize: 14 }}>Login</Text>
                </TouchableRipple>
            </Appbar.Header>
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
                onPress={() => console.log('Pressed')}>
                Cadastrar usando um e-mail
            </Button>
            </View>
        </PaperProvider>
        
    )
}

export default Cadastro;