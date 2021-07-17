<template>
  <div class="relative bg-jlStackBg  shadow-xl pb-1  w100 rounded-lg">
    <div
      class="bg-jlBase py-2 px-5 w100 inline-block rounded-lg   absolute upperShadow"
    >
      <!-- <div
        class="w-4 h-4 bg-green-400 hover:bg-green-500 rounded-full flex justify-center items-center float-right  text-center cursor-pointer"
      >
        <p>+</p>
      </div>
      <div
        class="w-4 h-4 mx-2 bg-gray-500 rounded-full flex justify-center items-center float-right text-sm"
      >
        <p>*</p>
      </div>
      <div
        class="w-4 h-4  bg-red-500 rounded-full flex justify-center items-center float-right"
      >
        <p>-</p>
      </div> -->

      <br />
    </div>
    <div
      class="bg-jlStackBg mt-8 pt-2 px-5 pb-2 rounded-lg relative lowerShadow"
    >
      <div><slot /></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
