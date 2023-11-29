import { View, Text } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const updatePhoto = async (uri) => {
    const filename = auth().currentUser.uid;

    const task = storage()
        .ref(filename)
        .putFile(uri);

    try {
        await task;
    } catch (e) {
        console.error(e);
    }

    const url = await storage().ref(filename).getDownloadURL();

    await auth().currentUser.updateProfile({ photoURL: url })
    
    return url;


}


export default updatePhoto