import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: "258123344341-5drvtb9d8anvsnvnmitc9hdjf6ipn50b.apps.googleusercontent.com",
});

const signOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));

    disconectAccount();     
}

//disconecta a conta Google conectada, permitindo escolher outra conta para acessar
disconectAccount = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

export { signOut }