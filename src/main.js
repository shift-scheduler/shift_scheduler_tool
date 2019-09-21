import Vue from 'vue'
import App from './App.vue'
import router from './root/router'
import vuetify from './plugins/vuetify';
import VueLogger from 'vuejs-logger';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VueLogger,
  render: h => h(App),
}).$mount('#app')
