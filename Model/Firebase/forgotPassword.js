import auth from '@react-native-firebase/auth';

const email = "ricardo.ryt@gmail.com"

const forgotPassword = (email) => {
    auth().sendPasswordResetEmail(email)
    .then(() => {
        alert('Reset e-mail enviado para: ' + email)
    })
    .catch( error => {
        if (error.code === 'auth/invalid-email') {
            alert('Invalid email');
        }

        console.error(error)
    })
}

export { forgotPassword }