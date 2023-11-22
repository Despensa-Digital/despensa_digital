import { MMKV } from 'react-native-mmkv'
import consumidor from '../../Model/Firestore/consumidor'
const storage = new MMKV({id:"DespensaApp"})


export const setResidenciaAtivaStorage = async ()=>{
    const consumidorLogado =  await consumidor.buscarConsumidorLogado()

    

}


export const setResidenciaStorage = (data)=>{
    const residenciaId = data
    storage.set("minhaResidencia", residenciaId)
   
}


export const getResidenciaStorage = ()=>{
    const residenciaId = storage.getString('minhaResidencia')
    return residenciaId;
}


export const removeResidenciaStorage = ()=>{
    storage.delete('minhaResidencia')
}

