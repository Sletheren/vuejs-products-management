<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-btn reset-btn" @click="closeModalPage">
        <font-awesome-icon icon="times" />
      </button>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModalPage: function() {
      this.$router.go(-1);
    }
  }
};
</script>


<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color-black, 0.95);
  .modal-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $color-dark;
    border-radius: 15px;
    overflow: hidden;
    @include desktop {
      width: 600px;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-300px, -300px);
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      color: $color-white;
    }
    .modal-body {
      padding: 20px;
    }
  }
}
</style>
