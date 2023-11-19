import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginListener = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);   
    }

    useEffect(() => {
        const subscriber = auth().onUserChanged(onAuthStateChanged);
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

    if (user.emailVerified) {
        return (
            <View>
                <Text>Welcome {user.email}</Text>
                <Text>Welcome {user.displayName}</Text>
                <Text>Welcome {(user.emailVerified).toString()}</Text>
            </View>
        );
    } 

    if (!user.emailVerified) {
        return(
          <View>
            <Text>Check your e-mail and log in</Text>
        </View>  
        );
    }
}

export { LoginListener }