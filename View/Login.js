import { useState } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState(false);
    const [showPass, setShowPass] = useState("eye");

    const changeSecureTextEntry = value => {
        setStatus(status === false ? true : false);
        setShowPass(showPass === 'eye' ? 'eye-off' : 'eye');

    };

    return (
        <PaperProvider >
            <Appbar.Header style={{ marginTop: 20 }}>
                <Appbar.Content 
                    title="Login" 
                    color='rgba(0,0,0,0.2)' 
                    titleStyle={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}
                />
                <TouchableRipple
                    style={{ position: 'absolute', right: 20, top: 20, color: '#5DB075' }}
                    onPress={() => console.log('Pressionei o cadastras')}
                    rippleColor="rgba(0, 0, 0, .32)">
                    <Text style={{ color: '#5DB075', fontSize: 14 }}>Cadastrar</Text>
                </TouchableRipple>
            </Appbar.Header>

            <Text 
                style={{ 
                    color: '#00000077', 
                    textAlign: 'center', 
                    fontSize: 16, 
                    marginTop: 20 
                }}>
                Se conectar usando uma conta Google
            </Text>

            <View style={{ marginVertical: 30, alignSelf: 'center' }}>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={() => googleSignIn().then(() => console.log('Signed in with Google!'))}
                />
            </View>

            <Divider horizontalInset bold />

            <Text 
                style={{ 
                    color: '#00000077', 
                    textAlign: 'center', 
                    fontSize: 16, 
                    marginTop: 50 
                }}>
                Se conectar usando e-mail e senha
            </Text>

            <TextInput
                style={{ marginTop: 20, marginHorizontal: 20 }}
                label="Email"
                mode="outlined"
                keyboardType='email-address'
                error={false}
                value={email}
                onChangeText={email => setEmail(email)}
            />

            <TextInput
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                label="Password"
                mode="outlined"
                error={false}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <Button
                buttonColor='#5DB075'
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => console.log('Pressed')}>
                Login
            </Button>

            <TouchableRipple
                style={{ padding: 10, marginHorizontal: 80 }}
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text
                    style={{
                        color: '#5DB075',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                    Esqueceu a senha?
                </Text>
            </TouchableRipple>

        </PaperProvider>

    );
};

export default Login;