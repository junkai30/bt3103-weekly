import Vue from 'vue'
import App from './App.vue'
import QuantityCounter from './components/QuantityCounter.vue'
import Routes from './routes.js'

//Step 1  -- import and use VueRouter
import VueRouter from 'vue-router'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('quantityCounter', QuantityCounter)

//Step 3 -- Register Routes
const myRouter = new VueRouter({
  routes:Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
