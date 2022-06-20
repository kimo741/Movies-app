import { Cookies, Notify } from "quasar";
import { api } from "src/boot/axios";
const prefix = "movies";

const state = {
  movies: "",
  moveisByCat: "",
  show: "",
};

const mutations = {
  GET_MOVIES_LIST(state, payload) {
    state.movies = payload;
  },
  ADD_MOVIES(state, payload) {
    state.movies.unshift(payload);
  },
  EDIT_MOVIE(state, payload) {
    let Obj = state.movies.filter((d) => d.id === payload.id);
    Object.assign(Obj[0], payload);
  },
  DELET_MOVIE(state, payload) {
    let Index = state.movies.findIndex((d) => d.id === payload.id);
    state.movies.splice(Index, 1);
  },
  MOVIES_BY_CATEGORY(state, payload) {
    state.moveisByCat = payload;
  },
  SHOW_MOVIES(state, payload) {
    state.show = payload;
  },
};

const actions = {
  async GetMoviesList({ commit }, payload) {
    api
      .get(`${prefix}`)
      .then((res) => {
        const data = res.data.message;
        commit("GET_MOVIES_LIST", data);
      })
      .catch((err) => {
        if (err.response.data.message == "Unauthenticated.") {
          Cookies.remove("token");
          this.$router.push("/login");
        }
      });
  },
  async addMovies({ commit }, payload) {
    api
      .post(`${prefix}`, payload)
      .then((res) => {
        const data = res.data.message;
        commit("ADD_MOVIES", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateMovie({ commit }, { form, id }) {
    // console.log(form);
    api.post(`${prefix}/${id}`, form).then((res) => {
      const data = res.data.message;
      commit("EDIT_MOVIE", data);
    });
  },

  async deleteMovie({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_MOVIE", await payload);
  },
  async moviesByCategory({ commit }, payload) {
    api.get(`moviesByCategory/${payload}`).then((res) => {
      const data = res.data.message;
      commit("MOVIES_BY_CATEGORY", data);
    });
  },
  async showMovies({ commit }, id) {
    api.get(`${prefix}/${id}`).then((res) => {
      const data = res.data.message;
      commit("SHOW_MOVIES", data);
    });
  },
};

const getters = {
  movies: (state) => {
    return state.movies;
  },
  moveisByCat: (state) => {
    return state.moveisByCat;
  },
  show: (state) => {
    return state.show;
  },
};
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
