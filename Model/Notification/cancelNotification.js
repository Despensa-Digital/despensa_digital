import notifee from '@notifee/react-native';

//cancela uma notificacao passando o id
async function cancelNotification(notificationId) {
    await notifee.cancelNotification(notificationId);

}

export default cancelNotification;