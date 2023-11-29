import firestore from '@react-native-firebase/firestore';


const DB_DESPENSA = firestore().collection("Residencia");


const buscarListaDeCompras = async (residenciaId) =>{
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Listas');
    try{
        const querySnapshot = await despensaRef.get()

        if(!querySnapshot.empty){
            const listas = querySnapshot.docs.map(documentSnapshot => {
                return {
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                };
            });

            console.log("Model", listas);
            return listas;
        }else{  
            return null;
        }


    }catch (error) {
        console.error("Erro ao buscar listas de compras:", error);
        return null;
    }

}


const adicionarListaDeCompras = async (residenciaId, nomeLista) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Listas');

    try {
        // Adicionar uma nova lista de compras
        const novaListaRef = await despensaRef.add({
            nome: nomeLista,
            // Outras propriedades, se necessário
        });

        const novaLista = {
            key: novaListaRef.id,
            nome: nomeLista,
            // Outras propriedades, se necessário
        };

        console.log("Lista de compras adicionada:", novaLista);
        return novaLista;
    } catch (error) {
        console.error("Erro ao adicionar lista de compras:", error);
        return null;
    }
};



const excluirListaDeCompras = async (residenciaId, listaId) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Listas');

    try {
        // Verificar se a lista existe antes de tentar excluí-la
        const listaExistente = await despensaRef.doc(listaId).get();

        if (listaExistente.exists) {
            // Excluir a lista de compras
            await despensaRef.doc(listaId).delete();
            
            console.log("Lista de compras excluída com sucesso:", listaId);
            return true; // Indica que a exclusão foi bem-sucedida
        } else {
            console.error("Lista de compras não encontrada:", listaId);
            return false; // Indica que a lista não foi encontrada
        }
    } catch (error) {
        console.error("Erro ao excluir lista de compras:", error);
        return false; // Indica que houve um erro na exclusão
    }
};


//ITENS DA LISTA
const buscarListaDeComprasComItens = async (residenciaId, listaId) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Listas').doc(listaId);
    const itensListaRef = despensaRef.collection('ItemLista');

    try {
        // Buscar dados da lista de compras
        const listaSnapshot = await despensaRef.get();

        if (listaSnapshot.exists) {
            const listaDeCompras = {
                key: listaSnapshot.id,
                ...listaSnapshot.data()
            };

            // Buscar itens da subcoleção
            const itensSnapshot = await itensListaRef.get();

            if (!itensSnapshot.empty) {
                const itensLista = itensSnapshot.docs.map(itemDoc => {
                    return {
                        itemId: itemDoc.id,
                        ...itemDoc.data()
                    };
                });

                // Adicionar os itens à lista de compras
                listaDeCompras.itens = itensLista;
            }else{
                listaDeCompras.itens = null
            }

            console.log("Lista de compras com itens:", listaDeCompras);
            return listaDeCompras;
        } else {
            console.error("Lista de compras não encontrada:", listaId);
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar lista de compras com itens:", error);
        return null;
    }
};

const adicionarItensNaListaDeCompras = async (residenciaId, listaId, novoItemLista) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Listas').doc(listaId);
    const itensListaRef = despensaRef.collection('ItemLista');

    try {

        // Adicionar itens à subcoleção ItensLista
        const novoItemRef = await itensListaRef.add({ 
            nome: novoItemLista.nome,
            preco: novoItemLista.preco,
            quantidade: novoItemLista.quantidade
         });

        console.log("Lista de compras com itens adicionada:", novoItemRef.id);
    } catch (error) {
        console.error("Erro ao adicionar lista de compras com itens:", error);
        return null;
    }
};


const atualizarQuantidade = async (residenciaId, listaId, itemQuantidade)=>{
    const despensaRef = DB_DESPENSA.doc(residenciaId)
    .collection('Listas').doc(listaId)
    .collection('ItemLista').doc(itemQuantidade.itemId)

    try {
        await despensaRef.update({
            quantidade:itemQuantidade.quantidade
        })
        console.log("Atualizado com sucesso", (await despensaRef.get()).data)
    } catch (error) {
        console.error("Erro ao atualiza a quantidade de itens", error);
    }
}

const removerItem = async (residenciaId, listaId, itemRemovido)=>{
    const despensaRef = DB_DESPENSA.doc(residenciaId)
    .collection('Listas').doc(listaId)
    .collection('ItemLista').doc(itemRemovido.itemId);

    try {
        await despensaRef.delete();
        console.log("Item removido do Firestore");
      } catch (error) {
        console.error("Erro ao remover item do Firestore:", error);
      }
}

const removerTodosOsItens = async(residenciaId, listaId) =>{
    const despensaRef = DB_DESPENSA.doc(residenciaId)
    .collection('Listas').doc(listaId)
    .collection('ItemLista');

    try {
      await despensaRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
  
      console.log("Todos os itens removidos do Firestore");
        
    } catch (error) {
        console.error("Erro ao limpar lista do Firestore:", error);
    }
}


export default{
    buscarListaDeCompras,
    adicionarListaDeCompras,
    excluirListaDeCompras,
    buscarListaDeComprasComItens,
    adicionarItensNaListaDeCompras,
    atualizarQuantidade,
    removerTodosOsItens,
    removerItem
}