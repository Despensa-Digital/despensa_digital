import firestore from '@react-native-firebase/firestore';

const DB_DESPENSA = firestore().collection("Residencia");



const buscarProdutosProximosDaValidade = async (residenciaId) => {
    const dataAtual = new Date(); // Obtém a data atual
    const dataDaquiUmMes = new Date()
    dataDaquiUmMes.setMonth(dataDaquiUmMes.getMonth() + 1);

    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Produtos')
    const produtos = [];

    const querySnapshot = await despensaRef
        .get()
    if (querySnapshot.size > 0) {
        for (const documentSnapshot of querySnapshot.docs) {
            const produto = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            };

            const itemProdutoRes = documentSnapshot.ref
                .collection('ItensProdutos')
                .where('validade', '>=', dataAtual)
                .where('validade', '<=', dataDaquiUmMes)
                .orderBy('validade', 'asc')
                .limit(1);

            const subSnapshot = await itemProdutoRes.get();

            if (!subSnapshot.empty) {
                subSnapshot.forEach((itemSnapshot) => {
                    const itemProdutoData = itemSnapshot.data()
                    if (itemProdutoData && itemProdutoData.validade) {
                        const itemProduto = {
                            ...itemSnapshot.data(),
                            itemId: itemSnapshot.id,
                        };
                        produto.itensProdutos = itemProduto;
                        // console.log("INSERIDO:");
                        // console.log(JSON.stringify(itemProduto, null, 2)); // Adicionando o primeiro itemProduto encontrado
                    }
                });
                produtos.push(produto);
            }


        }

        return produtos;
    } else {
        return null;
    }
}






const buscarProdutosItensValidades = async (residenciaId, callback) => {
    const dataAtual = new Date(); // Obtém a data atual
    const timestampAtual = firestore.Timestamp.fromDate(dataAtual);
    const despensaRef = DB_DESPENSA.doc(residenciaId)
        .collection('Produtos')
        .orderBy("nome", 'asc')
    // const produtos = [];

    const unsubscribe = despensaRef
        .onSnapshot(async querySnapshot => {
            const produtos = [];
            if (querySnapshot.size > 0) {

                const promises = [];
                querySnapshot.forEach(documentSnapshot => {
                    const produto = {
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    }

                    const itemProdutosRes = documentSnapshot.ref.collection('ItensProdutos')
                        // .where('validade', '>=', timestampAtual)
                        .orderBy('validade', 'desc')
                        .limit(1)
                    promises.push(
                        itemProdutosRes.get().then((sub) => {
                            if (!sub.empty) {
                                let itensProdutos = {};

                                sub.forEach((itemSnapshot) => {
                                    const itemProdutoData = itemSnapshot.data()
                                    if (itemProdutoData && itemProdutoData.validade) {
                                        // console.log("Entrei aqui\n");
                                        const itemProduto = {
                                            ...itemSnapshot.data(),
                                            itemId: itemSnapshot.id,
                                        };
                                        if (itemProdutoData.validade.toDate() < new Date()) {
                                            // Produto vencido
                                            produto.itensProdutos = {
                                                ...itemProduto,
                                                vencido: true // Adiciona um indicador de produto vencido
                                            };
                                        } else {
                                            produto.itensProdutos = itemProduto;
                                        }
                                        // itensProdutos.push(itemProduto);
                                        // console.log("Produto: ",produto.nome,"itensProdutos: ", itemProduto, " Validade", itemProduto.validade)
                                        // produto.itensProdutos = itemProduto;
                                    }

                                });

                                // produto.itensProdutos = itensProdutos;
                            }
                            produtos.push(produto);
                        })

                    );


                });


                await Promise.all(promises);

                callback(produtos.length > 0 ? produtos : null);
            }
        })

    return () => unsubscribe;
}



// const buscarProdutosFiltrados = (residenciaId,searchCategoria,callback) =>{
//     const despensaRef = DB_DESPENSA.doc(residenciaId)
//         .collection('Produtos')
//         .orderBy("nome", 'asc')


//     console.log("Filtro", searchCategoria)
//     const unsubscribe = despensaRef
//         .onSnapshot(async querySnapshot => {
//             const produtos = [];
//             if (querySnapshot.size > 0) {
//                 const promises = [];

//                 querySnapshot.forEach(documentSnapshot => {
//                     const produto = {
//                         ...documentSnapshot.data(),
//                         key: documentSnapshot.id,
//                     }

//                     const itemProdutosRes = documentSnapshot.ref.collection('ItensProdutos')
//                     .where('categoria', '==', searchCategoria)
//                     .orderBy('validade', 'asc')
//                     .limit(1);

//                     promises.push(
//                         itemProdutosRes.get().then((sub) => {
//                             if (!sub.empty) {
//                                 const itensProdutos = [];

//                                 sub.forEach((itemSnapshot) => {
//                                     const itemProdutoData = itemSnapshot.data()
//                                     // console.log("Produto", produto ,"Produto Filtrado", itemProdutoData)
//                                     if(itemProdutoData && itemProdutoData.categoria){
//                                     const itemProduto = {
//                                         ...itemSnapshot.data(),
//                                         itemId: itemSnapshot.id,
//                                     };
//                                     itensProdutos.push(itemProduto);

//                                 }
//                                 });
//                                 console.log("Produto Filtrado: ", produto.nome, "\nItemProduto", itensProdutos[0])
//                                 console.log("\n\n\n\n\n\n\n\n")
//                                 produto.itensProdutos = itensProdutos[0];
//                             }
//                             console.log("PRODUTO", produto)
//                             produtos.push(produto);
//                             console.log("TOTAL:", produtos.length)
//                         })

//                     );


//                 });

//                 await Promise.all(promises);

//                 callback(produtos)
//             }
//             else {
//                 callback(null)
//             }
//         })

//         return () => unsubscribe;
// }


const buscarProdutosFiltrados = (residenciaId, searchCategoria, callback) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId)
        .collection('Produtos')
        .orderBy("nome", 'asc');

    const unsubscribe = despensaRef.onSnapshot(async querySnapshot => {
        const produtos = [];

        for (const documentSnapshot of querySnapshot.docs) {
            const produto = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            };

            const itemProdutosRef = documentSnapshot.ref.collection('ItensProdutos');

            const sub = await itemProdutosRef
                .where('categoria', '==', searchCategoria)
                .orderBy('validade', 'desc')
                .limit(1)
                .get();
            
            sub.forEach(itemSnapshot => {
                const itemProdutoData = itemSnapshot.data()
                const itemProduto = {
                    ...itemSnapshot.data(),
                    itemId: itemSnapshot.id,
                };
                if (itemProdutoData.validade.toDate() < new Date()) {
                    // Produto vencido
                    produto.itensProdutos = {
                        ...itemProduto,
                        vencido: true // Adiciona um indicador de produto vencido
                    };
                } else {
                    produto.itensProdutos = itemProduto;
                }
                // produto.itensProdutos = itemProduto;
            });
            
            if (produto.itensProdutos) {
                produtos.push(produto);
            }
        }

        callback(produtos);
    });

    return () => unsubscribe();
};


// const buscarProdutosFiltrados = async (residenciaId, searchCategoria, callback) => {
//     const despensaRef = DB_DESPENSA.doc(residenciaId)
//         .collection('Produtos')
//         .orderBy("nome", 'asc');

//     const querySnapshot = await despensaRef.get();

//     const produtos = [];

//     for (const documentSnapshot of querySnapshot.docs) {
//         const produto = {
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//         };

//         const itemProdutosRef = documentSnapshot.ref.collection('ItensProdutos');

//         const sub = await itemProdutosRef
//             .where('categoria', '==', searchCategoria)
//             .orderBy('validade', 'asc')
//             .limit(1)
//             .get();

//         sub.forEach(itemSnapshot => {
//             const itemProduto = {
//                 ...itemSnapshot.data(),
//                 itemId: itemSnapshot.id,
//             };
//             produto.itensProdutos = itemProduto;
//         });

//         if (produto.itensProdutos) {
//             produtos.push(produto);
//         }
//     }

//     callback(produtos);
// };




const buscarProdutoItensProdutos = (residenciaId, idProduto, callback) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Produtos').doc(idProduto)
    let produto = {};
    despensaRef
        .onSnapshot(async documentSnapshot => {


            if (documentSnapshot.exists) {
                produto = {
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    key: documentSnapshot.id,
                }
                // console.log("Produto", produto);    
                const itemProdutosRes = documentSnapshot.ref.collection('ItensProdutos').orderBy('validade', 'desc')
                const itemProdutosSnapshot = await itemProdutosRes.get();

                if (!itemProdutosSnapshot.empty) {

                    const itensProdutos = []

                    itemProdutosSnapshot.forEach((itemSnapshot) => {
                        const itemProduto = {
                            ...itemSnapshot.data(),
                            key: itemSnapshot.id
                        };

                        // console.log("Item", itemProduto)
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
    const isExist = await DB_DESPENSA.doc(residenciaId)
        .collection('Produtos')
        .where('codigoDeBarras', '==', produto.codigoDeBarras)
        .get()

    if (isExist.size === 0) {
        const produtoRef = await DB_DESPENSA.doc(residenciaId)
            .collection('Produtos')
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

        await produtoRef.collection('ItensProdutos').get().then((snapshot) => {
            const quantidade = produto.quantidade || 1; // Se quantidade não estiver definida, assume 1

            for (let i = 0; i < quantidade; i++) {
                produtoRef.collection('ItensProdutos').add({
                    categoria: produto.categoria,
                    preco: produto.preco,
                    validade: produto.dataValidade,
                    localCompra: produto.localCompra
                });
            }
        });
    } else {
        const produtoExiste = isExist.docs[0];
        const itensProdutosRef = produtoExiste.ref.collection('ItensProdutos')

        const quantidade = produto.quantidade || 1; // Se quantidade não estiver definida, assume 1
        for (let i = 0; i < quantidade; i++) {
            await itensProdutosRef.add({
                categoria: produto.categoria,
                preco: produto.preco,
                validade: produto.dataValidade,
                localCompra: produto.localCompra
            });
        }

    }

}

const atualizarProduto = async (residenciaId, produtoAtualizado) => {
    const produtoRef = DB_DESPENSA.doc(residenciaId).collection("Produtos").doc(produtoAtualizado.key)
    console.log("Produto Atualizado", produtoAtualizado)

    try{
        await produtoRef.update({
            categorias: produtoAtualizado.categoria,
            marca: produtoAtualizado.marca,
            nome: produtoAtualizado.nomeProduto,
            unidade: {
                unidadeMedida: produtoAtualizado.unidadeMedida,
                valorUnitario: produtoAtualizado.peso
            }
        })

        // console.log("Produto Atualizado");

    } catch (erro) {
        console.error('Erro ao adicionar item:', erro);
    }

}


const adicionarItemProduto = async (residenciaId, itemProduto) => {
    const produtoId = itemProduto.key
    // console.log("Item produto", itemProduto)
    // console.log("Key",produtoId)

    const produtoRef = DB_DESPENSA.doc(residenciaId).collection("Produtos").doc(produtoId)

    produtoRef.collection('ItensProdutos').add({
        categoria: itemProduto.categoria,
        preco: itemProduto.preco,
        validade: itemProduto.dataValidade,
        localCompra: itemProduto.localCompra
    }).then((doc) => {
        console.log('Item adicionado com sucesso. ID do item:', doc.id);
    }).catch((erro) => {
        console.error('Erro ao adicionar item:', erro);
    })

}




const atualizarItemProduto = async (residenciaId, produtoId, itemAtualizado) => {

    const produtoRef = DB_DESPENSA.doc(residenciaId).collection("Produtos").doc(produtoId);
    const itemRef = produtoRef.collection('ItensProdutos').doc(itemAtualizado.key);
    // console.log("Meu item", itemAtualizado)
    try {
        await itemRef.update({
            categoria: itemAtualizado.categoria,
            preco: itemAtualizado.preco,
            validade: itemAtualizado.validade,
            validade: itemAtualizado.validade,
            localCompra: itemAtualizado.localCompra
        });

        console.log('Item atualizado com sucesso.');
    } catch (erro) {
        console.error('Erro ao atualizar item:', erro);
    }
}

const excluirItemProduto = async (residenciaId, produtoId, itemId) => {

    const produtoRef = DB_DESPENSA.doc(residenciaId).collection("Produtos").doc(produtoId);
    const itemRef = produtoRef.collection('ItensProdutos');

    const snapshot = await produtoRef.collection('ItensProdutos').count().get();
    const qtd = snapshot.data().count;
    console.log("QTD: ", qtd);
    try {
        if (qtd > 1) {
            return await itemRef.doc(itemId).delete().then(() => {
                //console.log("Model: ", produtoId, itemId)
                console.log('Item excluído com sucesso.');
            }).then(() => 1)
        } else {
            await itemRef.get()
            .then(allItemDocs => {
                allItemDocs.forEach((itemDoc) => itemDoc.ref.delete())
            })
            //deleta o produto
            return await produtoRef.delete().then(() => 0);
        }
    } catch (erro) {
        console.error('Erro ao atualizar item:', erro);
        return "FALHEI"
    }
}

const excluirProduto = async (residenciaId, produtoId) => {

    const produtoRef = DB_DESPENSA.doc(residenciaId).collection("Produtos").doc(produtoId);
    const itemRef = produtoRef.collection('ItensProdutos');

    try {
        //deleta todos os itens do produto
        await itemRef.get()
            .then(allItemDocs => {
                allItemDocs.forEach((itemDoc) => itemDoc.ref.delete())
            })

        //deleta o produto
        return await produtoRef.delete().then(() => 0);

    } catch (erro) {
        console.error('Erro ao atualizar item:', erro);
        return "FALHEI"
    }
}

export default {
    buscarProdutosItensValidades,
    buscarProdutosProximosDaValidade,
    buscarProdutoItensProdutos,
    buscarProdutosFiltrados,
    adicionarProduto,
    atualizarProduto,
    adicionarItemProduto,
    atualizarItemProduto,
    excluirItemProduto,
    excluirProduto
}