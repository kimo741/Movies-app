<template>
  <q-page class="constrain q-pa-md">
    <div>
      <HomePosts />
    </div>
    <!-- <h2>Page Home</h2> -->
  </q-page>
</template>

<script>
import HomePosts from "../components/movies/HomePosts.vue";

export default {
  name: "pageHome",
  components: { HomePosts },

  methods: {
    getMoves() {
      this.$store.dispatch("Movies/GetMoviesList");
    },
  },

  created() {
    this.getMoves();
  },
};
</script>
