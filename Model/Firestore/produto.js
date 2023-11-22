import firestore from '@react-native-firebase/firestore';

const DB_DESPENSA = firestore().collection("Residencia");


const buscarProdutos = async(residenciaId, callback) =>{
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Produtos')
    const produtos = [];
    despensaRef
    .onSnapshot(async querySnapshot =>{
        const promises =[];

        querySnapshot.forEach(documentSnapshot =>{
           const produto ={
                ...documentSnapshot.data(),
                key:documentSnapshot.id,
            }


            const itemProdutosRes = documentSnapshot.ref.collection('ItensProdutos');

            const promise = itemProdutosRes.get().then(sub=>{
                produto.size = sub.size;
            })


            promises.push(promise);

            produtos.push(produto);


        });

       await Promise.all(promises);

        callback(produtos)
    })



}

const adicionarProduto = async (residenciaId,produto)=>{
    //Futuramente pegar o id usando o async storage
    const isExist = await DB_DESPENSA.doc(residenciaId).collection('Produtos').where('codigoDeBarras','==', produto.codigoDeBarras).get()

    if(isExist.size === 0){
        const produtoRef = await DB_DESPENSA.doc(residenciaId).collection('Produtos')
    .add({
        categorias: produto.categoria,
        codigoDeBarras: produto.codigoDeBarras,
        marca: produto.marca,
        nome: produto.nomeProduto,
        unidade:{
            unidadeMedida: produto.unidadeMedida,
            valorUnitario: produto.peso
        }
    })

    await produtoRef.collection('ItensProdutos')
    .add({
        categoria: produto.categoria,
        preco: produto.preco,
        validade:produto.dataValidade
    })
    }else{
        const produtoExiste = isExist.docs[0];
        await produtoExiste.ref.collection('ItensProdutos').add({
            categoria: produto.categoria,
            preco: produto.preco,
            validade: produto.dataValidade
        })
    }

}


export default{
    buscarProdutos,
    adicionarProduto
}