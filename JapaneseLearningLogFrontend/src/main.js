import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import "@/assets/css/tailwind.css";
import "@/assets/css/general.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.component("vue-bootstrap-typeahead", VueBootstrapTypeahead);

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
/** Vue Filters Start */
Vue.filter("truncate", function(text, length, suffix) {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
});
/** Vue Filters End */
new Vue({
  render: (h) => h(App),
}).$mount("#app");
