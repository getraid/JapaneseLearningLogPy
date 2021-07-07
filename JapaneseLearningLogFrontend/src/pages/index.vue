<template>
  <div class="defaultFont">
    <nav
      class=" flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-jlOrange shadow sm:items-baseline w-full"
    >
      <div class="mb-2 sm:mb-0 flex flex-row">
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

    <div class="flex flex-row">
      <p class="description">Hello World</p>
    </div>
  </div>
</template>

<script>
// import BigButton from "../components/BigButton.vue";
export default {
  // components: { BigButton }
};
</script>

<style lang="postcss">
.defaultFont {
  font-family: "Open Sans", Arial, sans-serif;
}
</style>
