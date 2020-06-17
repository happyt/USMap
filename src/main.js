import Vue from 'vue'
import App from './App.vue'
import svgJs from './plugins/vueSvgPlugin'
import Notifications from 'vue-notification'

Vue.use(svgJs)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
