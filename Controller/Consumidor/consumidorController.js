import consumidor from '../../Model/Firestore/consumidor.js';




const getConsumidores = () =>{

    try {
        return consumidor.buscarConsumidores();
    } catch (error) {
        console.error("'-' "+ error);
    }
   
}

const getConsumidor =  (id) =>{
    try {
        
        return consumidor.buscarConsumidor(id)
    }catch(error){
        console.log("'-'"+ error);
    }
}

const getIdConsumidorLogado =() =>{
    try{
        return consumidor.buscarConsumidorLogado();
    }catch(error){
        console.log("'-'"+ error);
    }
}

const getConsumidoresTempoReal = () =>{
    try {
       
        return consumidor.buscarConsumidoresEmTempoReal()
    } catch (error) {
        console.error("'-'"+ error);
    }
}

const postConsumidor =  (consumer) =>{
    try{
        return consumidor.adicionarConsumidor(consumer);
    }
    catch(error){
        console.log("Erro ao criar o usuário" + error);
    }
    
}


const putConsumidor= () =>{
    return null
}


const deleteConsumidor= () =>{
    return null
}

export {
    getConsumidores, 
    getConsumidor,
    getIdConsumidorLogado,
    getConsumidoresTempoReal,
    postConsumidor, 
    putConsumidor, 
    deleteConsumidor
}
