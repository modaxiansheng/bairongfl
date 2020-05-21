import Vue from 'vue';
import iView from 'iview';
import App from './App.vue';
import router from './router/';
import store from './store/';
import './style/index.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import common from '@/common/common'
Vue.prototype.common = common;
// username=2
Vue.prototype.axios = axios
Vue.config.productionTip = false;

Vue.use(iView);

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
