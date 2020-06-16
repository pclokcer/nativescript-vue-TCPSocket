import Vue from 'vue';
import Vuex from 'vuex';
import { TcpClient } from "nativescript-simple-networking";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tcpClient: ''
    },
    mutations: {

    },
    actions: {
        socket_baglan(context) {

            context.state.tcpClient = new TcpClient();
            context.state.tcpClient.start('192.168.1.7', 3000)
            context.state.tcpClient.onData = (data) => {
                console.log("Data from TCP client: ", data);
            };
            context.state.tcpClient.onError = (id, message) => {
                console.log("TCP client error for action #", id, ": ", message);
            };
            context.state.tcpClient.onFinished = (id) => {
                console.log("TCP client finished action #: ", id);
            };

        },
        socket_close(context) {
            context.state.tcpClient.stop();
        }
    }
});