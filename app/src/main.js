import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
Vue.use(ElementUI);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Dialog } from 'vant';
Vue.use(Dialog);
import { List } from 'vant';
Vue.use(List);

//设置api 全局变量
import global_ from './Api.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;




Vue.prototype.bus = new Vue;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
