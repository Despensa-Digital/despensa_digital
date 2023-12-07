import { View, Text } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const updatePhotoStorage = async (uri) => {
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

const updatePhotoResidencia = async (residencia, residenciaId) => {
        const userId =   auth().currentUser.uid;
        const photoUrl = auth().currentUser.photoURL;

        const membroAtualizado = residencia?.membros?.map((membro) => {
            if (membro.id === userId) {
                return ({ ...membro, foto: photoUrl })
            } else return membro
        })

        const residenciaRef = firestore().collection("Residencia").doc(residenciaId);

        try{
            await residenciaRef.update({membros: membroAtualizado})
                .then(() => console.log("Foto do membro da residencia atualizada com sucesso!"))
        }catch(erro){
            console.log("Erro ao atualizar foto: ", erro);
        }
}


export default {
    updatePhotoStorage,
    updatePhotoResidencia
}