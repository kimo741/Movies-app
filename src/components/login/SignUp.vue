<template>
  <q-form @submit="signUp" @reset="onReset" class="q-gutter-md">
    <div class="text-h3 text-center q-py-md">SignUp</div>
    <!-- name -->
    <q-input
      filled
      v-model="user.name"
      label="Your Name *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <!-- email -->
    <q-input
      filled
      v-model="user.email"
      label="Your email *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <!-- password -->
    <q-input
      v-model="user.password"
      :rules="[
        (val) => (val !== null && val !== '') || 'Please type your Password',
      ]"
      :type="isPwd ? 'password' : 'text'"
      dense
      label="Passwword *"
      lazy-rules
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <div></div>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>
<script>
export default {
  name: "signUp",
  data() {
    return {
      isPwd: true,
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    onReset() {
      this.user.name = null;
      this.user.email = null;
      this.user.password = null;
    },
    signUp() {
      let form = new FormData();
      form.append("name", this.user.name);
      form.append("email", this.user.email);
      form.append("password", this.user.password);
      this.$store.dispatch("Auth/signUp", form).then((res) => {
        this.$q.notify("SignUp successfully");
        //to auto redirect to log in page when sign up
        this.$store.commit("Auth/FORM_DRAWER_OPEN");
        this.onReset();
      });
    },
  },
};
</script>
