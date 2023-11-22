import produto from '../../Model/Firestore/produto';

import residencia from '../../Model/Firestore/residencia';

const getProdutos = async (callback)=>{
    try{
        const residenciaId = await residencia.buscarIdResidenciaAtual()
        return produto.buscarProdutos(residenciaId, callback);
    }catch(error){
        console.log("ERROR: ", error)
    }
}

const postProdutos = async (produtos) =>{
    try {
        const residenciaId = await residencia.buscarIdResidenciaAtual()
        return produto.adicionarProduto(residenciaId, produtos)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

export{
    getProdutos,
    postProdutos
}