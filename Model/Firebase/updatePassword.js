import auth from '@react-native-firebase/auth';

//Autentica usuario atraves do emailAuthProvider
//Se currentPassword incorreto, retorna mensagem de erro
//Atualiza senha
const updatePassword = async (currentPassword, password) => {

    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);

    return await user.reauthenticateWithCredential(cred)
        .then((userCredential) => {
            userCredential.user.updatePassword(password)           
        })
        .then(() => "Senha atualizada com sucesso!")
        .catch(() => "Senha incorreta!")
}

export default updatePassword