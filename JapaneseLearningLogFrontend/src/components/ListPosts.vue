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
        <div
          v-if="posts !== null"
          :class="selectedIndex == index ? 'bg-jlOrange' : 'bg-jlItemBg'"
          class=" hover:bg-orange-300 text-center py-8 rounded-md cursor-pointer"
          @click="ClickPost(index)"
        >
          {{ item.learnMethod }}
        </div>
      </div>

      <!-- Add new element -->
      <div
        class="my-2 px-2 overflow-hidden lg:w-1/4 xl:w-1/5 md:w-1/3 w-1/2 flex-grow"
      >
        <div
          class="customColor hover:bg-jlOrange  py-6  rounded-md border-2 border-orange-500 text-center flex flex-col items-center cursor-pointer"
          @click="AddNewPost()"
        >
          <div
            class="rounded-full w-8 h-8 bg-yellow-600 hover:customColor text-center self-center"
          >
            <PlusIcon size="2x" />
          </div>
        </div>
      </div>
    </div>
  </BoxElement>
</template>

<script>
import BoxElement from "./GeneralComponents/BoxElement.vue";

import { PlusIcon } from "@vue-hero-icons/outline";

export default {
  components: { BoxElement, PlusIcon },

  data() {
    return {
      currentSelectedPost: 0,
      posts: [],
      isLoading: true,
      selectedIndex: 0
    };
  },
  props: {
    logId: null
  },

  watch: {
    // eslint-disable-next-line
    logId: function(newVal, oldVal) {
      this.FetchPosts(newVal);
    }, // eslint-disable-next-line
    selectedIndex: function(newVal, oldVal) {
      this.EmitPost(newVal);
    }
  },
  methods: {
    FetchPosts(logid) {
      this.posts = [];
      this.isLoading = true;
      this.axios.get("/getPosts?logid=" + logid).then(response => {
        this.posts = response.data;
        this.isLoading = false;

        this.selectedIndex = 0;
      });
    },

    ClickPost(index) {
      this.selectedIndex = index;
    },

    EmitPost(index) {
      this.$emit("selectedPost", this.posts[index]);
    },

    AddNewPost() {
      this.posts = [];
      this.isLoading = true;

      const params = new URLSearchParams();
      params.append("logid", this.logId);
      params.append("elapsedTime", 0);
      params.append("learnMethod", "New Post");
      params.append("comment", "");

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      this.axios.post("/addPost", params, config).then(response => {
        this.posts = response.data;
        this.isLoading = false;
        this.selectedIndex = this.posts.length - 1;
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
