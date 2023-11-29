import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, HelperText, PaperProvider, Snackbar, Text, TextInput } from 'react-native-paper';

import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

import atualizarFoto from '../../../Controller/Cadastro/atualizarFoto';
import atualizarSenha from '../../../Controller/Cadastro/atualizarSenha';

import { updateConsumidor } from '../../../Controller/Consumidor/consumidorController';

const EditarPerfil = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [statusCurrentPass, setStatusCurrentPass] = useState(true);
    const [showCurrentPass, setShowCurrentPass] = useState("eye");
    const [statusPass, setStatusPass] = useState(true);
    const [showPass, setShowPass] = useState("eye");
    const [statusConfirmPass, setStatusConfirmPass] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState("eye");

    const defaultImage = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
    const { photoURL, displayName } = auth().currentUser;
    const [photo, setPhoto] = useState(photoURL || defaultImage);
    const [updatingPhoto, setUpdtatingPhoto] = useState(false);
    const [photoSnackbar, setPhotoSnackbar] = useState(false);

    const [passwordDiff, setPasswordDiff] = useState();
    const [passwordHasMinChar, setPasswordHasMinChar] = useState();
    const [passwordHasUpperCase, setPasswordHasUpperCase] = useState();
    const [passwordHasLowerCase, setPasswordHasLoweCase] = useState();
    const [passwordHasNumber, setPasswordHasNumber] = useState();
    const [disabledUpdateButton, setDisabledUpdateButton] = useState(true);
    const [passwordSnackbar, setPasswordSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');

    const providerId = auth().currentUser.providerData[0].providerId;
    const viewChangePassword = providerId == 'password' ? true : false;

    //Visibilidade de Senha
    const changeCurrentPassSecureTextEntry = () => {
        setStatusCurrentPass(!statusCurrentPass);
        setShowCurrentPass(showCurrentPass === 'eye' ? 'eye-off' : 'eye');
    };

    //Visibilidade de Senha
    const changePassSecureTextEntry = () => {
        setStatusPass(!statusPass);
        setShowPass(showPass === 'eye' ? 'eye-off' : 'eye');
    };

    //visibilidade de ConfirmarSenha
    const changeConfirmPassSecureTextEntry = () => {
        setStatusConfirmPass(!statusConfirmPass);
        setShowConfirmPass(showConfirmPass === 'eye' ? 'eye-off' : 'eye');
    };

    //validação de campos de senha
    useEffect(() => {
        setPasswordDiff((password == confirmPassword))
        setPasswordHasMinChar((password.length >= 8))
        setPasswordHasUpperCase((/[A-Z]/.test(password)))
        setPasswordHasLoweCase((/[a-z]/.test(password)))
        setPasswordHasNumber((/[0-9]/.test(password)))
    }, [password, confirmPassword])

    //habilita botao para atualizar senha se todos os criterios forem cumpridos
    useEffect(() => {
        if ((currentPassword !== '') && passwordDiff && passwordHasMinChar && passwordHasUpperCase && passwordHasLowerCase && passwordHasNumber) {
            setDisabledUpdateButton(false)
        } else {
            setDisabledUpdateButton(true)
        }
    }, [passwordDiff, currentPassword])

    //Abre album de fotos. Caso usuario selecione uma foto, renderiza foto
    const changePhoto = () => {
        const options = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                setUpdtatingPhoto(true)
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setPhoto(imageUri)
            }
        })
    };

    //Envia foto para firebase storage
    //Substitui foto do usuario em firebase auth
    //Envia foto para firebase cloud storage
    //Exibe snackbar de sucesso
    const uploadPhoto = async () => {
        await atualizarFoto(photo)
        setUpdtatingPhoto(false);
        setPhotoSnackbar(true);
        await updateConsumidor(auth().currentUser)
    }

    //ativado caso foto seja trocada
    useEffect(() => {
        if (updatingPhoto) {
            uploadPhoto()
        }
    }, [photo])

    //Atualiza senha e exibe snackbar em caso de sucesso/erro
    const mudarSenha = async () => {
        const result = await atualizarSenha(currentPassword, password);
        setMessageSnackbar(result)
        setPasswordSnackbar(true);
        if(result == 'Senha atualizada com sucesso!'){
            setPassword('')
            setConfirmPassword('')
            setCurrentPassword('')
        }
    }

    return (
        <PaperProvider>
            <ScrollView>
                <View style={{ display: 'flex', marginTop: 40, marginHorizontal: 20 }}>
                    <View style={{ display: 'flex', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image source={{ uri: photo }} size={70} />
                        <Text variant="titleSmall" style={{ textAlign: 'center' }}>{displayName}</Text>
                        <Button icon="camera" mode="outlined" loading={updatingPhoto} disabled={updatingPhoto} style={{ marginTop: 10 }} onPress={() => changePhoto()}>
                            Alterar foto de perfil
                        </Button>
                    </View>
                    <View style={{display: viewChangePassword ? 'flex' : 'none'}}>
                        <Text variant="titleMedium" style={{ marginTop: 10, marginLeft: 10 }}>Alterar senha</Text>
                        <TextInput
                            style={{ marginTop: 10 }}
                            label="Senha atual"
                            mode="outlined"
                            error={false}
                            secureTextEntry={statusCurrentPass}
                            right={<TextInput.Icon icon={showCurrentPass} onPress={changeCurrentPassSecureTextEntry} />}
                            value={currentPassword}
                            onChangeText={currentPassword => setCurrentPassword(currentPassword)}
                        />
                        <TextInput
                            style={{ marginTop: 30 }}
                            label="Nova senha"
                            mode="outlined"
                            error={false}
                            secureTextEntry={statusPass}
                            right={<TextInput.Icon icon={showPass} onPress={changePassSecureTextEntry} />}
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                        <TextInput
                            style={{ marginTop: 10 }}
                            label="Confirmar nova senha"
                            mode="outlined"
                            error={false}
                            secureTextEntry={statusConfirmPass}
                            right={<TextInput.Icon icon={showConfirmPass} onPress={changeConfirmPassSecureTextEntry} />}
                            value={confirmPassword}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                        />
                        <HelperText
                            style={{ marginVertical: 0, display: passwordDiff ? 'none' : 'flex' }}
                            type='info'
                        >* Senha e Confirmar senha precisam coincidir</HelperText>

                        <HelperText
                            style={{ marginVertical: 0, display: passwordHasMinChar ? 'none' : 'flex' }}
                            type='info'
                        >* Senha deve possuir pelo menos 8 caracteres.</HelperText>

                        <HelperText
                            style={{ marginVertical: 0, display: passwordHasUpperCase ? 'none' : 'flex' }}
                            type='info'
                        >* Senha deve possuir pelo menos 1 caracter maiúsculo.</HelperText>

                        <HelperText
                            style={{ marginVertical: 0, display: passwordHasLowerCase ? 'none' : 'flex' }}
                            type='info'
                        >* Senha deve possuir pelo menos 1 caracter minúsculo.</HelperText>

                        <HelperText
                            style={{ marginVertical: 0, display: passwordHasNumber ? 'none' : 'flex' }}
                            type='info'
                        >* Senha deve possuir pelo menos 1 caracter numérico.</HelperText>

                        <Button
                            buttonColor='#5DB075'
                            style={{ marginTop: 30 }}
                            mode="contained"
                            disabled={disabledUpdateButton}
                            onPress={() => mudarSenha()}>
                            Atualizar Senha
                        </Button>
                    </View>

                    <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginVertical: 20, borderColor: '#5DB075' }}
                        mode="outlined"
                        onPress={() => navigation.goBack()}>
                        Cancelar
                    </Button>
                </View>

            </ScrollView>
            <View>
                <Snackbar
                    visible={photoSnackbar}
                    onDismiss={() => { setPhotoSnackbar(false) }}
                    duration={3000}>
                    Foto alterada com sucesso!
                </Snackbar>
            </View>

            <View>
                <Snackbar
                    visible={passwordSnackbar}
                    onDismiss={() => { setPasswordSnackbar(false) }}
                    duration={3000}>
                    {messageSnackbar}
                </Snackbar>
            </View>

        </PaperProvider>

    )
};

export default EditarPerfil;