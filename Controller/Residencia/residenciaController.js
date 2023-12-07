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

const getIdResidencia =(callback)=>{
    try{
        return residencia.buscarIdResidencia(callback);
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

const getQuadroDeAvisos = () =>{
    try {
        return residencia.buscarQuadroDeAvisos()
    } catch (error) {
        console.log("Erro ao buscar as informações do Quadro de avisos", error);
    }
}
const postQuadroDeAvisos = (informacoesDoQuadro) =>{
    try {
        return residencia.salvarQuadroDeAvisos(informacoesDoQuadro)
    } catch (error) {
        console.log("Erro ao atualizar o quadro de avisos: " + error);
    }
}

const postNovoMembro = async (novoMembro) =>{
    try {
        return residencia.adicionarNovoMembro(novoMembro)
    } catch (error) {
        console.log("Erro ao criar um membro: " + error);
    }
}

const updateNomeMembro = (residenciaId, membro) =>{
    try{
        return residencia.atualizarMembro(residenciaId, membro)
    }catch(error){
        console.log("Erro ao atualizar um membro: " + error);
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
    getIdResidencia,
    postResidencia,
    deleteResidencia,
    getQuadroDeAvisos,
    postNovoMembro,
    postQuadroDeAvisos,
    updateNomeResidencia,
    updateNomeMembro,
    deleteMembro
}