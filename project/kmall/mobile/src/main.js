import Vue from 'vue';
import App from './App.vue';
import './assets/css/common.css';
import './plugins/vant';
import store from './store';
import router from './router';
//引入过滤器
import filters from './filters/';

Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')