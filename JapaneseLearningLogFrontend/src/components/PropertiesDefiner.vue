<template>
  <BoxElement>
    <div>{{ postObj }}</div>
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
    SetCurrentPost(e) {
      this.postObj = e;
    }
  }
};
</script>

<style></style>
