<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <div class="text-h3 text-center q-py-md">Sign In</div>
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

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>
<script>
export default {
  name: "signIn",
  data() {
    return {
      isPwd: true,
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    onSubmit() {
      let form = new FormData();
      form.append("email", this.user.email);
      form.append("password", this.user.password);
      this.$store
        .dispatch("Auth/signIn", form)
        .then((res) => {
          this.$q.notify({
            color: "blue",
            textColor: "white",
            icon: "eva-log-in-outline",
            message: "success login",
          });
        })
        .catch((err) => {
          this.$q.notify({
            color: "blue",
            textColor: "white",
            icon: "warning",
            message: "login filde , check your in inpute",
          });
        });
      this.$router.push("/");
    },
    onReset() {
      this.user.email = null;
      this.user.password = null;
    },
  },
};
</script>
