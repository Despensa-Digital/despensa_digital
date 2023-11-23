import firestore from '@react-native-firebase/firestore';
import consumidor from "./consumidor";
import { getResidencia } from '../../Controller/Residencia/residenciaController';
import { getResidenciaStorage } from '../../Controller/Despensa/storage';






const DB_RESIDENCIA = firestore().collection("Residencia");


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
    // return residenciaRef.get()
    //     .then(snap =>{
    //         let dados = {};
    //         snap.forEach((doc) =>{
    //             if(Array.isArray(doc.data().membros)){
    //                 const membroLogado = doc.data().membros.find(membro => membro.id === current_id)
    //                 if(membroLogado && doc.exists && doc.data().current_residencia){
    //                     dados = doc.data()
    //                 }else{
    //                     dados = null
    //                 }
    //             }
    //         })

            
    //         return dados
    //     }
    // )
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




const adicionarResidencia = async (nome)=>{
    const id = await consumidor.buscarConsumidorLogado();
    const  userAtual = await consumidor.buscarConsumidor(id)
  
    DB_RESIDENCIA.add({
        nome:nome,
        current_residencia: false,
        membros: [
            {
                id: id,
                nome: userAtual.nome,
                foto: userAtual.fotoUrl,
                admin: true
            }
        ]
    })
    .then((residenciaRef)=>{
        //Obtenho o Id da Residencia criada
        const residenciaId = residenciaRef.id;
        //Adiciona no Local Storage do Aparelho
        console.log(`Residencia com id: ${residenciaId}, adicionada ao Storage`)
    })
}


removerResidencia = async (residenciaId) =>{
    DB_RESIDENCIA.doc(residenciaId)
                .delete()
    .then(() => {
        console.log('Residencia deleted!');
  });
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
    atualizarNomeResidencia,
    atualizarMembro,
    removerMembro
}