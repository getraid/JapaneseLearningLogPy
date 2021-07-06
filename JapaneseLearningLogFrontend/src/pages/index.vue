<template>
  <div>
    <img class="w-20" alt="Vue logo" src="../assets/logo.png" />
    <p class="bg-yellow-500">Output: {{ output }}</p>
    <div class="flex flex-row">
      <big-button></big-button>
      <big-button></big-button>
      <big-button></big-button>
    </div>
  </div>
</template>

<script>
import BigButton from "../components/BigButton.vue";
export default {
  components: { BigButton }
};
</script>

<style></style>
