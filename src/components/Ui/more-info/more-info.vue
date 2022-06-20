<template>
    <div class="more-info inline-block">
      <q-icon :name="icon" :color="color" />
      <q-tooltip :max-width="width" content-class="bg-black text-white text-caption">
        {{ text }}
      </q-tooltip>
    </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '250px'
    },
    text: {
      type: String,
      default: 'Don\'t forget to add info text'
    },
    color: {
      type: String,
      default: 'red'
    },
    icon: {
      type: String,
      default: 'las la-question-circle'
    },
  }
}
</script>
<style>


</style>
