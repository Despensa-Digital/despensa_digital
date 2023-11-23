import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { DefaultTheme } from 'react-native-paper';

//Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import da Model
import { LoginListener } from './Model/Firebase/loginListener';
import { emailSignUp } from './Model/Firebase/emailSignUp';
import { emailSignIn } from './Model/Firebase/emailSignIn';
import { signOut } from './Model/Firebase/signOut';
import { googleSignIn } from './Model/Firebase/googleSignIn';
import { forgotPassword } from './Model/Firebase/forgotPassword';

//import da View
import Login from './View/Login';
import Cadastro from './View/Cadastro';
import CadastroEmail from './View/CadastroEmail';
import RecuperarSenha from './View/RecuperarSenha';
import ReenvirEmailRecuperacao from './View/ReenviarEmailRecuperacao';
import AppBarButton from './View/AppBarButton';
import BottomTabs from './View/HomeTabs/BottomTabs';
import { setResidenciaAtivaStorage } from './Controller/Despensa/storage';

import notifee, { EventType } from '@notifee/react-native';


const Stack = createNativeStackNavigator();

export default function App() {

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail.notification);
                    break;
            }
        });
    }, []);


    //Firebase
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
        },
    };

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);

        if (initializing) setInitializing(false);
    }


    


    useEffect(() => {
        const subscriber = auth().onUserChanged(onAuthStateChanged);
        console.log('Estou no useEffect');
        if (user != null) {
            if (user.emailVerified) {
                console.log('email verificado: ' + user.emailVerified);
                setIsEmailVerified(true);
                //Adicionar a verificação de adição do Consumidor
            } else {
                console.log('email verificado: ' + user.emailVerified);
            }

        } else {
            setIsEmailVerified(false);
        }

        return subscriber; // unsubscribe on unmount
    }, [user]);


    if (initializing) return null;


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
            <Button title="Log Off" onPress={signOut} />
            <Button title='Forgot Password' onPress={forgotPassword} /> */}
            {/* <ReenvirEmailRecuperacao /> */}


            {/*  */}
            <NavigationContainer
                theme={theme}
            >
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: 'rgba(0,0,0, 0.5)',
                            fontFamily: 'Roboto'
                        },
                    }}>
                    {isEmailVerified ? (
                        <>
                            <Stack.Screen
                                name="BottomTabs"
                                component={BottomTabs}
                                options={{
                                    headerShown: false
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                options={{
                                    title: 'Login',
                                    headerRight: () => <AppBarButton />
                                }}>
                                {(props) => <Login {...props} user={user} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="RecuperarSenha"
                                component={RecuperarSenha}
                                options={{
                                    title: 'Recuperar Senha'
                                }}
                            />
                            <Stack.Screen
                                name="ReenviarEmailRecuperacao"
                                component={ReenvirEmailRecuperacao}
                                options={{
                                    title: 'Reenviar E-mail'
                                }}
                            />

                            {/* <Stack.Screen
                                name="Cadastro"
                                component={Cadastro}
                                options={{
                                    title: 'Cadastrar'
                                }}/> */}

                            <Stack.Screen
                                name="CadastroEmail"
                                component={CadastroEmail}
                                options={{
                                    title: 'Cadastrar E-mail'
                                }}
                            />
                        </>
                    )}

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}