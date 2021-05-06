import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import goodscate from "./modules/goodscate";
import goodsspecs from "./modules/goodsspecs";
import goods from "./modules/goods";
import banner from "./modules/banner";
import member from "./modules/member";
import seck from "./modules/seck";
export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    CHANGE_USER(state, payload) {
      if (payload) {
        state.userInfo = payload;
        sessionStorage.setItem("userInfo", JSON.stringify(payload));
      } else {
        //移除存储
        sessionStorage.removeItem("userInfo");
      }
    },
  },
  actions: {
    changeUserAction({ commit }, payload) {
      commit("CHANGE_USER", payload);
    },
  },
  modules: {
    goodscate,
    goodsspecs,
    goods,
    banner,
    member,
    seck,
  },
});
