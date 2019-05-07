import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dateFilter from '@/filters/date'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import 'nprogress/nprogress.css'
import { store } from './store'
import axios from 'axios'

Vue.use(BootstrapVue)

Vue.use(Vuelidate)

Vue.filter('date', dateFilter)

Vue.config.productionTip = false

axios.get('/static/config.json').then(response => {
  axios.defaults.baseURL = response.data.baseUrl
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
