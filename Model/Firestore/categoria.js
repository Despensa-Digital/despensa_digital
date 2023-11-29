import firestore from '@react-native-firebase/firestore';


const DB_DESPENSA = firestore().collection("Residencia");

// const buscarCategorias = async (residenciaId) =>{
//     const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Categorias')

//     const categorias = []
//     despensaRef.onSnapshot(async querySnapshot =>{
//         if(querySnapshot.size > 0){
//             querySnapshot.forEach(documentSnapshot =>{
//                 const categoria = {
//                     ...documentSnapshot.data(),
//                     key: documentSnapshot.id
//                 }

//                 categorias.push(categoria);
//             })
//             // console.log("Model", categorias);
//             callback(categorias)
//         }
//         else{
//             callback(null)
//         }
        
//     })
// }

const buscarCategorias = async (residenciaId) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Categorias');

    try {
        const querySnapshot = await despensaRef.get();

        if (!querySnapshot.empty) {
            const categorias = querySnapshot.docs.map(documentSnapshot => {
                return {
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                };
            });

            // console.log("Model", categorias);
            return categorias;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return null;
    }
}


const adicionarCategoria = async(residenciaId, novaCategoria) =>{
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Categorias');

    try {
        const novaCategoriaRef = await despensaRef.add(novaCategoria);

        console.log("Categoria criada com sucesso", novaCategoriaRef.id)
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        return null;
    }
}


const atualizarCategoria = async (residenciaId, categoriaId, novosDados) => {

    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Categorias').doc(categoriaId);

    try {
        await despensaRef.update(novosDados);

        console.log("Categoria atualizada com sucesso")
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        return null;
    }
};



const excluirCategoria = async (residenciaId, categoriaId) => {
    const despensaRef = DB_DESPENSA.doc(residenciaId).collection('Categorias').doc(categoriaId);

    try {
        await despensaRef.delete();
        console.log("Categoria removida com sucesso!")
        // return true; // Indica que a exclusão foi bem-sucedida
    } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        return false; // Indica que a exclusão falhou
    }
};

export default {
    buscarCategorias,
    adicionarCategoria,
    atualizarCategoria,
    excluirCategoria
}