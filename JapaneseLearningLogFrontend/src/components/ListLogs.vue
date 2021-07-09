<template>
  <div>
    <div v-for="(item, index) in output" :key="index">
      <div
        tabindex="0"
        class="bg-orange-100 hover:bg-orange-300   focus:bg-orange-500 py-2 my-1 text-center cursor-pointer"
        :class="selectedIndex == index ? 'bg-orange-500' : ''"
        @click="selectedIndex = index"
        @keyup.tab="selectedIndex = index"
      >
        {{ item.dateObj }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: "",
      selectedIndex: null,
    };
  },
  mounted() {
    this.axios.get("/logs").then((response) => {
      console.log(response.data);
      this.output = response.data;
    });
  },
};
</script>

<style></style>
