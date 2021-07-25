<template>
  <div>
    <nav
      class=" flex flex-col content-center lg:flex-row lg:text-left lg:justify-between lg:py-2 py-1 lg:px-6 px-2 bg-jlOrange shadow lg:items-baseline w-full"
    >
      <div class="mb-2 lg:mb-0 flex flex-row">
        <div class="h-12 w-12 self-center mr-2">
          <img class="h-12 w-12 self-center" src="../assets/logo.svg" />
        </div>
        <div>
          <a
            href="/"
            class="text-2xl no-underline text-jLDark hover:text-blue-dark font-extrabold leading-snug"
            >JAPANESE LOG</a
          >
          <p class="text-sm text-grey-dark font-bold">
            YOUR PERSONAL DAILY TRACKER
          </p>
        </div>
      </div>

      <div class="sm:mb-0 self-center">
        <!-- <a
          href="#"
          class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1"
          >tmpLink</a
        > -->
      </div>
    </nav>

    <div class="flex lg:flex-row  flex-col  row-gap-2 col-gap-4 sm:mx0 mx-5">
      <div>
        <ListLogs v-on:selectedItem="ChangeLog" />
      </div>
      <div class="flex flex-col row-gap-4 col-gap-2 lg:py-2 py-0 flex-grow">
        <ListPosts :logId="selectedLogId" />
        <PropertiesDefiner />
      </div>
    </div>
  </div>
</template>

<script>
import ListLogs from "../components/ListLogs.vue";
import ListPosts from "../components/ListPosts.vue";
import PropertiesDefiner from "../components/PropertiesDefiner.vue";

export default {
  components: { ListLogs, ListPosts, PropertiesDefiner },
  data() {
    return {
      selectedLogId: 0
    };
  },
  methods: {
    ChangeLog(e) {
      this.selectedLogId = e.id;
    }
  }
};
</script>

<style lang="postcss"></style>
