<template>
  <div class="alert-wrapper">
    <div class="alert-box">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
      <div class="buttons">
        <button id="alert-confirm" class="btn-primary" type="button" @click="onConfirm">Confrim</button>
        <button id="alert-cancel" type="button" @click="onCancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert-box",
  props: {
    title: { type: String, default: () => "Do you confirm?" },
    description: {
      type: String,
      default: () => "Click confirm if you sure about this"
    }
  },
  methods: {
    onConfirm: function() {
      this.$emit("confirm");
    },
    onCancel: function() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color-black, 0.95);
  .alert-box {
    background-color: $color-yellow-dark;
    color: $color-black;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 20px;
    @include desktop {
      width: 400px;
      left: 50%;
      top: 50%;
      transform: translate(-200px, -200px);
    }
    h4 {
      margin: 0 0 10px;
      font-size: 30px;
    }
    p {
      margin: 0 0 10px;
      color: $color-dark;
    }
  }
}
</style>
