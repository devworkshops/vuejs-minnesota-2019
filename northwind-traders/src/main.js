import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dateFilter from '@/filters/date'

Vue.filter('date', dateFilter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
