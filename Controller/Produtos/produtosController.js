import produto from '../../Model/Firestore/produto';

import { getResidenciaStorage } from '../Despensa/storage';

const getProdutos = async (callback)=>{
    try{
        const residenciaId = await getResidenciaStorage()
        return produto.buscarProdutosItensValidades(residenciaId, callback);
    }catch(error){
        console.log("ERROR: ", error)
    }
}

const getProdutosProximosDaValidade = async () =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.buscarProdutosProximosDaValidade(residenciaId);
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

const getProduto = async (idProduto, callback)=>{
    try{
        console.log("ID produto", idProduto);
        const residenciaId = await getResidenciaStorage()
        return produto.buscarProdutoItensProdutos(residenciaId, idProduto, callback)
    }catch(error){
        console.log("ERROR: ", error)
    }
}

const getProdutosFiltrados = async (searchCategoria,callback) =>{
    try{
        const residenciaId = await getResidenciaStorage()
        return produto.buscarProdutosFiltrados(residenciaId, searchCategoria,callback);
    }catch(error){
        console.log("ERROR: ", error)
    }
}

const postProdutos = async (produtos) =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.adicionarProduto(residenciaId, produtos)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}


const putProduto = async (produtoAtualizado)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.atualizarProduto(residenciaId, produtoAtualizado)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}



const postItemProduto = async (itemProduto) =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.adicionarItemProduto(residenciaId, itemProduto)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}


const putItemProduto = async (produtoId, itemAtualizado)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.atualizarItemProduto(residenciaId, produtoId, itemAtualizado)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

const deleteItemProduto = async (produtoId, itemId)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.excluirItemProduto(residenciaId, produtoId, itemId)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

const deleteProduto = async (produtoId)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return produto.excluirProduto(residenciaId, produtoId)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

export{
    getProdutos,
    getProdutosProximosDaValidade,
    getProdutosFiltrados,
    getProduto,
    postProdutos,
    putProduto,
    postItemProduto,
    putItemProduto,
    deleteItemProduto,
    deleteProduto
}