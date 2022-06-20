<template>
  <div class="row justify-between">
    <div class="col-4">
      <q-img :src="'https://test-api.storexweb.com/' + showMove.image" />
    </div>
    <div class="col-6">
      <div class="text-h3 q-py-lg text-bold">{{ showMove.name }}</div>
      <q-separator />
      <div class="q-py-md">
        <span class="text-h5 text-blue-grey-14"> Category / </span>
        <span class="text-h6 text-bold"> {{ showMove.category.name }} </span>
      </div>
      <q-separator />
      <div class="q-py-md">
        <span class="text-h5 text-blue-grey-14"> Description / </span>
        <span class="text-b"> {{ showMove.description }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    showMove() {
      return this.$store.getters["Movies/show"];
    },
  },
};
</script>

<style></style>
