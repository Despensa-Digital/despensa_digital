import 
    residencia
 from '../../Model/Firestore/residencia';

const getResidencias = ()=>{
    try{
        return residencia.buscarResidencias();
    }catch(error){
        console.log("ERRROR: ", error)
    }
}

const getResidencia = (residenciaId, callback)=>{
    try{
        return residencia.buscarResidencia(residenciaId, callback);
    }catch(error){
        console.log("ERROR: ", error);
    }
}

const getResidenciaAtual =(callback)=>{
    try{
        return residencia.buscarResidenciaAtual(callback);
    }catch(error){
        console.log("ERROR: ", error);
    }
}

const postResidencia = (nome) =>{
    try{
        return residencia.adicionarResidencia(nome);
    }catch(error){
        console.log("Erro ao criar uma Residencia: " + error);
    }
}


const deleteResidencia = (residenciaId) =>{
    try{
        return residencia.removerResidencia(residenciaId);
    }catch(error){
        console.log("Erro ao criar uma Residencia: " + error);
    }
}


const updateNomeResidencia = (residenciaId, nomeResidencia) =>{
    try{
        return residencia.atualizarNomeResidencia(residenciaId, nomeResidencia)
    }catch(error){
        console.log("Erro ao criar uma Residencia: " + error);
    }
}

const updateNomeMembro = (residenciaId, membro) =>{
    try{
        return residencia.atualizarMembro(residenciaId, membro)
    }catch(error){
        console.log("Erro ao criar uma Residencia: " + error);
    }
}

const deleteMembro = (residenciaId, membro)=>{
    try{
        return residencia.removerMembro(residenciaId, membro)
    }catch(error){
        console.log("Erro ao criar uma Residencia: " + error);
    }
}

export {
    getResidencias,
    getResidencia,
    getResidenciaAtual,
    postResidencia,
    deleteResidencia,
    updateNomeResidencia,
    updateNomeMembro,
    deleteMembro
}