import { MMKV } from 'react-native-mmkv'
import consumidor from '../../Model/Firestore/consumidor'
const storage = new MMKV({id:"DespensaApp"})






export const setResidenciaStorage = async (data)=>{
    const consumidorLogado = await consumidor.buscarConsumidorLogado();
    const residenciaId = data
    storage.set(`user.${consumidorLogado}`, residenciaId)
}


export const getResidenciaStorage =  async ()=>{
    const consumidorLogado = await consumidor.buscarConsumidorLogado();
    const residenciaId = storage.getString(`user.${consumidorLogado}`)
    return residenciaId;
}


export const removeResidenciaStorage = async ()=>{
    const consumidorLogado =  await consumidor.buscarConsumidorLogado()
    storage.delete(`user.${consumidorLogado}`)
}

