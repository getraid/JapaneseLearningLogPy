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
        class="w-4 h-4  bg-red-500 rounded-full flex justify-center items-center float-right"
      >
        <p>-</p>
      </div>
      <div
        class="w-4 h-4 mr-2  bg-red-500 rounded-full flex justify-center items-center float-left text-center cursor-pointer"
        @click="nextCurrentDates(true)"
      >
        <p>⏮</p>
      </div>

      <div
        class="w-4 h-4  bg-red-500 rounded-full flex justify-center items-center float-left text-center cursor-pointer"
        @click="nextCurrentDates()"
      >
        <p>⏭</p>
      </div>
      <br />
    </div>
    <div
      class="bg-jlStackBg mt-10 pt-2 pb-2 rounded-lg z-50  relative lowerShadow px-6 min-w-full"
    >
      <div v-if="currentDates !== null">
        <div v-for="(item, index) in currentDates" :key="index">
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
      itemsPerRow: 7,
      allDates: null,
      currentDates: null,
      currentDatesIndex: 0,
      selectedIndex: null,
    };
  },
  mounted() {
    this.axios.get("/logs").then((response) => {
      this.setupLogs(response);
    });
    // maybe convienient if added on startup?
    // this.AddNewDate();
  },
  computed: {
    dateGroups() {
      if (this.allDates == null) return null;
      return Array.from(
        Array(Math.ceil(this.allDates.length / this.itemsPerRow)).keys()
      );
    },
  },
  methods: {
    ClickDate(index) {
      this.selectedIndex = index;
      this.$emit("selectedItem", this.currentDates[this.selectedIndex]);
    },
    AddNewDate() {
      this.axios.get("/addLog").then((response) => {
        if (response.data == "dateAlreadyExist") return;
        this.setupLogs(response);
        this.currentDatesIndex = 0;
        this.selectedIndex = 0;
        this.fillCurrentDates();
      });
    },

    nextCurrentDates(decrement) {
      var prev = this.currentDatesIndex;
      // prettier-ignore
      this.currentDatesIndex = decrement ? this.currentDatesIndex - 1: this.currentDatesIndex + 1
      // prettier-ignore
      if(this.currentDatesIndex < 0 || this.currentDatesIndex > this.dateGroups.length -1 ){
        this.currentDatesIndex = prev
      }

      this.selectedIndex = 0;
      this.fillCurrentDates();
    },

    fillCurrentDates() {
      for (let i = 0; i < this.dateGroups.length; i++) {
        if (this.currentDatesIndex == i) {
          // prettier-ignore
          var sliced = this.allDates.slice(i * this.itemsPerRow,(i + 1) * this.itemsPerRow);
          this.currentDates = [];
          this.currentDates = sliced;
        }
      }
    },
    setupLogs(response) {
      var convertedDates = [];

      response.data.forEach((element) => {
        var tmpD = Date.parse(element.dateObj.split(", ")[1]);

        element.dateObj = this.timeConverter(tmpD);
        convertedDates.push(element);
      });

      this.allDates = convertedDates;

      this.fillCurrentDates();

      this.selectedIndex = 0;
    },

    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp);
      return a.toLocaleDateString(
        navigator.language || navigator.userLanguage,
        {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
    },
  },
};
</script>

<style></style>
