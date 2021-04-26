import Vue from 'vue'
import App from './App.vue'
import Install from './utils/install';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

import Vconsole from 'vconsole';

new Vconsole();
Vue.use(Install);
Vue.use(Element);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
