import scheduleNotification from "../../Model/Notification/scheduleNotification";

//adicionar id como parametro
function scheduleNotificationControl(dataValidade = '', dataNotificacao = 7, nomeProduto, codigoDeBarras) {

    //se dataValidade for do tipo Date, desconsiderar o tratamento
    const dayToTimestamp = dataNotificacao * 24 * 60 * 60 * 1000;
    const aux = dataValidade.split('/');
    const dataValidadeTratado = new Date(aux[2] + '-' + aux[1] + '-' + aux[0] + ' 08:00:00').getTime() - dayToTimestamp;

    //Se data da notificacao ja tiver passado, notificar agora daqui 60 segundos
    const dataAgendada = dataValidadeTratado <= Date.now() ? (Date.now() + 20000) : dataValidadeTratado;

    //adicionar id como parametro
    scheduleNotification(dataAgendada, nomeProduto, codigoDeBarras);
    return true;
}

export default scheduleNotificationControl;