import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: "258123344341-5drvtb9d8anvsnvnmitc9hdjf6ipn50b.apps.googleusercontent.com",
});

//login pelo Google
const googleSignIn = async () => {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn()
        
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        //return error
    }

}

export { googleSignIn }