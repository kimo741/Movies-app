<template>
  <q-page>
    <div class="q-pa-md" style="margin: auto; max-width: 400px">
      <sign-up v-show="signUpTogle" />
      <sign-in v-show="!signUpTogle" />
      <q-toggle v-model="signUpTogle" label="sign up !" size="lg" />
    </div>
  </q-page>
</template>

<script>
import SignIn from "src/components/login/SignIn.vue";
import SignUp from "src/components/login/SignUp.vue";
export default {
  name: "logIn",
  components: { SignIn, SignUp },
  data() {
    return {
      // signUpToggle: false,
    };
  },
  computed: {
    // toggle button for redirect from sign in to sign up
    signUpTogle: {
      get() {
        return this.$store.getters["Auth/signUpToggle"];
      },
      set() {
        this.$store.commit("Auth/FORM_DRAWER_OPEN");
      },
    },
  },
};
</script>
