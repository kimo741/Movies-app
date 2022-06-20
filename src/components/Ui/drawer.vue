<template>
  <q-drawer
    v-model="$store.state.Auth.formDrawerOpen"
    overlay
    bordered
    side="right"
    content-class="drawer "
    calss="test"
  >
    <div class="form-header q-px-lg q-py-sm row items-center full-width">
      <div class="text-h1 title">
        <slot name="form-header"></slot>
      </div>
      <q-space />
      <q-btn
        icon="eva-arrow-forward-outline "
        @click.native="goBack"
        flat
        round
      />
    </div>
    <q-separator class="full-width" />

    <div class="q-pa-md overflow-auto">
      <slot name="form-content"></slot>
    </div>
  </q-drawer>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    drawer: {
      get(val) {
        return this.$store.state.Auth.formDrawerOpen;
      },
      set(val) {
        return this.$store.state.Auth.formDrawerOpen;
      },
    },
  },
  methods: {
    goBack() {
      // console.log("Close Drower Button is clicked!!!");
      this.$store.commit("Auth/TOGGLE_FOEM_DEAWER");
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.form-header {
  padding-top: 15px;
  user-select: auto;
  position: sticky;
  top: 0;
  background: #fff;
  height: auto;
  z-index: 1000000000000000000;
  .title {
    @media (max-width: $breakpoint-sm-max) {
      font-size: 1.5rem;
    }
    margin-bottom: 0;
  }
}
</style>
