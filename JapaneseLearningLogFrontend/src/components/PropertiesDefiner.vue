<template>
  <BoxElement>
    <div v-if="postObj != null">
      <!-- <div>{{ postObj.id }}</div> -->
      <!-- <div>{{ postObj.log_FK_id }}</div> -->

      <input class="block my-2" type="text" :value="postObj.elapsedTime" />
      <input class="block my-2" type="text" :value="postObj.learnMethod" />
      <input class="block my-2" type="text" :value="postObj.comment" />

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="UpdatePost()"
      >
        Button
      </button>
    </div>
  </BoxElement>
</template>

<script>
import BoxElement from "./GeneralComponents/BoxElement.vue";
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

    SetCurrentPost(e) {
      console.log(e);
      this.postObj = e;
    },
  },
};
</script>

<style></style>
