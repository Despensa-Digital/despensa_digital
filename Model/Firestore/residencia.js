import firestore from '@react-native-firebase/firestore';
import consumidor from "./consumidor";
import { getResidenciaStorage, removeResidenciaStorage } from '../../Controller/Despensa/storage';

import auth from '@react-native-firebase/auth';





const DB_RESIDENCIA = firestore().collection("Residencia");
const DB_CONSUMIDOR = firestore().collection("Consumidor")
const categorias = [         
            { nome: 'Lavanderia', foto: 'WashingMachine.png'},
            { nome: 'Geladeira', foto: 'Fridge.png'},
            { nome: 'Hortifruit', foto: 'Fruits.png'},
            { nome: 'Armário da sala', foto: 'Pantry.png'},
            { nome: 'Banheiro', foto: 'Bathtub.png'},
            { nome: 'Cozinha', foto: 'Hamper.png'},];

//Buscar todas as residencias do usuario logado
const buscarResidencias = async () =>{
    const current_id = await consumidor.buscarConsumidorLogado();
    const residenciaRef =  DB_RESIDENCIA.get();

    return residenciaRef
        .then(snap =>{
            const dados = [];
            snap.forEach((doc) =>{
                if(Array.isArray(doc.data().membros)){
                    const membroLogado = doc.data().membros.find(membro => membro.id === current_id)
                    if(membroLogado){
                        const residencia= {
                            id: doc.id,
                            data: doc.data()
                        }
                        dados.push(residencia)
                    }
                    
                    
                }
            })

            return dados
        }
    )
}

const buscarResidencia = (residenciaId, callback)=>{
    const residenciaRef =  DB_RESIDENCIA.doc(residenciaId)
    
   residenciaRef.onSnapshot((doc) =>{
        if(doc.exists){
          callback(doc.data())
        }
    })

    

}







const buscarResidenciaAtual = async ()=>{
    
    const residenciaId = await getResidenciaStorage()
    const residenciaRef =  await DB_RESIDENCIA.doc(residenciaId).get();
    if(!residenciaRef.exists)
        return null

    return residenciaRef.data()
    

}


const buscarIdResidenciaAtual = async ()=>{
    const current_id = await consumidor.buscarConsumidorLogado();
    const residenciaRef =  DB_RESIDENCIA.where("current_residencia", "==", true)
    
    

    return residenciaRef.get()
        .then(snap =>{
            let id = '';
            snap.forEach((doc) =>{
                if(Array.isArray(doc.data().membros)){
                    const membroLogado = doc.data().membros.find(membro => membro.id === current_id)
                    if(membroLogado){
                        id = doc.id
                    }
                }
            })

            return id
        }
    )

}


const adicionarResidencia = async(nome)=>{
    console.log("Nome da Residencia", nome)
    try {
        const id = await consumidor.buscarConsumidorLogado();
        const  userAtual = await consumidor.buscarConsumidor(id)

        const residenciaRef = await DB_RESIDENCIA.add({
            nome: nome,
            current_residencia: false,
            membros: [
                {
                    id: id,
                    nome: userAtual.nome,
                    foto: userAtual.fotoUrl,
                    // email: userAtual.email,
                    admin: true
                }
            ]
        });
    
        const residenciaId = residenciaRef.id;
    
        if (residenciaId) {
            const categoriasRef = DB_RESIDENCIA.doc(residenciaId).collection('Categorias');
            const categoriasSnapshot = await categoriasRef.get();
    
            if (categoriasSnapshot.size === 0) {
                // Adicionar categorias apenas se a subcoleção estiver vazia
                const batch = firestore().batch();
    
                categorias.forEach(categoria => {
                    const novaCategoria = categoriasRef.doc();
                    batch.set(novaCategoria, categoria);
                });
    
                await batch.commit();
                console.log('Categorias adicionadas com sucesso!');
            } else {
                console.log('A subcoleção de categorias já contém documentos. Não serão adicionadas categorias.');
            }
        } else {
            console.error('Erro ao adicionar a residência. As categorias não serão adicionadas.');
        }
    } catch (error) {
        console.error('Erro ao adicionar residência ou categorias:', error);
    }
    
}




atualizarNomeResidencia = async (residenciaId, nomeResidencia)=>{
    const residenciaRef =  DB_RESIDENCIA.doc(residenciaId)

        residenciaRef.update(
            {
                nome:nomeResidencia
            }
        ).then(() => {
            console.log('User updated!');
          });
    
}

removerResidencia = async (residenciaId) =>{
    DB_RESIDENCIA.doc(residenciaId)
                .delete()
    .then(() => {
        if(residenciaId === getResidenciaStorage())
            removeResidenciaStorage()
        console.log('Residencia deleted!');
  });
}

//MEMBROS

adicionarNovoMembro = async (novoMembro) =>{
    const residenciaId = await getResidenciaStorage()
    
        // Verificar se o usuário existe na base de dados
        const usuarioDoc = await DB_CONSUMIDOR.where("email", "==", novoMembro.email).get();

        if (usuarioDoc.empty) {
            console.log('Usuário não encontrado na base de dados.');
            return 'Usuario não encontrado na base de dados.' //Exibir essa mensagem para o usuario
        }
        const residenciaDoc = await DB_RESIDENCIA.doc(residenciaId).get()
        const dadosAtuais = residenciaDoc.data()
        const usuarioEncontrado = {
            id: usuarioDoc.docs[0].id,
            nome: novoMembro.nome,
            foto: usuarioDoc.docs[0].data().fotoUrl ? usuarioDoc.docs[0].data().fotoUrl: "",
            admin: false
        }

        const arrayMembrosExistente = dadosAtuais.membros

       const novoArrayMembrosAtualizado = [...arrayMembrosExistente,usuarioEncontrado]
        // Adicionar o usuário à residência
        console.log("Array Membros Atualizados", novoArrayMembrosAtualizado)
        
        await DB_RESIDENCIA.doc(residenciaId).update({
            membros: novoArrayMembrosAtualizado
        })

        return 'Usuário adicionado à residência com sucesso.';
    
}

atualizarMembro = async (residenciaId, membroAtualizado)=>{
    const residenciaRef = DB_RESIDENCIA.doc(residenciaId)
    residenciaRef.get()
        .then((doc)=>{
            if(doc.exists){
                const dados = doc.data();
                const membros = dados.membros ||[]
                const membroIndex = membros.findIndex((membro) => membro.id === membroAtualizado.id)
                
                if(membroIndex !== -1){
                    membros[membroIndex].nome = membroAtualizado.nome
                    return residenciaRef.update({membros})
                }
                else{
                    console.log("Membro não encontrado")
                }
            }
        }).then(() => {
            console.log('Membro atualizado com sucesso');
        })
    
    
}



removerMembro = async (residenciaId, membroRemovido) =>{
    console.log(membroRemovido)

    const residenciaRef = DB_RESIDENCIA.doc(residenciaId)
    residenciaRef.get()
        .then((doc)=>{
            if(doc.exists){
                const dados = doc.data();
                const membros = dados.membros ||[]
                const membroIndex = membros.findIndex((membro) => membro.id === membroRemovido.id)
                
                if(membroIndex !== -1){
                    membros.splice(membroIndex,1)
                    
                    return residenciaRef.update({membros})
                }
                else{
                    console.log("Membro não encontrado")
                }
            }
        }).then(() => {
            console.log('Membro atualizado com sucesso');
        })
}

export default{
    buscarResidencias,
    buscarResidencia,
    buscarResidenciaAtual,
    buscarIdResidenciaAtual,
    adicionarResidencia,
    removerResidencia,
    adicionarNovoMembro,
    atualizarNomeResidencia,
    atualizarMembro,
    removerMembro
}