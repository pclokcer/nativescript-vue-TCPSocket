import Vue from 'vue';
import Vuex from 'vuex';
import { TcpClient } from "nativescript-simple-networking";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tcpClient: '',
        clients: [],
        buttonStatus: false,
        connectButton: true,
        cuteButton: false
    },
    mutations: {

    },
    actions: {
        socket_baglan(context, connectData) {
            new Promise((resolve, reject) => {
                context.state.tcpClient = new TcpClient();
                context.state.tcpClient.start(connectData.ip, parseInt(connectData.port))

                context.state.tcpClient.onClient = (data) => {
                    return resolve()
                };
                context.state.tcpClient.onData = (data) => {
                    context.state.clients.push(data)
                };

                context.state.tcpClient.onError = (id, message) => {
                    //console.log("TCP client error for action #", id, ": ", message);
                    return reject("TCP client error for action #", id, ": ", message)
                };

                context.state.tcpClient.onFinished = (id) => {
                    console.log("TCP client finished action #: ", id);
                    return resolve()
                };
            })
        },
        send_message(context, data) {
            context.state.tcpClient.send(data);
        },
        socket_close(context) {
            if (context.state.tcpClient == '') return
            context.state.tcpClient.stop();
        }
    }
});