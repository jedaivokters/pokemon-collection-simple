import Store from "@/services/store";
import Router from "@/services/router";
import appSetting from "../../app-setting/module";
import app1 from "../../app1/module";

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    initialize({ dispatch }) {
      console.info("System initializing...");
      console.info("System initialized.");
      dispatch("initializeModule", appSetting);
      dispatch("initializeModule", app1);
    },
    initializeModule({ dispatch }, module) {
      Store.registerModule(module.name, module.store);
      Router.addRoutes(module.routes);
      dispatch(module.name + "/initialize", null, { root: true });
    },
  },
};
