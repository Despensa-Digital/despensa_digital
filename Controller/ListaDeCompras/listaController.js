import lista from "../../Model/Firestore/lista";

import { getResidenciaStorage } from "../Despensa/storage";



const getListaDeCompras = async ()=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.buscarListaDeCompras(residenciaId)
    } catch (error) {
        console.log("ERROR:", error)
    }
}


const postListaDeCompras = async (nomeLista)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.adicionarListaDeCompras(residenciaId, nomeLista)
    } catch (error) {
        console.log("ERROR:", error)
    }
}

const deleteListaDeCompras = async (listaId) =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.excluirListaDeCompras(residenciaId, listaId)
    } catch (error) {
        console.log("ERROR:", error)
    }
}

//ITENS DA LISTA
const getListaDeComprasComItens = async (listaId)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.buscarListaDeComprasComItens(residenciaId, listaId)
    } catch (error) {
        console.log("ERROR:", error)
    }
}


const postItensNaListaDeCompras = async (listaId, novoItemLista)=>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.adicionarItensNaListaDeCompras(residenciaId, listaId, novoItemLista)
    } catch (error) {
        console.log("ERROR:", error)
    }
}


const putQuantidade = async (listaId, itemQuantidade) =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.atualizarQuantidade(residenciaId, listaId, itemQuantidade)
    } catch (error) {
        console.log("ERROR:", error)
    }
}


const deleteItem = async (listaId, itemRemovido) =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.removerItem(residenciaId, listaId, itemRemovido)
    } catch (error) {
        console.log("ERROR:", error)
    }
}

const deleteTodosOsItens = async (listaId) =>{
    try {
        const residenciaId = await getResidenciaStorage()
        return lista.removerTodosOsItens(residenciaId, listaId)
    } catch (error) {
        console.log("ERROR:", error)
    }
}
export{
    getListaDeCompras,
    postListaDeCompras,
    deleteListaDeCompras,
    getListaDeComprasComItens,
    postItensNaListaDeCompras,
    putQuantidade,
    deleteTodosOsItens,
    deleteItem
}