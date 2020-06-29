import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// reset & common css
import "./styles/index.scss";

// permission control
import "./permission";

// element
import "./plugins/element";

// 自动注册全局的组件
import "@/components/global/index";

// request
import * as api from "@/api";
Vue.prototype.$api = api;

// md5 加密
import md5 from "js-md5";
Vue.prototype.$md5 = md5;

// 全局过滤器
// import * as filterTool from "./utils/filter";
// Object.keys(filterTool).forEach(key => {
//   Vue.filter(key, filterTool[key]);
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
