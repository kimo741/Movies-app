<template>
  <Transition name="fade">
    <div class="modal-container" @click.self="$emit('closeModal')">
      <div class="modal-content">
        <slot></slot>
        <div class="close-bt" @click="$emit('closeModal')">
          <span class="icon">
            <!-- <span class="line line-1"></span>
            <span class="line line-2"></span> -->
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: "VModal",
  components: {},
  methods: {},
};
</script>
<style lang="scss">
.modal-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  .modal-content {
    transition: 0.8s ease-in-out;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 70%;
    transform: translate(-50%, -50%);
    animation: pop-swirl 0.6s ease forwards;
    visibility: visible;
  }
}
.close-bt {
  width: 20px;
  height: 30px;
  z-index: 100;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  .icon {
    width: 100%;
    height: 3px;
    position: relative;
    display: block;
    .line {
      width: 100%;
      height: 2px;
      position: absolute;
      display: block;
      background-color: rgb(49, 49, 49);
      transition: all 0.6s ease-in-out;
      transform-origin: center;
      &-1 {
        transform: translateY(0) rotate(-45deg);
      }
      &-2 {
        transform: translateY(0) rotate(45deg);
      }
    }
  }
}
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes pop-swirl {
  0% {
    transform: scale(0) rotate(360deg);
  }
  60% {
    transform: scale(0.8) rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
