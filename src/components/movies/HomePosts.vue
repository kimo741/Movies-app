<template>
  <div class="row justify-center">
    <div class="row justify-start">
      <q-btn
        @click="addMovie"
        class="q-ma-auto"
        icon="add"
        color="info"
        size="md"
      />
    </div>
    <div class="row justify-center items-center">
      <q-card
        class="card-posts col-5 q-my-md q-ma-md"
        flat
        bordered
        v-for="movie in movies"
        :key="movie.id"
      >
        <q-card-section style="height: 500px; overflow: hidden">
          <q-img
            class="col hover-eff full-width cursor-pointer"
            :src="'https://test-api.storexweb.com/' + movie.image"
            @click="showMovie(movie)"
          />
        </q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-center">
              {{ movie.name }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item-section>
          <q-item-label class="text-start" caption>
            <div class="text-p">
              {{ movie.description }}
            </div>
          </q-item-label>
        </q-item-section>
        <q-card-actions align="right">
          <q-btn
            icon="eva-eye-outline"
            flat
            size="md"
            color="grey-10"
            @click="showMovie(movie)"
          ></q-btn>
          <q-btn
            icon="edit"
            flat
            size="md"
            color="info"
            @click="editeMovie(movie)"
          ></q-btn>
          <q-btn
            icon="delete"
            flat
            size="md"
            color="red-4"
            @click="deleteMovie(movie.id)"
          ></q-btn>
        </q-card-actions>
      </q-card>
      <!-- right drawer have form component to add or edit  -->
      <drawer>
        <template #form-header>
          <div class="text-h3">
            {{ formPageTtitel }}
          </div>
        </template>

        <template #form-content>
          <movies-form :movieToEdit="movieToEdit"></movies-form>
        </template>
      </drawer>
      <div class="">
        <confirm-dell
          @dell="confDel"
          @closeconfirm="closeconfirm"
          v-show="confirmDelliding"
        >
          <template>
            <div class="text-h5">Are you shour you want delet this movie ?</div>
          </template>
        </confirm-dell>
        <!-- v-show="ShowModal" -->
        <v-model v-if="toggleModal" @closeModal="closeModal">
          <template>
            <div>
              <show-movie></show-movie>
            </div>
          </template>
        </v-model>
      </div>
    </div>
  </div>
</template>
<script>
import Drawer from "src/components/Ui/drawer.vue";
import MoviesForm from "src/components/movies/moviesForm.vue";
import ConfirmDell from "../Ui/ConfirmDell.vue";
import VModel from "../Ui/VModel.vue";
import ShowMovie from "./showMovie.vue";
undefined;
export default {
  name: "homePosts",
  components: { Drawer, MoviesForm, ConfirmDell, VModel, ShowMovie },
  data() {
    return {
      movieToEdit: "",
      formPageTtitel: "",
      confirmDelliding: false,
      idForDeleting: "",
      toggleModal: false,
    };
  },
  computed: {
    movies() {
      return this.$store.getters["Movies/movies"];
    },
  },
  methods: {
    addMovie() {
      this.$store.commit("Auth/OPEN_FOEM_DEAWER");
      this.formPageTtitel = "Add Movie";
      this.movieToEdit = "";
    },
    editeMovie(movie) {
      this.$store.commit("Auth/OPEN_FOEM_DEAWER");
      this.formPageTtitel = "Edit Movie";
      this.movieToEdit = movie;
    },
    deleteMovie(id) {
      this.confirmDelliding = true;
      this.idForDeleting = id;
    },
    confDel() {
      this.$store
        .dispatch("Movies/deleteMovie", this.idForDeleting)
        .then(() => {
          this.confirmDelliding = false;
        });
    },
    closeconfirm() {
      this.confirmDelliding = false;
    },
    showMovie(mov) {
      this.toggleModal = true;
      this.$store.dispatch("Movies/showMovies", mov.id);
    },
    closeModal() {
      this.toggleModal = false;
    },
  },
};
</script>
<style lang="scss">
.card-posts {
  width: 25%;
  height: 300px;
  text-align: satrt;
  gap: 100px;
  .q-img {
    min-height: 200px;
  }
  .text-start {
    max-height: 60px;
    overflow: auto;
    padding: 10px;
  }
  .relative {
    position: relative;
  }
}
</style>
