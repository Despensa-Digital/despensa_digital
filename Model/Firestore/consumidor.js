import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DB_CONSUMIDORES = firestore().collection("Consumidor");

const default_photo = 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama_1x.png'

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
                    nome: consumer.nome,
                    fotoUrl: consumer.foto ? consumer.foto : default_photo
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



export default{
    buscarConsumidores, 
    buscarConsumidor,
    buscarConsumidorLogado,
    buscarConsumidoresEmTempoReal, 
    adicionarConsumidor
}
    


