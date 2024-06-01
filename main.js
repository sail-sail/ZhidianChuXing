import App from './App'
import store from './store'
import Util from './common/js/util.js'
import Http from './common/js/http.js'
import Config from './common/js/config.js'

Vue.prototype.$store = store //挂在vue

Vue.prototype.$util = Util;
Vue.prototype.$api = Http;

//常用组件
import loadingCover from '@/components/loading-cover/loading-cover.vue';
Vue.component('loading-cover', loadingCover);

Vue.prototype.$config = Config;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

//导入uview
import uView from "uview-ui";
Vue.use(uView);


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif