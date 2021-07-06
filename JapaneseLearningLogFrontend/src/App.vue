<template>
  <div id="app">
    <StartPage></StartPage>
  </div>
</template>

<script>
import StartPage from "./pages/index";
export default {
  name: "App",
  components: { StartPage },
  data() {
    return {
      output: ""
    };
  },
  mounted() {
    this.axios.get("http://localhost:5000/commands").then(response => {
      console.log(response.data);
      this.output = response.data;
    });
  }
};
</script>

<style></style>
