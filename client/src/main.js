import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css'; 
import router from './router.js';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({ 
  baseURL: 'http://localhost:3000/', 
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
