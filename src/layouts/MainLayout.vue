<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="text-center constrain">
        <q-btn
          class="larg-screen-only q-mr-sm"
          to="/category"
          icon="eva-layers-outline"
          label="Category"
          flat
          round
          size="20px"
          dense
        />
        <q-separator vertical inset spaced class="larg-screen-only" />
        <q-toolbar-title class="text-grand-hotel text-bold">
          Movies
        </q-toolbar-title>
        <q-toolbar-title class="small-screen-only">
          <q-btn
            to="/login"
            icon="eva-log-out-outline"
            flat
            round
            size="20px"
            dense
            @click="logOut"
          />
        </q-toolbar-title>
        <q-separator vertical inset spaced class="larg-screen-only" />
        <q-btn
          class="larg-screen-only"
          to="/"
          icon="eva-home-outline"
          flat
          round
          size="20px"
          dense
        />
        <q-btn
          class="larg-screen-only"
          to="/"
          icon="eva-log-out-outline"
          flat
          round
          size="20px"
          dense
          @click="logOut"
        />
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <!-- <q-toolbar-title></q-toolbar-title> -->
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" name="Home" icon="eva-home-outline" />
        <q-route-tab to="/category" name="category" icon="eva-layers-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Cookies } from "quasar";
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !leftDrawerOpen;
    },
    logOut() {
      Cookies.remove("token");
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="scss">
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 77px;
  }
}
.q-toolbar__title {
  font-size: 30px;
  text-align: left;

  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
.q-footer {
  .q-tab__icon {
    font-size: 30px;
  }
}
</style>
