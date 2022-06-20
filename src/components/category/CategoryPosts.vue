<template>
  <div>
    <div v-if="moveisByCategory" class="row justify-around items-center">
      <!-- {{ moveisByCategory }} -->
      <q-card
        class="card-posts col-5 q-mb-lg q-ma-auto"
        flat
        bordered
        v-for="movie in moveisByCategory"
        :key="movie.id"
      >
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-center">
              {{ movie.name }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator />
        <q-img
          class="col image-size"
          :src="'https://test-api.storexweb.com/' + movie.image"
        />
        <q-item-section>
          <q-item-label class="text-start" caption>
            <div class="text-p">
              {{ movie.description }}
            </div>
          </q-item-label>
        </q-item-section>
      </q-card>
    </div>
    <div class="relative" v-else>
      <div class="text-h2 handel-null q-pt-lg">movies not found</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryToedit: "",
      formPageTtitel: "",
    };
  },
  computed: {
    moveisByCategory() {
      return this.$store.getters["Movies/moveisByCat"];
    },
  },
  components: {},
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
.handel-null {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: $grey-9;
}
.image-size {
  width: 100%;
  max-height: 300px !important;
}
</style>
