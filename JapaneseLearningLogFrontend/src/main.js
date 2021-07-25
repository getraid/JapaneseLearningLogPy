import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "@/assets/css/tailwind.css";
import "@/assets/css/general.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.prototype.$eventbus = new Vue(); // Global event bus

// Switch urls between build / dev

if (process.env.NODE_ENV != "production") {
  // dev base url
  const baseUrl = "http://localhost:5000";

  if (typeof baseUrl !== "undefined") {
    Vue.axios.defaults.baseURL = baseUrl;
    Vue.axios.defaults.port = 5000;
  }
}

new Vue({
  render: h => h(App)
}).$mount("#app");
