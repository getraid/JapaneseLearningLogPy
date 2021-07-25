<template>
  <BoxElement>
    <div>{{ postObj }}</div>
  </BoxElement>
</template>

<script>
import BoxElement from "./GeneralComponents/BoxElement.vue";
export default {
  components: { BoxElement },
  props: {
    postObj: null
  }
};
</script>

<style></style>
