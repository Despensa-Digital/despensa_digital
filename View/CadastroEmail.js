import { useState, useEffect } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple, HelperText } from 'react-native-paper';
import { View } from 'react-native';

//import do Controller
import { cadastrarEmail } from '../Controller/Cadastro/cadastrarEmail';

const CadastroEmail = ({navigation}) => {
    //const [celular, setCelular] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState(true);
    const [showPass, setShowPass] = useState("eye");
    const changeSecureTextEntry = value => {
        setStatus(status === false ? true : false);
        setShowPass(showPass === 'eye' ? 'eye-off' : 'eye');

    };
    const hasErrors = () => {
        if(email.length > 0){
            return !email.includes('@');
        } else {
            return false;
        }
      };

    const passwordDiff = () => {
       return (password !== confirmPassword)
    }

    const enviarCadastro = () => {
        cadastrarEmail(nome, email, password);
        navigation.popToTop();
    }
      
    return(
        <PaperProvider>
            

            <TextInput
                style={{ marginTop: 20, marginHorizontal: 20 }}
                label="Nome"
                mode="outlined"
                error={false}
                value={nome}
                onChangeText={nome => setNome(nome)}
            />
            
            {/* <TextInput
                style={{ marginTop: 20, marginHorizontal: 20 }}
                label="Celular"
                mode="outlined"
                error={false}
                value={celular}
                onChangeText={celular => setCelular(celular)}
            />
            <HelperText
                    style={{ marginVertical: 0, marginHorizontal: 20 }}
            >Ex.: (12) 91234-5678</HelperText> */}
            
            <TextInput
                style={{ marginTop: 20, marginHorizontal: 20 }}
                label="E-mail"
                mode="outlined"
                error={false}
                value={email}              
                onChangeText={email => setEmail(email)}
            />

            <HelperText
                    style={{ marginVertical: 0, marginHorizontal: 20}}
                    type='error' visible = {hasErrors()}
            >E-mail inválido</HelperText>

            <TextInput
                style={{ marginTop: 0, marginHorizontal: 20 }}
                label="Senha"
                mode="outlined"
                error={false}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={password}
                onChangeText={password => setPassword(password)}
            />

            <TextInput
                style={{ marginTop: 20, marginHorizontal: 20 }}
                label="Confirmar senha"
                mode="outlined"
                error={false}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={confirmPassword}
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            />
            <HelperText
                    style={{ marginVertical: 0, marginHorizontal: 20}}
                    type='error' visible = {passwordDiff()}
            >* Senha e Confirmar senha precisam coincidir</HelperText>

            <Button
                buttonColor='#5DB075'
                style={{ marginTop: 30, marginHorizontal: 20 }}
                mode="contained"
                onPress={() => enviarCadastro()}>
                Cadastrar
            </Button>

           </PaperProvider>
        
    )
}

export default CadastroEmail;