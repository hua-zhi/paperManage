import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import axios from "@/plugins/axios";
import router from "@/router";
Vue.use(Vuex);
// 把role的第四位当作角色值
const ROLEINDEX = 4;
const state = {
  role: 0,
  menuList: [],
  exception: { message: null }
};
const mutations = {
  [types.SET_ROLE](state, role) {
    state.role = role;
    console.log(typeof state.role);
  },
  [types.SHOW_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.SET_MENULIST](state, data) {
    state.menuList = data;
  }
};
const getters = {
  permission: leval => leval.some(l => l == state.role)
};
const actions = {
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    console.log(resp);
    let token = resp.headers.Authorization;
    let role = parseInt(resp.data.data.role[ROLEINDEX - 1]);
    commit(types.SET_ROLE, role);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    router.push("/home");
  }
};
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
});
