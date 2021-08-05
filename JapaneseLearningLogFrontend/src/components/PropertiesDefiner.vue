<template>
  <BoxElement>
    <div v-if="postObj != null">
      <!-- <div>{{ postObj.id }}</div> -->
      <!-- <div>{{ postObj.log_FK_id }}</div> -->

      <div class="flex flex-wrap -mx-3 overflow-hidden">
        <div class="my-1 px-3  overflow-hidden  lg:w-4/12 w-full">
          <input
            class="block my-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            type="text"
            v-model="postObj.elapsedTime"
          />
          <input
            class="block my-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            type="text"
            v-model="postObj.learnMethod"
          />
        </div>

        <div class="my-3 px-3  overflow-hidden lg:w-8/12 w-full">
          <textarea
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
            v-model="postObj.comment"
          ></textarea>
        </div>

        <div class="my-3 w-full overflow-hidden">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 mx-4 rounded float-right"
            @click="UpdatePost()"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2  px-4 rounded float-right"
            @click="Revert()"
          >
            Cancel
          </button>

          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mx-4 px-4 rounded "
            @click="DeletePost()"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </BoxElement>
</template>

<script>
import BoxElement from "./GeneralComponents/SmallBox.vue";
export default {
  components: { BoxElement },
  data() {
    return {
      postObj: null,
    };
  },
  created() {
    this.$eventbus.$on("currentPost", this.SetCurrentPost);
  },
  beforeDestroy() {
    this.$eventbus.$off("currentPost");
  },
  methods: {
    UpdatePost() {
      this.isLoading = true;
      console.log("w");
      const params = new URLSearchParams();
      params.append("id", this.postObj.id);
      params.append("logid", this.postObj.log_FK_id);
      params.append("elapsedTime", this.postObj.elapsedTime);
      params.append("learnMethod", this.postObj.learnMethod);
      params.append("comment", this.postObj.comment);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      this.axios.patch("/addPost", params, config).then((response) => {
        console.log(response);
        // this.posts.push(response.data[response.data.length - 1]);
        // // this.posts = response.data;
        // this.isLoading = false;
        // this.selectedIndex = this.posts.length - 1;
      });
    },
    DeletePost() {
      this.axios.get("/deletePost?id=" + this.postObj.id).then(() => {
        this.Revert();
      });
    },
    Revert() {
      this.$eventbus.$emit("reloadentrys");
    },

    SetCurrentPost(e) {
      console.log(e);
      this.postObj = e;
    },
  },
};
</script>

<style></style>
