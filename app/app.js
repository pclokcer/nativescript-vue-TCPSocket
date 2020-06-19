import Vue from "nativescript-vue";
import store from './store'

import Home from "./pages/Home";

new Vue({
    store,
    render: h => h('frame', [h(Home)]),
}).$start();
