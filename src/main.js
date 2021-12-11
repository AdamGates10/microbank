import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./vuetify/vuetify";
import axios from "axios";

import VueCompositionApi from "@vue/composition-api";
// axios.defaults.baseURL = "http://localhost:8000/api";

import { ValidationProvider, ValidationObserver } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.use(VueCompositionApi);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
import moment from "moment";
Vue.prototype.moment = moment;
store.dispatch("me").then(() => {
	new Vue({
		router,
		vuetify,
		store,
		render: (h) => h(App),
	}).$mount("#app");
});
