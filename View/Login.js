import { useState, useEffect } from 'react';
import { Appbar, Button, Dialog, Divider, PaperProvider, Portal, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';
import { signOut } from '../Model/Firebase/signOut';

//import do Controller
import { EmailLogin } from '../Controller/Login/emailLogin';

//import da Model
//Alterar futuramente
import { googleSignIn } from '../Model/Firebase/googleSignIn';

import { postConsumidor } from '../Controller/Consumidor/consumidorController';



const Login = ({ navigation, user }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState(true);
    const [showPass, setShowPass] = useState("eye");



    const [visible, setVisible] = useState(false);
    const hideDialog = () => {
        setVisible(false);

        signOut();
    }

    useEffect(() => {
        if (user != null) {
            if (!user.emailVerified) {
                setVisible(true);           
            }else{
                // console.log('Usuario verificado, botão de login precionado');
                // logar()
            }
        }
    }, [user]);

    const logar = ()=>{
        googleSignIn().then((response)=>{
            const data = response.user
            postConsumidor(data)
            }
        )
    }

    const changeSecureTextEntry = value => {
        setStatus(status === false ? true : false);
        setShowPass(showPass === 'eye' ? 'eye-off' : 'eye');
    };


    // const logar = async ()=>{
        
    // }

  
    
    return (
        <PaperProvider >
            <Text
                style={{
                    color: '#00000077',
                    textAlign: 'center',
                    fontSize: 16,
                    marginTop: 20,
                    marginHorizontal: 40
                }}>
                Se conectar usando uma conta Google (cadastro automático)
            </Text>

            <View style={{ marginVertical: 30, alignSelf: 'center' }}>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    // onPress={() => googleSignIn()}
                    onPress={() => logar()}
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
                onPress={() => EmailLogin(email, password)}>
                Login
            </Button>

            <TouchableRipple
                style={{ padding: 10, marginHorizontal: 80 }}
                onPress={() => navigation.navigate('RecuperarSenha')}
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

            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Confirmação de E-mail</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Verifique seu e-mail para poder prosseguir.</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>

        </PaperProvider>

    );
};

export default Login;