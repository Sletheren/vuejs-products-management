<template>
  <div id="app">
    <header>
      <h1>Products Management</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./styles/theme.scss";

header {
  background-color: $color-yellow-dark;
  padding: 30px;
  color: $color-black;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 900;
    font-size: 40px;
    line-height: 40px;
    text-align: center;
  }
}
main {
  padding: 15px;
  @include desktop {
    padding: 30px;
    max-width: 900px;
  }
  margin: auto;
}
</style>
