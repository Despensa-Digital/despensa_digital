import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

//Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import da View
import Login from './View/Login';
import Cadastro from './View/Cadastro';
import CadastroEmail from './View/CadastroEmail';
import RecuperarSenha from './View/RecuperarSenha';
import ReenvirEmailRecuperacao from './View/ReenviarEmailRecuperacao';
import AppBarButton from './View/AppBarButton';
import BottomTabs from './View/HomeTabs/BottomTabs';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Stack = createNativeStackNavigator();
export default function App() {

    //Firebase
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const theme = {
        ...DefaultTheme,
        colors: {
        card: "#fff",
        text: '#000',
          secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
        },
      };

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);

        if (initializing) setInitializing(false);
    }


    


    useEffect(() => {
        // const subscriber = auth().onUserChanged(onAuthStateChanged);
        console.log('Estou no useEffect');
        if (user != null) {
            if (user.emailVerified) {
                console.log('email verificado: ' + user.emailVerified);
                setIsEmailVerified(true);
                console.log("Usuario retornado", user)
                //Adicionar a verificação de adição do Consumidor
               // console.log("User", user)
              
            } else {
                console.log('email verificado: ' + user.emailVerified);                        
            }

        } else {
            setIsEmailVerified(false);
        }
        setInitializing(false)
        setIsEmailVerified(true)
        // return subscriber; // unsubscribe on unmount
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
                                {(props) => <Login {...props} user={user}/>}
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