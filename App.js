import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

//import da Model
import { LoginListener } from './Model/Firebase/loginListener';
import { emailSignUp } from './Model/Firebase/emailSignUp';
import { emailSignIn } from './Model/Firebase/emailSignIn';
import { signOut } from './Model/Firebase/signOut';
import { googleSignIn } from './Model/Firebase/googleSignIn';
import { forgotPassword } from './Model/Firebase/forgotPassword';

//import da View
import Login from './View/Login';



export default function App() {

    return (

        < >
            {/* Botão importado da biblioteca GoogleSignIn
            <GoogleSigninButton               
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => googleSignIn().then(() => console.log('Signed in with Google!'))}               
            />
            <LoginListener />
            <Button title="Create User" onPress={emailSignUp} />
            <Button title="Login User" onPress={emailSignIn} />
            <Button title="Log Off" onPress={signOut} />
            <Button title='Forgot Password' onPress={forgotPassword} /> */}
            <Login/>
           
        </>
    )
}