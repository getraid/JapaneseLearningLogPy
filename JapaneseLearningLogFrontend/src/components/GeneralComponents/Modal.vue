<template>
  <div>
    <div
      v-if="modalVisible"
      class="bg-jlStackBg shadow-2xl lg:w-64 w-4/5 lg:h-24 h-32  left-0 top-0 mx-5 my-16  fixed z-50 rounded-lg"
    >
      <div
        class="bg-red-500 float-right w-6 h-6 text-center cursor-pointer rounded-full mr-1 mt-1"
        @click="modalVisible = !modalVisible"
      >
        <p>X</p>
      </div>
      <div class="p-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false
    };
  }
};
</script>

<style>
.topPos {
  left: 0;
  top: 0;
  margin: 5rem 2rem;
}
</style>
