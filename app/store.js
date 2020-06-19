import Vue from 'vue';
import Vuex from 'vuex';
import { TcpClient } from "nativescript-simple-networking";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tcpClient: '',
        clients: []
    },
    mutations: {

    },
    actions: {
        socket_baglan(context, ip, port) {
            context.state.tcpClient = new TcpClient();
            context.state.tcpClient.start(ip, port)

            context.state.tcpClient.onData = (data) => {
                context.state.clients.push('Sunucu: ' + data)
            };

            context.state.tcpClient.onError = (id, message) => {
                console.log("TCP client error for action #", id, ": ", message);
            };

            context.state.tcpClient.onFinished = (id) => {
                console.log("TCP client finished action #: ", id);
            };
        },
        send_message(data) {
            context.state.tcpClient.send(data);
        },
        socket_close(context) {
            context.state.tcpClient.stop();
        }
    }
});