import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './router/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router: router
});
