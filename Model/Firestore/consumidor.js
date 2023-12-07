import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DB_CONSUMIDORES = firestore().collection("Consumidor");

const default_photo = 'https://firebasestorage.googleapis.com/v0/b/despensadigital-10674.appspot.com/o/palmirinha.png?alt=media&token=7ea0d83f-1d4b-4851-911b-6f13b22401d3https://firebasestorage.googleapis.com/v0/b/despensadigital-10674.appspot.com/o/palmirinha.png?alt=media&token=7ea0d83f-1d4b-4851-911b-6f13b22401d3'

const buscarConsumidores = async () =>{
    const querySnapshot = await DB_CONSUMIDORES.get();

    const consumers = querySnapshot.docs.map(doc => doc.data());

    return consumers;
}

const buscarConsumidorLogado = async() =>{
    const id =  auth().currentUser.uid;
    return id;
}


const buscarConsumidor  = async (id) =>{
    const subscriber = await DB_CONSUMIDORES.doc(id)
        .get();
    
        const consumer  = subscriber.data()
    return consumer
}

const buscarConsumidoresEmTempoReal = async() =>{
    const subscriber = firestore()
        .collection('Consumidor')
        .onSnapshot(documentSnapshot => {
            if(documentSnapshot){
                console.log('User data', documentSnapshot.docs)
            }
            else{
                console.log('Consumidores não encontrados')
            }
        })

    return () => subscriber()
}




const adicionarConsumidor = async (consumer) => {
    DB_CONSUMIDORES.doc(consumer.uid).get()
        .then((doc) => {
            if (!doc.exists) {
                DB_CONSUMIDORES.doc(consumer.uid).set({
                    email: consumer.email,
                    nome: consumer.displayName,
                    fotoUrl: consumer.photoURL ? consumer.photoURL : default_photo
                })
                    .then((doc) => {
                        console.log("Usuário criado com sucesso. ", doc.id)
                    })
                    .catch(error => {
                        return error
                    })
            }else{ //Remover futuramente
                console.log("Usuário já existe!");
            }
        })
}

const atualizarConsumidor = async (consumer) => {
    DB_CONSUMIDORES.doc(consumer.uid).get()
        .then(() => {          
            DB_CONSUMIDORES.doc(consumer.uid).update({            
                fotoUrl: consumer.photoURL
            })
                .then((doc) => {
                    console.log("Usuário atualizado com sucesso. ", doc.id)
                })
                .catch(error => {
                    return error
                })
            
        })
}

export default{
    buscarConsumidores, 
    buscarConsumidor,
    buscarConsumidorLogado,
    buscarConsumidoresEmTempoReal, 
    adicionarConsumidor,
    atualizarConsumidor
}
    


