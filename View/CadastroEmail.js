import { useState, useEffect } from 'react';
import { Appbar, Button, Divider, PaperProvider, Text, TextInput, TouchableRipple, HelperText } from 'react-native-paper';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';

const CadastroEmail = () => {
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState(false);
    const [showPass, setShowPass] = useState("eye");

    const [erros, setErros] = useState({numeroIncorreto: false,numeroCorreto: true,tamanho: false, diferentes:false});

    //Funções
    const changeSecureTextEntry = value => {
        setStatus(status === false ? true : false);
        setShowPass(showPass === 'eye' ? 'eye-off' : 'eye');

    };


    const validarSenha = () =>{
        const errosValidos = {};
        if(password.length >= 6) errosValidos.tamanho = false
        else errosValidos.tamanho = true
        if(password !== confirmPassword) errosValidos.diferentes = true
        else errosValidos.diferentes = false

        if(errosValidos.tamanho && errosValidos.diferentes) errosValidos.botao = true
        else errosValidos.botao = false
        setErros(errosValidos);
    }

    
    return(
        <PaperProvider>

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
                    
                    visible={erros.numeroCorreto}
            >Ex.: (12) 91234--5678</HelperText>
            

           
                <TextInput
                    style={{ marginVertical: 0, marginHorizontal: 20 }}
                    label="E-mail"
                    mode="outlined"
                    error={false}
                    value={email}
                    onChangeText={email=> setEmail(email)}
                />
                <HelperText
                        style={{ marginVertical: 0, marginHorizontal: 20 }}
                        type='error' visible = {false}
                >E-mail inválido</HelperText>
            
            <TextInput
                style={{ marginVertical: 0, marginHorizontal: 20 }}
                label="Senha"
                mode="outlined"
                error={erros.tamanho}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={password}
                onChangeText={password => setPassword(password)}
                onBlur={validarSenha}
            />
             <HelperText
                        style={{ marginVertical: 0, marginHorizontal: 20 }}
                        type='error' visible = {erros.tamanho}
                > A senha deve ter no mínimo 6 caracteres.
            </HelperText>

            <TextInput
                style={{ marginVertical: 10, marginHorizontal: 20 }}
                label="Confirmar senha"
                mode="outlined"
                error={erros.diferentes}
                secureTextEntry={status}
                right={<TextInput.Icon icon={showPass} onPress={changeSecureTextEntry} />}
                value={confirmPassword}
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                onBlur={validarSenha}
            />
            <HelperText
                        style={{ marginVertical: 0, marginHorizontal: 20 }}
                        type='error' visible = {erros.diferentes}
                > Senhas não correspondem
            </HelperText>

            <Button
                buttonColor='#5DB075'
                style={{ marginVertical: 20, marginHorizontal: 20 }}
                mode="contained"
                disabled={erros.botao}
                onPress={() => console.log('Pressed')}>
                Cadastrar
            </Button>

           </PaperProvider>
        
    )
}

export default CadastroEmail;