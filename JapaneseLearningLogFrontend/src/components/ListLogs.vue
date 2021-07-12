<template>
  <div class="relative bg-jlStackBg z-10 shadow-xl pb-1  w100 rounded-lg">
    <div
      class="bg-jlBase -mt-8 py-2 px-5 w100 inline-block rounded-lg z-10  absolute upperShadow"
    >
      <div
        class="w-4 h-4 bg-green-400 hover:bg-green-500 rounded-full flex justify-center items-center float-right  text-center cursor-pointer"
        @click="AddNewDate()"
      >
        <p>+</p>
      </div>
      <div
        class="w-4 h-4 mx-2 bg-gray-500 rounded-full flex justify-center items-center float-right text-sm"
      >
        <p>*</p>
      </div>
      <div
        class="w-4 h-4  bg-red-500 rounded-full flex justify-center items-center"
      >
        <p>-</p>
      </div>
      <br />
    </div>
    <div
      class="bg-jlStackBg mt-10 pt-2 px-5 pb-2 rounded-lg z-50  relative lowerShadow"
    >
      <div v-if="output.length !== 0">
        <div v-for="(item, index) in output" :key="index">
          <div
            tabindex="0"
            :class="selectedIndex == index ? 'bg-jlOrange' : 'bg-jlItemBg'"
            class=" hover:bg-orange-300 rounded-lg py-2 my-2 px-5 text-center cursor-pointer"
            @click="ClickDate(index)"
            @keyup.tab="ClickDate(index)"
          >
            {{ item.dateObj }}
          </div>
        </div>
      </div>
      <div v-else>
        No dates exisiting.<br />Please create some by pressing the plus icon
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: null,
      selectedIndex: null,
    };
  },
  mounted() {
    this.axios.get("/logs").then((response) => {
      console.log(response.data);
      this.output = response.data;
      this.selectedIndex = 0;
    });
    // maybe convienient if added on startup?
    // this.AddNewDate();
  },
  methods: {
    ClickDate(index) {
      this.selectedIndex = index;
    },
    AddNewDate() {
      this.axios.get("/addLog").then((response) => {
        if (response.data == "dateAlreadyExist") return;
        console.log(response.data);
        this.output = response.data;
      });
    },
  },
};
</script>

<style></style>
