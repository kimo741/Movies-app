import { Cookies } from "quasar";
import { api } from "src/boot/axios";
const prefix = "api";

const state = {
  formDrawerOpen: false,
  signUpToggle: false,
};

const mutations = {
  TOGGLE_FOEM_DEAWER(state) {
    state.formDrawerOpen = false;
  },
  OPEN_FOEM_DEAWER(state) {
    state.formDrawerOpen = !state.formDrawerOpen;
  },
  FORM_DRAWER_OPEN() {
    state.signUpToggle = !state.signUpToggle;
  },
};

const actions = {
  async signIn({ commit }, payload) {
    await api
      .post("/login", payload)
      .then((res) => {
        const accToken = res.data.authorisation.token;
        Cookies.set("token", accToken, { expires: "1h 15m" });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async signUp({ commit }, payload) {
    await api
      .post("/register", payload)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  signUpToggle: (state) => {
    return state.signUpToggle;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
