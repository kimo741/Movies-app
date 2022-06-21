import { api } from "src/boot/axios";
import { Cookies } from "quasar";
const prefix = "category";

const state = {
  cat: "",
};

const mutations = {
  GET_CATEGORY_LIST(state, payload) {
    state.cat = payload;
  },
  ADD_CATEGORY(state, payload) {
    state.cat.push(payload);
  },
  EDIT_CTEGORY(state, payload) {
    let Obj = state.cat.filter((d) => d.id === payload.id);
    Object.assign(Obj[0], payload);
  },
  DELET_CTEGORY(state, payload) {
    let Index = state.cat.findIndex((d) => d.id === payload.id);
    state.cat.splice(Index, 1);
  },
};

const actions = {
  async GetCategoryeList({ commit }, payload) {
    api
      .get(`${prefix}`)
      .then((res) => {
        // console.log(res);
        const data = res.data.message;
        commit("GET_CATEGORY_LIST", data);
      })
      .catch((err) => {
//         if (err.response.data.message == "Unauthenticated.") {
//           Cookies.remove("token");
//         }
      });
  },
  async addCategory({ commit }, payload) {
    api
      .post(`${prefix}`, payload)
      .then((res) => {
        const data = res.data.message;
        commit("ADD_CATEGORY", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateCategory({ commit }, { form, id }) {
    api.post(`${prefix}/${id}`, form).then((res) => {
      const data = res.data.message;
      commit("EDIT_CTEGORY", data);
    });
  },

  async deleteCategory({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_CTEGORY", await payload);
  },
};

const getters = {
  cat: (state) => {
    return state.cat;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
