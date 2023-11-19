import { useState } from 'react';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';


//Agenda uma notificacao de vencimento de produto
//Se o id da notificacao ja estiver sendo usado, atualizara a notificacao
//adicionar id como parametro
async function scheduleNotification(dataAgendada, nomeProduto, codigoDeBarras) {
    const [imgUrl, setImgUrl] = useState();
    const url = 'https://cdn-cosmos.bluesoft.com.br/products/' + codigoDeBarras;

    //cria uma data
        // var date = new Date(Date.now());
        // date.setSeconds(date.getSeconds() + 20);

    //TESTES DE TIMESTAMP
        // var dateMinus = new Date(Date.now());
        // dateMinus.setHours(dateMinus.getHours() - 5);

        // var datePlus = new Date('2023-11-13 08:00:00');

        // console.log("Data normal: ", date);
        // console.log('data getTime: ', date.getTime());

        // console.log("DataMinus normal: ", dateMinus);
        // console.log('dataMinus getTime: ', dateMinus.getTime());

        // console.log("DataPlus normal: ", datePlus);
        // console.log('dataPlus getTime: ', datePlus.getTime());
    //FIM DOS TESTES

    //verifica se url retorna imagem, caso contrario, utiliza imagem default
    fetch(url)
        .then((res) => {
            if (res.status == 404) {
                setImgUrl(require('../../Assets/Notification/DefaultImg.png'));
            } else {
                setImgUrl('https://cdn-cosmos.bluesoft.com.br/products/' + codigoDeBarras);
            }
        })
        .catch((err) => {
            console.log(err);
            setImgUrl(require('../../Assets/Notification/DefaultImg.png'));
        });
    

    // Create a time-based trigger
    const triggger = {
        type: TriggerType.TIMESTAMP,
        timestamp: dataAgendada //ja esta recebendo data em timestamp
        // timestamp: date.getTime(), //converte a data para timestamp
    };

    //cria um canal para envio de notificacoes
    //id e name quaisquer
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH
    });


    // Create a trigger notification
    // passar id do itemProduto
    await notifee.createTriggerNotification(
        {
            title: 'Produto próximo do vencimento',
            body: 'O produto ' + nomeProduto + ' está para vencer',
            android: {
                channelId,
                smallIcon: 'ic_small_icon',
                color: '#5DB075',
                largeIcon: imgUrl,
                pressAction: {
                    id: 'default'
                },
            },
        },
        triggger,
    );
}

export default scheduleNotification;