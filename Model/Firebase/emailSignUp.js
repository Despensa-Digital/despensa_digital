import auth from '@react-native-firebase/auth';

const emailSignUp = () => {
    auth()
        // .createUserWithEmailAndPassword
        .createUserWithEmailAndPassword('ricardo.ryt@gmail.com', 'SuperSecretPassword!')
        .then((userCredential) => {
            // userCredential.user.updateProfile({
            //     displayName: "Paulo da Silva"
            // })
            userCredential.user.sendEmailVerification()
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