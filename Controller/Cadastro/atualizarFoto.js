import { View, Text } from 'react-native'
import React from 'react'
import updatePhoto from '../../Model/Firebase/updatePhoto'

const atualizarFoto = async (uri) => {
    const result = await updatePhoto.updatePhotoStorage(uri);
    return result;
}

const atualizarFotoResidencia = async (residencia, residenciaId) => {
    await updatePhoto.updatePhotoResidencia(residencia, residenciaId);   
}

export {
    atualizarFoto,
    atualizarFotoResidencia
}