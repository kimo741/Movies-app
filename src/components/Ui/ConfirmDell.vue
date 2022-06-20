<template>
  <Transition name="fade">
    <div class="modal-container" @click.self="closeconfirm">
      <div class="modal-content">
        <div class="header-ask">
          <h3>
            <slot></slot>
          </h3>
        </div>
        <div class="but-ask">
          <q-btn @click="$emit('dell')" color="red" size="md"> Dell</q-btn>
          <q-btn
            class="but-ask-child"
            size="md"
            flat
            @click="$emit('closeconfirm')"
            >Close</q-btn
          >
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: "ConfirmDel",
  components: {},

  computed: {},
  methods: {},
  //   deleteCategory() {
  //     this.$emit("delet");
  //   },
};
</script>
<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  .modal-content {
    animation: none;
    background-color: #ffffffec;
    width: 50%;
    height: max-content;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;

    // display: flex;
    .header-ask {
      display: block;
      &:first-child {
        font-size: 14px;
      }
    }
    .but-ask {
      display: flex;
      // flex-direction: row-reverse;
      justify-content: flex-start;
      &-child {
        margin-left: 20px;
      }
    }
  }
}
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
