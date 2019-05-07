import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dateFilter from '@/filters/date'
import Vuelidate from 'vuelidate'
import 'nprogress/nprogress.css'
import axios from 'axios'

Vue.use(Vuelidate)
// axios.get('/static/config.json').then(response => {
//   axios.defaults.baseURL = response.data.baseUrl
// })

Vue.filter('date', dateFilter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')