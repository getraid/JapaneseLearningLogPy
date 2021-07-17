<template>
  <BoxElement>
    <div v-if="isLoading">
      loading...
    </div>
    <div class="flex flex-wrap -mx-2 overflow-hidden flex-row justify-start">
      <div
        class="my-2 mx-2 overflow-hidden lg:w-1/4 xl:w-1/5 md:w-1/3 w-1/2 flex-grow"
        v-for="(item, index) in posts"
        :key="index"
      >
        <div class="bg-jlOrange text-center py-8 rounded-md">
          {{ item.learnMethod }}
        </div>
      </div>

      <!-- Add new element -->
      <div
        class="my-2 px-2 overflow-hidden lg:w-1/4 xl:w-1/5 md:w-1/3 w-1/2 flex-grow"
      >
        <div
          class="customColor hover:bg-jlOrange  py-6  rounded-md border-2 border-orange-500 text-center flex flex-col items-center cursor-pointer"
          @click="
            () => {
              this.posts.push(this.posts[0]);
            }
          "
        >
          <div
            class="rounded-full w-8 h-8 bg-yellow-600 hover:customColor text-center self-center"
          >
            <p>+</p>
          </div>
        </div>
      </div>
    </div>
  </BoxElement>
</template>

<script>
import BoxElement from "./GeneralComponents/BoxElement.vue";
export default {
  components: { BoxElement },

  data() {
    return {
      currentSelectedPost: 0,
      posts: [],
      isLoading: true
    };
  },
  props: {
    logId: null
  },

  watch: {
    // eslint-disable-next-line
    logId: function(newVal, oldVal) {
      console.log(newVal);
      this.FetchPosts(newVal);
    }
  },
  methods: {
    FetchPosts(logid) {
      this.posts = [];
      this.isLoading = true;
      this.axios.get("/getPosts?logid=" + logid).then(response => {
        this.posts = response.data;
        this.isLoading = false;
        //  this.setupLogs(response);
        //     this.currentDatesIndex = 0;
        //     this.selectedIndex = 0;
        //     this.fillCurrentDates();
      });
    }
  }
};
</script>

<style>
.customColor {
  background-color: rgba(243, 102, 8, 0.158);
}
.customColor div {
  color: white;
  line-height: 2rem;
}

.customColor:hover div {
  color: black;
  background-color: white;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.33);
}
</style>
