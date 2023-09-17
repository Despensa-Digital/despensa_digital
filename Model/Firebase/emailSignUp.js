import auth from '@react-native-firebase/auth';

const emailSignUp = (name, email, password) => {
    auth()
        // .createUserWithEmailAndPassword
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.updateProfile({
                displayName: name
            })
            userCredential.user.sendEmailVerification();
            console.log('Usuário criado: ' + userCredential.user);
        })
        .then(() => {
            console.log('User account created & signed in!');          
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            if (error.code === 'auth/weak-password') {
                console.log('Password is invalid! Password should be at least 6 characters');
            }

            console.error(error);
        });
}

export { emailSignUp }