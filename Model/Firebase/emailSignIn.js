import auth from '@react-native-firebase/auth';

const emailSignIn = () => {
    auth()
        // .createUserWithEmailAndPassword
        .signInWithEmailAndPassword('ricardo.ryt@gmail.com', 'Segredo1234')
        .then(() => {
            console.log('User account signed in!');
        })
        .catch(error => {              
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            if (error.code === 'auth/wrong-password') {
                console.log('That password is invalid!');
            }

            if (error.code === 'auth/user-not-found') {
                console.log('User not found');
            }      

            console.error(error);
        });
}

export {emailSignIn}