<template>
  <BoxElement>
    <div v-if="postObj != null">
      <!-- <div>{{ postObj.id }}</div> -->
      <!-- <div>{{ postObj.log_FK_id }}</div> -->

      <input class="block my-2" type="text" v-model="postObj.elapsedTime" />
      <input class="block my-2" type="text" v-model="postObj.learnMethod" />
                <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4" v-model="postObj.comment" ></textarea>


      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="Revert()"
      >
        Cancel
      </button>      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="DeletePost()"
      >
        Delete
      </button>
     
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mx-4 px-4 rounded"
        @click="UpdatePost()"
      >
        Save
      </button>
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
    DeletePost()
    {
      
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
