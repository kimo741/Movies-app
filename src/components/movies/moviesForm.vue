<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center">
      <q-form
        text-center
        @submit="submit"
        class="q-gutter-md edit-width full-width"
      >
        <div class="row full-width justify-between">
          <!-- movie Name -->
          <q-input
            class="col-12 col-sm-5 q-pb-md q-py-md"
            dense
            lazy-rules
            v-model="movies.name"
            label="Name *"
            :rules="[
              (val) =>
                (val && val.length > 3) || 'Please type a real Movie Name',
            ]"
          />
          <q-space />
          <!-- movie description -->
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model="movies.description"
            label="Description *"
            :rules="[
              (val) =>
                (val && val.length > 15) ||
                'Please type a real Description for this movie',
            ]"
          />
          <!-- data base in missing collection for select category -->
        </div>
        <q-space />
        <!-- movie UploadImage -->
        <div class="col-12">
          <div class="image-upload q-my-lg">
            <UploadImage
              :imgSrc="movies.image != '' ? movies.image : 'placeholder.jpg'"
              @uploadFile="uploadFile"
            />
          </div>
        </div>
        <div style="bottom: 15px" class="fixed-bottom">
          <q-separator class="q-mb-md" />
          <div align="end" class="q-px-lg q-gutter-x-md">
            <q-btn
              color="red"
              label="cancel"
              outline
              @click="$store.state.Auth.formDrawerOpen = false"
            />
            <q-btn color="secondary" label="save" @click="submit" />
          </div>
        </div>
        <!-- loading when submit  -->
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-form>
      <div class="q-pa-md">
        <q-btn-dropdown
          color="primary"
          :label="catName ? `${catName}` : 'select Category'"
          outline
        >
          <q-list class="q-my-lg">
            <!-- i created it btn as dropdown list because data base not give me apis to make it   selected -->
            <q-item
              class="q-ma-auto"
              v-for="(cat, i) in category"
              :key="i"
              clickable
              v-close-popup
              @click="selectCat(cat)"
            >
              <q-item-section>
                <q-item-label>{{ cat.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import UploadImage from "src/components/Ui/more-info/upload-image.vue";

export default {
  props: ["movieToEdit"],
  components: { UploadImage },
  data() {
    return {
      visible: false,
      movies: {
        name: "",
        description: "",
        image: null,
        category_id: "",
      },
      catName: "",
    };
  },
  computed: {
    category() {
      return this.$store.getters["Category/cat"];
    },
  },
  watch: {
    // handel edit fom
    movieToEdit(val) {
      if (val.id) {
        Object.assign(this.movies, val);
        this.movies.image =
          "https://test-api.storexweb.com/" + this.movies.image;
      } else {
        this.movies = {
          name: "",
          description: "",
          image: null,
          category_id: "",
        };
      }
    },
  },
  methods: {
    toggleFormDrawer() {
      this.$store.commit("Auth/OPEN_FOEM_DEAWER");
    },
    getCategoryList() {
      this.$store.dispatch("Category/GetCategoryeList");
    },
    //get proberty from category
    selectCat(cat) {
      this.movies.category_id = cat.id;
      this.catName = cat.name;
    },
    uploadFile(e) {
      this.movies.image = e;
    },
    //handel add
    async addMovie(form) {
      this.$store.dispatch("Movies/addMovies", await form).then(() => {
        this.movies = "";
        this.visible = false;
        this.toggleFormDrawer();
      });
    },
    //handel edite
    async editMovie(form) {
      form.append("_method", "put");
      this.$store
        .dispatch({
          type: "Movies/updateMovie",
          form: await form,
          id: await this.movies.id,
        })
        .then(() => {
          this.visible = false;
          this.movies = "";
          this.toggleFormDrawer();
        });
      this.toggleFormDrawer();
    },
    async submit() {
      this.visible = true;
      const form = new FormData();
      form.append("name", this.movies.name);
      form.append("description", this.movies.description);
      form.append("category_id", this.movies.category_id);
      form.append("image", this.movies.image);
      //check if movie have id do update if not have id will add it
      if (this.movies.id) this.editMovie(form);
      this.addMovie(form);
    },
  },
  created() {
    this.getCategoryList();
  },
};
</script>
<style lang="scss" scoped>
.form {
  text-align: center;
  margin: auto !important;
  width: 100% !important;
  text-align: center;
}
.edit-width {
  .select {
    @media (max-width: $breakpoint-sm-max) {
    }
  }
  width: 100% !important;
  margin: auto !important;
}
</style>
