// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'

Vue.component('chart',ECharts)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */

router.beforeEach((to,from,next) =>{
  if(to.path == '/login'){
    sessionStorage.removeItem('user');
  }
  let user = sessionStorage.getItem('user');
  if(!user && to.path !='/login'){
    next({ path: '/login' })
  }else{
    next()
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
