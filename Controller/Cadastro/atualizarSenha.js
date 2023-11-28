import { View, Text } from 'react-native'
import React from 'react'
import updatePassword from '../../Model/Firebase/updatePassword'

//Chama metodo para atualizar senha no firebase authentication
const atualizarSenha = async (currentPassword, password) => {
    const result = await updatePassword(currentPassword, password);
    return result;
}

export default atualizarSenha