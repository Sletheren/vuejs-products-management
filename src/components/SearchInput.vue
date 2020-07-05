<template>
  <div class="search-wrapper">
    <label for="search">
      <font-awesome-icon icon="search" />
    </label>
    <input
      id="search"
      name="search"
      placeholder="Search for a product..."
      :value="value"
      @input="onChange"
    />
    <button id="clear-search" class="reset-btn" @click="clearSearch">
      <font-awesome-icon icon="times-circle" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    onChange: function(event) {
      this.$emit("input", event.target.value);
    },
    clearSearch: function() {
      this.$emit("input", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  display: block;
  width: 100%;
  position: relative;
  font-size: 18px;
  margin: 20px 0;
  > label {
    position: absolute;
    left: 15px;
    top: 10px;
    margin: 0;
    display: inline-block;
    color: $color-white;
  }
  > #search {
    display: block;
    background-color: $color-dark-light;
    color: $color-white;
    border: 1px solid $color-dark;
    outline: none;
    padding: 10px 50px;
    border-radius: 23px;
    height: 40px;
    width: 100%;
    line-height: 1.3;
  }
  > #clear-search {
    position: absolute;
    right: 10px;
    top: 8px;
    color: $color-white;
    font-size: 20px;
  }
}
</style>
