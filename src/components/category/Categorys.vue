<template>
  <q-page>
    <div class="constrain q-pt-lg">
      <div class="row justify-between q-py-lg">
        <div>
          <!-- dropdown to sellect category -->
          <q-btn-dropdown
            color="primary"
            :label="catName ? `${catName}` : 'select Category'"
            outline
          >
            <q-list class="q-my-lg">
              <q-item
                class="q-ma-auto"
                v-for="(cat, i) in category"
                :key="i"
                clickable
                v-close-popup
                @click="selectCat(cat)"
              >
                <q-item-section>
                  <q-item-label class="row justify-end"
                    >{{ cat.name }}
                    <!-- button to edit  -->
                    <q-btn
                      @click="editeCategory(cat)"
                      size="sm"
                      color="green"
                      icon="edit"
                      class="zindex-mx"
                      flat
                    />
                    <!-- button to add  -->

                    <q-btn
                      @click="deleteCategory(cat)"
                      class="zindex-mx"
                      color="red"
                      size="sm"
                      icon="delete"
                      flat
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="text-h4">Sellect Category</div>
      </div>
      <q-separator />
      <div class="row justify-between q-my-lg">
        <q-btn @click="addCategory" color="info" icon="add" size="md" />
        <div class="text-h4">Add Category</div>
      </div>
      <drawer>
        <template #form-header>
          <div class="text-h3">
            <!-- title for form to toggle betwwen add and edit -->
            {{ formPageTtitel }}
          </div>
        </template>

        <template #form-content>
          <!-- categoryToEdit data of selected category t eddite   -->
          <category-form :catToEdit="categoryToEdit"></category-form>
        </template>
      </drawer>
      <ConfirmDell
        @dell="confDel"
        @closeconfirm="closeconfirm"
        v-show="confirmDelliding"
      />
      <div class="q-py-lg">
        <CategoryPosts />
      </div>
    </div>
  </q-page>
</template>
<script>
import CategoryForm from "./CategoryForm.vue";
import Drawer from "../Ui/drawer.vue";
import CategoryPosts from "./CategoryPosts.vue";
import ConfirmDell from "../Ui/ConfirmDell.vue";
export default {
  components: { CategoryPosts, ConfirmDell, Drawer, CategoryForm },
  name: "categorys",
  data() {
    return {
      catName: "",
      confirmDelliding: false,
      idForDeleting: "",
      formPageTtitel: "",
      categoryToEdit: "",
    };
  },
  computed: {
    category() {
      return this.$store.getters["Category/cat"];
    },
  },
  methods: {
    confDel() {
      this.$store
        .dispatch("Category/deleteCategory", this.idForDeleting)
        .then(() => {
          this.confirmDelliding = false;
        });
    },
    selectCat(cat) {
      this.catName = cat.name;
      this.$store.dispatch("Movies/moviesByCategory", cat.id);
    },
    getCategoryList() {
      this.$store.dispatch("Category/GetCategoryeList");
    },
    addCategory() {
      this.$store.commit("Auth/OPEN_FOEM_DEAWER");
      this.formPageTtitel = "Add Category";
      this.categoryToEdit = "";
    },
    editeCategory(cat) {
      this.$store.commit("Auth/OPEN_FOEM_DEAWER");
      this.formPageTtitel = "Edit Categry";
      this.categoryToEdit = cat;
    },
    deleteCategory(cat) {
      this.confirmDelliding = true;
      this.idForDeleting = cat.id;
    },
    closeconfirm() {
      this.confirmDelliding = false;
    },
  },
  created() {
    this.getCategoryList();
  },
};
</script>
<style>
.zindex-mx {
  z-index: 100;
}
</style>
