import categoria from '../../Model/Firestore/categoria'

import { getResidenciaStorage } from '../Despensa/storage';


const getCategorias = async () =>{
    try{
        const residenciaId = await getResidenciaStorage()
        return categoria.buscarCategorias(residenciaId)
    }catch(error){
        console.log("ERROR: ", error)
    }
}

const postCategoria = async (novaCategoria) =>{
    try{
        const residenciaId = await getResidenciaStorage()
        return categoria.adicionarCategoria(residenciaId, novaCategoria)
    }catch(error){
        console.log("ERROR: ", error)
    }
}

const updateCategoria = async (categoriaId, categoriaEditada)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return categoria.atualizarCategoria(residenciaId,categoriaId, categoriaEditada)
    } catch (error) {
        console.log("ERROR:", error)
    }
}


const deleteCategoria = async (categoriaId) =>{
    try{
        const residenciaId = await getResidenciaStorage()
        return categoria.excluirCategoria(residenciaId, categoriaId)
    }catch(error){
        console.log("ERROR: ", error)
    }
}

export{
    getCategorias,
    postCategoria,
    updateCategoria,
    deleteCategoria
}