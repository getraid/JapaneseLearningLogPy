<template>
  <div>
    <div class="flex flex-wrap -mx-4 overflow-hidden">
      <div class="px-4 w-1/2 overflow-hidden ">
        <div class="custom-number-input">
          <label
            for="custom-input-number"
            class="w-full text-gray-700 text-sm font-semibold"
            >Hours:
          </label>
          <div
            class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"
          >
            <button
              @click="Decrement(0)"
              class=" bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  "
              type="number"
              placeholder="hh"
              v-model="hh"
              pattern="\d*"
              @change="evaluate({ pointer: 'hh', min: 0 })"
            />
            <button
              @click="Increment(0)"
              class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>

      <div class=" px-4 w-1/2 overflow-hidden">
        <div class="custom-number-input">
          <label
            for="custom-input-number"
            class="w-full text-gray-700 text-sm font-semibold"
            >Minutes:
          </label>
          <div
            class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"
          >
            <button
              @click="Decrement(1)"
              class=" bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 "
              type="number"
              placeholder="mm"
              v-model="mm"
              pattern="\d*"
              @change="evaluate({ pointer: 'mm', min: 0, max: 59 })"
            />
            <button
              @click="Increment(1)"
              class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <button @click="clear()">clear</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      hh: 0,
      mm: 0,
    };
  },
  props: {
    time: { type: Number, default: 0 },
  },

  watch: {
    // eslint-disable-next-line
    time: function(newVal, oldVal) {
      this.hh = Math.floor(parseFloat(this.time) / 60);
      this.mm = Math.round((parseFloat(this.time) / 60 - this.hh) * 60);
    },
  },

  mounted() {
    this.hh = parseInt(Math.floor(parseFloat(this.time) / 60));
    this.mm = Math.round((parseFloat(this.time) / 60 - this.hh) * 60);
  },
  computed: {
    notNull() {
      return this.hh !== null || this.mm !== null;
    },
  },
  methods: {
    Increment(id) {
      if (id == 0) {
        this.hh += 1;
        this.evaluate({ pointer: "hh", min: 0 });
      } else {
        this.mm += 1;
        this.evaluate({ pointer: "mm", min: 0, max: 59 });
      }
    },
    Decrement(id) {
      if (id == 0) {
        this.hh -= 1;
        this.evaluate({ pointer: "hh", min: 0 });
      } else {
        this.mm -= 1;
        this.evaluate({ pointer: "mm", min: 0, max: 59 });
      }
    },
    clear() {
      this.hh = this.mm = 0;
      this.evaluate({ pointer: "hh", min: 0 });
      this.evaluate({ pointer: "mm", min: 0, max: 59 });
    },
    evaluate(settings) {
      // Using the pointer to avoid having a method for each input
      var value = this[settings.pointer];
      if (!isNaN(settings.max) && this[settings.pointer] > settings.max) {
        value = settings.max;
      }
      if (!isNaN(settings.min) && this[settings.pointer] < settings.min) {
        value = settings.min;
      }
      this[settings.pointer] = value;
      // eslint-disable-next-line use-isnan

      // Always good to emit changes, no?
      var calcval = parseInt(this.hh) * 60 + parseInt(this.mm);
      console.log(calcval);
      this.$emit("change", calcval);
    },
  },
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>
