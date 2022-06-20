<template>
  <div :style="'font-size: ' + fontSize " :calss="className" class="text-center q-pa-md">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    fontSize: {
      type: String,
      default: '0.6rem'
    },
    text: {
      type: String,
      default: 'Don\'t forget to add info text'
    },
    className: {
      type: String,
      default: 'text-grey-6'
    }
  }
}
</script>
<style>


</style>
