<template>
  <div id="app" class="defaultFont min-h-screen bg-jlBase">
    <StartPage></StartPage>
  </div>
</template>

<script>
import StartPage from "./pages/index";
export default {
  name: "App",
  components: { StartPage },
  data() {
    return {};
  },
};
</script>

<style>
.defaultFont {
  font-family: "Open Sans", Arial, sans-serif;
}
</style>
