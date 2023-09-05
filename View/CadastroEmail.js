import { useState, useEffect } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple, HelperText } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';

const CadastroEmail = () => {
    const [celular, setCelular] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState(false);
    const [showPass, setShowPass] = useState("eye");
    const changeSecureTextEntry = value => {
        setStatus(status === false ? true : false);
        setShowPass(showPass === 'eye' ? 'eye-off' : 'eye');

    };
    const hasErrors = () => {
        return !text.includes('@');
      };
      
    return(
        <PaperProvider>
            <Appbar.Header style={{ marginTop: 20 }}>
            <TouchableRipple
                    style={{ position: 'absolute', left: 20, top: 20, color: 'rgba(0,0,0,0.2)' }}
                    onPress={() => console.log('Pressionei o cadastras')}
                    rippleColor="rgba(0, 0, 0, .32)">
                    <Text style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.2)', fontSize: 16 }}>X</Text>
                </TouchableRipple>
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

            <TextInput
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                label="Nome"
                mode="outlined"
                error={false}
                value={nome}
                onChangeText={nome => setNome(nome)}
            />

            <TextInput
                style={{ marginVertical: 0, marginHorizontal: 20 }}
                label="Celular"
                mode="outlined"
                error={false}
                value={celular}
                onChangeText={celular => setCelular(celular)}
            />
            <HelperText
                    style={{ marginVertical: 0, marginHorizontal: 20 }}
            >Ex.: (12) 91234--5678</HelperText>
            
            <TextInput
                style={{ marginVertical: 0, marginHorizontal: 20 }}
                label="E-mail"
                mode="outlined"
                error={false}
                value={email}
                onChangeText={nome => setEmail(email)}
            />

            <HelperText
                    style={{ marginVertical: 0, marginHorizontal: 20 }}
                    type='error' visible = {hasErrors()}
            >E-mail inválido</HelperText>

            <TextInput
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                label="Senha"
                mode="outlined"
                error={false}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={password}
                onChangeText={password => setPassword(password)}
            />

            <TextInput
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                label="Confirmar senha"
                mode="outlined"
                error={false}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={confirmPassword}
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            />

            <Button
                buttonColor='#5DB075'
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => console.log('Pressed')}>
                Cadastrar
            </Button>

           </PaperProvider>
        
    )
}

export default CadastroEmail;