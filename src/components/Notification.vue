<template>
  <div class="notification" :class="type">
    <span class="icon">
      <font-awesome-icon :icon="type==='error' ? 'times' : 'check'" />
    </span>
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: ["message", "type"]
};
</script>

<style lang="scss" scoped>
.notification {
  padding: 10px 20px;
  color: $color-white;
  font-size: 20px;
  border-radius: 20px;
  width: 500px;
  text-align: center;
  margin: auto;
  background-color: $color-gray-light;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  z-index: 10;
  &.success {
    background-color: $color-green;
  }
  &.error {
    background-color: $color-red-light;
  }
  > .message {
    margin-left: 20px;
  }
}
</style>
