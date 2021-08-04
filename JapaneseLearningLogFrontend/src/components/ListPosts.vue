<template>
  <BoxElement>
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
          <p class="text-xl">{{ item.learnMethod }}</p>
          <p class="whitespace-pre"> {{ timeConvert(item.elapsedTime) }}</p>
          <small class="whitespace-pre  line-clamp-1 text-gray-800"> {{ item.comment | truncate(30, '...') }}</small>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="my-2 px-2 overflow-hidden lg:w-1/4 xl:w-1/5 md:w-1/3 w-1/2 flex-grow"
      >
        <div
          class="bg-gray-300 hover:bg-gray-300  animate-pulse py-6  rounded-md border-2 border-gray-500 text-center flex flex-col items-center cursor-pointer"
        >
          <div
            class="rounded-full w-8 h-8 bg-gray-600 hover:customColor text-center self-center"
          ></div>
        </div>
      </div>
      <!-- Add new element -->
      <div
        v-else
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
      selectedIndex: 0,
    };
  },
  props: {
    logId: null,
  },
  created() {
    this.$eventbus.$on("reloadentrys", this.Reload);
  },
  beforeDestroy() {
    this.$eventbus.$off("reloadentrys");
  },

  watch: {
    // eslint-disable-next-line
    logId: function(newVal, oldVal) {
      this.FetchPosts(newVal);
    }, // eslint-disable-next-line
    selectedIndex: function(newVal, oldVal) {
      this.EmitPost(newVal);
    },
  },
  methods: {
    Reload() {
      this.FetchPosts(this.logId);
    },
    FetchPosts(logid) {
      this.posts = [];
      this.isLoading = true;
      this.axios.get("/getPosts?logid=" + logid).then((response) => {
        this.posts = response.data;

        this.isLoading = false;

        this.selectedIndex = 0;
        if (this.posts.length != 0)
          this.$eventbus.$emit("currentPost", this.posts[0]);
        else this.$eventbus.$emit("currentPost", null);
      });
    },

    ClickPost(index) {
      this.selectedIndex = index;
      this.$eventbus.$emit("currentPost", this.posts[this.selectedIndex]);
    },

    EmitPost(index) {
      this.$emit("selectedPost", this.posts[index]);
    },
    timeConvert(n) {
      var num = n;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);

      if (rhours == 0 && rminutes == 0) {
        return "";
      } else if (rhours == 0 && rminutes == 1) {
        return rminutes + " minute";
      }else if (rhours == 0 && rminutes >= 1) {
        return rminutes + " minutes";
      }else if (rhours ==1 && rminutes == 0) {
        return rhours + " hour"
      }else if (rhours >=1 && rminutes == 0) {
        return rhours + " hours"
      }else if (rhours ==1 && rminutes == 1) {
        return rhours + " hour and " + rminutes + " minute";
      }else if (rhours >=1 && rminutes == 1) {
        return rhours + " hours and " + rminutes + " minute";
      }else if (rhours >=1 && rminutes >= 1) {
        return rhours + " hours and " + rminutes + " minutes";
      }
    },
    AddNewPost() {
      // this.posts = [];
      this.isLoading = true;

      const params = new URLSearchParams();
      params.append("logid", this.logId);
      params.append("elapsedTime", 0);
      params.append("learnMethod", "New Post");
      params.append("comment", "");

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      this.axios.post("/addPost", params, config).then((response) => {
        this.posts.push(response.data[response.data.length - 1]);
        // this.posts = response.data;
        this.isLoading = false;
        this.selectedIndex = this.posts.length - 1;
        this.$eventbus.$emit("currentPost", this.posts[this.selectedIndex]);
      });
    },
  },
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
