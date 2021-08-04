<template>
  <div class="relative bg-jlStackBg z-10 shadow-xl pb-1  w100 rounded-lg">
    <div
      class="bg-jlBase -mt-8 py-2 px-5 w100 inline-block rounded-lg z-10  absolute upperShadow"
    >
      <div
        class="w-4 h-4 bg-green-500 hover:bg-green-600 rounded-full flex justify-center items-center float-right  text-center cursor-pointer"
        @click="AddNewDate()"
      >
        <PlusIcon size="0.75x" />
      </div>
      <div
        class="w-4 h-4 mx-2 bg-blue-400 hover:bg-blue-500 rounded-full flex justify-center items-center float-right text-sm  text-center cursor-pointer"
        @click="ShowModal()"
      >
        <PencilIcon size="0.75x" />
      </div>
      <div
        class="w-4 h-4  bg-red-400 hover:bg-red-500 rounded-full flex justify-center items-center float-right text-center cursor-pointer"
        @click="DeleteSelectedLog()"
      >
        <XIcon size="0.75x" />
      </div>
      <div
        class="w-4 h-4 mr-2  bg-gray-500 rounded-full flex justify-center items-center float-left text-center cursor-pointer"
        @click="nextCurrentDates(true)"
      >
        <ArrowLeftIcon size="0.75x" />
      </div>

      <div
        class="w-4 h-4  bg-gray-500 rounded-full flex justify-center items-center float-left text-center cursor-pointer"
        @click="nextCurrentDates()"
      >
        <ArrowRightIcon size="0.75x" />
      </div>
      <br />
    </div>

    <div
      class="bg-jlStackBg mt-10 pt-2 pb-2 rounded-lg z-20  relative lowerShadow px-6 min-w-full"
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
    <Modal ref="modDate">
      <date-picker
        class="w-full lg:mt-0 mt-2"
        v-model="time"
        valueType="format"
      ></date-picker>
      <div
        class="cursor-pointer text-center lg:mt-1 mt-4 bg-yellow-200 hover:bg-yellow-500 rounded-md shadow-md"
        @click="SubmitCustomDate()"
      >
        <p>Add date</p>
      </div></Modal
    >
  </div>
</template>

<script>
import Modal from "./GeneralComponents/Modal.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
  PencilIcon,
  PlusIcon
} from "@vue-hero-icons/outline";

export default {
  components: {
    Modal,
    DatePicker,
    ArrowLeftIcon,
    ArrowRightIcon,
    XIcon,
    PencilIcon,
    PlusIcon
  },
  data() {
    return {
      itemsPerRow: 7,
      allDates: null,
      currentDates: null,
      currentDatesIndex: 0,
      selectedIndex: null,
      time: null
    };
  },
  mounted() {
    this.axios.get("/logs").then(response => {
      this.setupLogs(response);
      this.ClickDate(0);
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
    }
  },
  methods: {
    ClickDate(index) {
      this.selectedIndex = index;
      if (this.currentDates != null)
        this.$emit("selectedItem", this.currentDates[this.selectedIndex]);
    },
    AddNewDate() {
      this.axios.get("/addLog").then(response => {
        this.RefreshLogs(response);
      });
    },
    ShowModal() {
      this.$refs.modDate.modalVisible = !this.$refs.modDate.modalVisible;
    },

    SubmitCustomDate() {
      if (this.time == null) {
        return;
      }

      this.axios.get("/addLog?manual=" + this.time).then(response => {
        this.RefreshLogs(response);
      });
    },

    DeleteSelectedLog() {
      this.axios
        .get("/deleteLog?logid=" + this.currentDates[this.selectedIndex].id)
        .then(response => {
          this.RefreshLogs(response);
        });
    },

    RefreshLogs(response) {
      if (response.data == "dateAlreadyExist") return;
      this.setupLogs(response);
      this.currentDatesIndex = 0;
      this.selectedIndex = 0;
      this.fillCurrentDates();
      if (this.currentDates != null)
        this.$emit("selectedItem", this.currentDates[this.selectedIndex]);
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

      response.data.forEach(element => {
        var tmpD = Date.parse(element.dateObj.split(", ")[1]);

        element.dateObj = this.timeConverter(tmpD);
        convertedDates.push(element);
      });

      this.allDates = convertedDates;

      this.fillCurrentDates();

      this.selectedIndex = 0;
      if (this.currentDates != null)
        this.$emit("selectedItem", this.currentDates[this.selectedIndex]);
    },

    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp);
      return a.toLocaleDateString(
        navigator.language || navigator.userLanguage,
        {
          timeZone: 'UTC',
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }
      );
    }
  }
};
</script>

<style></style>
