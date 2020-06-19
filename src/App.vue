<template>
  <div id="app">
    <notifications group="map" class="app-style" />
    <Home msg="Welcome to App" />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-style .notification-title {
  color: black;
  font-size: 20px;
}
.app-style .success {
  /*
  Style for specific type of notification, will be applied when you
  call notification with "type" parameter:
  this.$notify({ type: 'my-type', message: 'Foo' })
  */
  color: rgb(30, 8, 92);
  font-size: 16px;
}
</style>
