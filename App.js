import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: "258123344341-5drvtb9d8anvsnvnmitc9hdjf6ipn50b.apps.googleusercontent.com",
});


function LoginApp() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View>
                <Text>Login</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Welcome {user.displayName}</Text>
        </View>
    );
}

export default function App() {
    const [texto, setTexto] = useState(0)

    createUser = () => {
        auth()
            // .createUserWithEmailAndPassword
            .createUserWithEmailAndPassword('john.doe@example.com', 'SuperSecretPassword!')
            .then((res) => {        res.user.updateProfile({          displayName: "John Doe"
        })})
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

    loginUser = () => {
        auth()
            // .createUserWithEmailAndPassword
            .signInWithEmailAndPassword('john.doe@example.com', 'SuperSecretPassword!')
            .then(() => {
                console.log('User account created & signed in!');
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

    logoff = () => {
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

    //login pelo Google
    onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    return (

        <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
            {/* Botão importado da biblioteca GoogleSignIn */}
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}               
            />
            <LoginApp />
            <Button title="Create User" onPress={this.createUser} />
            <Button title="Login User" onPress={this.loginUser} />
            <Button title="Log Off" onPress={this.logoff} />
        </View>
    )
}