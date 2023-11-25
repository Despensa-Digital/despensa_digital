import { useState, useEffect } from 'react';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';


//Agenda uma notificacao de vencimento de produto
//Se o id da notificacao ja estiver sendo usado, atualizara a notificacao
//adicionar id como parametro
async function scheduleNotification(dataAgendada, nomeProduto, codigoDeBarras) {
    console.log("SCHEDULE: ", dataAgendada);

    const url = 'https://cdn-cosmos.bluesoft.com.br/products/' + codigoDeBarras;

    //verifica se url retorna imagem, caso contrario, utiliza imagem default
    const imgSource = await fetch(url)
        .then((res) => {
            if (res.status == 404) {
                return (require('../../Assets/Notification/DefaultImg.png'));
            } else {
                return ('https://cdn-cosmos.bluesoft.com.br/products/' + codigoDeBarras);
            }
        })
        .catch((err) => {
            console.log(err);
            return (require('../../Assets/Notification/DefaultImg.png'));
        });


    // Create a time-based trigger
    const triggger = {
        type: TriggerType.TIMESTAMP,
        timestamp: dataAgendada //ja esta recebendo data em timestamp
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
    return await notifee.createTriggerNotification(
        {
            title: 'Produto próximo do vencimento',
            body: 'O produto ' + nomeProduto + ' está para vencer',
            android: {
                channelId,
                smallIcon: 'ic_small_icon',
                color: '#5DB075',
                largeIcon: imgSource,
                pressAction: {
                    id: 'default'
                },
            },
        },
        triggger,
    ).then(() => notifee.getTriggerNotificationIds()).then((ids) => ids.at(-1));

}

export default scheduleNotification;