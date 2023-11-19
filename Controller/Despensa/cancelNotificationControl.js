import cancelNotification from '../../Model/Notification/cancelNotification';

//passa id para metodo do notifee na Model para cancelar notificacao
function cancelNotificationControl(notificationId) {
    cancelNotification(notificationId);
}

export default cancelNotificationControl;

//criar logica na View -> editar item
//quando usuario cancelar noitificacao (mudar switch) e salvar o item
//se notificarVencimento = false -> cancelar notificacao