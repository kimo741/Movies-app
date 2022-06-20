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
            class="col-12 q-pb-md q-py-md"
            dense
            lazy-rules
            v-model="categorey.name"
            label="Name *"
            :rules="[
              (val) => (val && val.length > 3) || 'Please type category name',
            ]"
          />
        </div>
        <q-space />
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
    </div>
  </div>
</template>
<script>
export default {
  props: ["catToEdit"],
  data() {
    return {
      visible: false,
      categorey: {
        name: "",
      },
    };
  },
  watch: {
    // handel edit fom
    catToEdit(val) {
      if (val.id) {
        Object.assign(this.categorey, val);
      } else {
        this.categorey = {
          name: "",
        };
      }
    },
  },
  methods: {
    toggleFormDrawer() {
      this.$store.commit("Auth/OPEN_FOEM_DEAWER");
    },
    //handel add
    async addCategory(form) {
      this.$store.dispatch("Category/addCategory", await form).then(() => {
        this.categorey = "";
        this.visible = false;
        this.toggleFormDrawer();
      });
    },
    //handel edite
    async editCategory(form) {
      form.append("_method", "put");
      this.$store
        .dispatch({
          type: "Category/updateCategory",
          form: await form,
          id: await this.categorey.id,
        })
        .then(() => {
          this.visible = false;
          this.categorey = "";
          this.toggleFormDrawer();
        });
      this.toggleFormDrawer();
    },
    async submit() {
      this.visible = true;
      const form = new FormData();
      form.append("name", this.categorey.name);
      //check if movie have id do update if not have id will add it
      if (this.categorey.id) this.editCategory(form);
      this.addCategory(form);
    },
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
