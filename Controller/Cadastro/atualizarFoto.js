import { View, Text } from 'react-native'
import React from 'react'
import updatePhoto from '../../Model/Firebase/updatePhoto'

const atualizarFoto = async (uri) => {
    const result = await updatePhoto(uri);
    return result;
}

export default atualizarFoto