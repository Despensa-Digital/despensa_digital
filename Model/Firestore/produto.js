import firestore from '@react-native-firebase/firestore';

const DB_DESPENSA = firestore().collection("Residencia");


const buscarProdutosItensValidades = async (residenciaId, callback) => {
    const dataAtual = new Date(); // Obtém a data atual
    const timestampAtual = firestore.Timestamp.fromDate(dataAtual);
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Produtos')
    const produtos = [];
    despensaRef
        .onSnapshot(async querySnapshot => {

            if (querySnapshot.size > 0) {
                const promises = [];

                querySnapshot.forEach(documentSnapshot => {
                    const produto = {
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    }


                    const itemProdutosRes = documentSnapshot.ref.collection('ItensProdutos')
                    .where('validade', '>=', timestampAtual)
                    .orderBy('validade', 'asc')

                    promises.push(
                        itemProdutosRes.get().then((sub) => {
                            if (!sub.empty) {
                                const itensProdutos = [];

                                sub.forEach((itemSnapshot) => {
                                    const itemProduto = {
                                        ...itemSnapshot.data(),
                                        itemId: itemSnapshot.id,
                                    };
                                    itensProdutos.push(itemProduto);



                                });
                                produto.itensProdutos = itensProdutos[0];
                            }
                        })
                    );
                    produtos.push(produto);
                });

                await Promise.all(promises);
                
                callback(produtos)
            }
            else {
                callback(null)
            }
        })
}


const buscarProdutoItensProdutos = (residenciaId,idProduto, callback) =>{
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Produtos').doc(idProduto)
    let produto = {};
    despensaRef
        .onSnapshot(async documentSnapshot => {
            
            if (documentSnapshot.exists) {
                produto = {
                    ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                }
                console.log("Produto", produto);    
                const itemProdutosRes = documentSnapshot.ref.collection('ItensProdutos').orderBy('validade', 'desc')
                const itemProdutosSnapshot = await itemProdutosRes.get();

                if(!itemProdutosSnapshot.empty){
                    
                    const itensProdutos = []

                    itemProdutosSnapshot.forEach((itemSnapshot)=>{
                        const itemProduto = {
                            ...itemSnapshot.data(),
                            key: itemSnapshot.id
                        };

                        console.log("Item", itemProduto)
                        itensProdutos.push(itemProduto);
                    });

                    produto.itensProdutos = itensProdutos;
                }
                
                callback(produto)
            }
            else {
                console.log('Produto não encontrado')
                callback(null)
            }
        })
}

const adicionarProduto = async (residenciaId, produto) => {
    //Futuramente pegar o id usando o async storage
    const isExist = await DB_DESPENSA.doc(residenciaId).collection('Produtos').where('codigoDeBarras', '==', produto.codigoDeBarras).get()

    if (isExist.size === 0) {
        const produtoRef = await DB_DESPENSA.doc(residenciaId).collection('Produtos')
            .add({
                categorias: produto.categoria,
                codigoDeBarras: produto.codigoDeBarras,
                marca: produto.marca,
                nome: produto.nomeProduto,
                unidade: {
                    unidadeMedida: produto.unidadeMedida,
                    valorUnitario: produto.peso
                }
            })

        await produtoRef.collection('ItensProdutos')
            .add({
                categoria: produto.categoria,
                preco: produto.preco,
                validade: produto.dataValidade
            })
    } else {
        const produtoExiste = isExist.docs[0];
        await produtoExiste.ref.collection('ItensProdutos').add({
            categoria: produto.categoria,
            preco: produto.preco,
            validade: produto.dataValidade
        })
    }

}


const adicionarItemProduto = async (residenciaId, itemProduto) =>{
    const produtoId = itemProduto.key
    console.log("Item produto", itemProduto)
    console.log("Key",produtoId)
    
    const produtoRef = DB_DESPENSA.doc(residenciaId).collection("Produtos").doc(produtoId)

    produtoRef.collection('ItensProdutos').add({
        categoria: itemProduto.categoria,
        preco: itemProduto.preco,
        validade: itemProduto.dataValidade
    }).then((doc)=>{
        console.log('Item adicionado com sucesso. ID do item:', doc.id);
    }).catch((erro)=>{
        console.error('Erro ao adicionar item:', erro);
    })
     
}

export default {
    buscarProdutosItensValidades,
    buscarProdutoItensProdutos,
    adicionarProduto,
    adicionarItemProduto
}