<template>
  <BoxElement>
    <div v-if="postObj != null">
      <!-- <div>{{ postObj.id }}</div> -->
      <!-- <div>{{ postObj.log_FK_id }}</div> -->

      <input class="block my-2" type="text" :value="postObj.elapsedTime" />
      <input class="block my-2" type="text" :value="postObj.learnMethod" />
      <input class="block my-2" type="text" :value="postObj.comment" />
      <input
        class="block my-2"
        type="button"
        value="commit"
        @click="UpdatePost()"
      />
    </div>
  </BoxElement>
</template>

<script>
import BoxElement from "./GeneralComponents/BoxElement.vue";
export default {
  components: { BoxElement },
  data() {
    return {
      postObj: null
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
      //TODO: continue here
    },

    SetCurrentPost(e) {
      this.postObj = e;
    }
  }
};
</script>

<style></style>
