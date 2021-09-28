import { BootstrapVue } from "bootstrap-vue";
import { Vue2Storage } from "vue2-storage";
import Vue from "vue";
import vueDebounce from "vue-debounce";
import Pagination from "vue-pagination-2";
import VueConfirmDialog from "vue-confirm-dialog";

import BeeGridTable from "beegridtable";
import BeeLocale from "beegridtable/src/locale"; //default English

import 'beegridtable/dist/styles/beegridtable.css';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(BeeGridTable, {
  locale:BeeLocale,
  capture: true,
});

Vue.use(VueConfirmDialog);
Vue.use(BootstrapVue);
Vue.use(vueDebounce);
Vue.use(Vue2Storage);
Vue.use(VueToast);

Vue.component("vue-confirm-dialog", VueConfirmDialog.default);
Vue.component("pagination", Pagination);

import "./assets/scss/custom.scss";

import Router from "./services/router";
import Store from "./services/store";
import App from "./App.vue";
import system from "./modules/system/module";
import i18n from "./i18n";

/* Initialize System Module */
Store.registerModule("system", system.store);
Router.addRoutes(system.routes);
Store.dispatch("system/initialize", null, { root: true });

Vue.config.productionTip = false;

export const eventBus = new Vue();
new Vue({
  // eslint-disable-line no-new
  el: "#app",
  template: "<App/>",
  router: Router,
  store: Store,
  i18n,
  render: (h) => h(App),
});
