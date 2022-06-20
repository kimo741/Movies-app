<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="text-center constrain">
        <q-separator vertical inset spaced class="larg-screen-only" />
        <q-toolbar-title class="text-grand-hotel text-bold">
          Movies
        </q-toolbar-title>
        <q-separator vertical inset spaced class="larg-screen-only" />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <!-- <q-toolbar-title></q-toolbar-title> -->
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "auth",
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
