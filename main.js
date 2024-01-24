import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'
import store from './store'
import {initRequest} from './util/request'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
initRequest(app)
app.use(store)
app.use(uviewPlus)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  initRequest(app)
  app.use(store)
  app.use(uviewPlus)
  return {
    app
  }
}
// #endif