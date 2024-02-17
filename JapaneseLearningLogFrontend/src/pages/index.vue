<template>
  <div>
    <nav
      class="flex flex-col content-center lg:flex-row lg:text-left lg:justify-between lg:py-2 py-1 lg:px-6 px-2 bg-jlOrange shadow lg:items-baseline w-full"
    >
      <!-- here vv -->
      <div class="mb-2 lg:mb-0 customFlex">
        <div class="h-12 w-12 self-center mr-2">
          <a href="/">
            <img class="h-12 w-12 self-center" src="../assets/logo.svg" />
          </a>
        </div>
        <div class="text-center lg:text-left">
          <a
            href="/"
            class="text-2xl no-underline text-jLDark hover:text-blue-dark font-extrabold leading-snug"
            >JAPANESE LOG</a
          >
          <p class="text-sm text-grey-dark font-bold">
            YOUR PERSONAL DAILY TRACKER
          </p>
        </div>

        <div class="sm:mb-0 self-end lg:self-center flex flex-row">
          <button
            class="visible lg:invisible p-2 hover:bg-orange-300 bg-jlOrange border-orange-900 border focus:bg-jlOrange rounded-lg py-2 my-2 px-5 text-center cursor-pointer"
            @click="OnExportDialog()"
          >
            Export
          </button>
        </div>
      </div>

      <div class="sm:mb-0 self-center hidden lg:block">
        <button
          class="p-2 hover:bg-orange-300 bg-jlOrange border-orange-900 border focus:bg-jlOrange rounded-lg py-2 my-2 px-5 text-center cursor-pointer"
          @click="OnExportDialog()"
        >
          Export
        </button>
      </div>
    </nav>

    <div class="flex lg:flex-row flex-col row-gap-2 col-gap-4 sm:mx0 mx-5">
      <div>
        <ListLogs v-on:selectedItem="ChangeLog" />
      </div>
      <div class="flex flex-col row-gap-4 col-gap-2 lg:py-2 py-0 flex-grow">
        <ListPosts :logId="selectedLogId" />
        <PropertiesDefiner />
      </div>
    </div>

    <div
      v-if="openDialog"
      class="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50"
    ></div>
    <div v-if="openDialog" class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <p
                  as="h3"
                  class="text-base font-semibold leading-6 text-gray-900"
                >
                  Export
                </p>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Export entire sqlite database or converted csv file?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              @click="OnExportCSV"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
              CSV File
            </button>
            <button
              type="button"
              @click="OnExportDB"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
              Database
            </button>
            <button
              type="button"
              @click="OnExportDialog"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-3 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
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
      selectedLogId: 0,
      openDialog: false,
    };
  },
  methods: {
    ChangeLog(e) {
      this.selectedLogId = e.id;
    },
    OnExportDialog() {
      this.openDialog = !this.openDialog;
    },
    OnExportCSV() {
      let self = this;
      this.axios
        .get("export", { responseType: "arraybuffer" })
        .then(function (response) {
          console.log(response)
          var headers = response.headers;
          var blob = new Blob([response.data], {
            type: headers["content-type"],
          });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          let dateStr = new Date(Date.now()).toLocaleString().split(',')[0];
          link.download = "JapaneseStats_"+dateStr+".csv";
          link.click();
          self.OnExportDialog();
        });

      
    },
    OnExportDB() {
      let self = this;

      this.axios
        .get("exportDatabase", { responseType: "arraybuffer" })
        .then(function (response) {
          console.log(response)
          var headers = response.headers;
          var blob = new Blob([response.data], {
            type: headers["content-type"],
          });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "database.db";
          link.click();
          self.OnExportDialog();

        });
    },
  },
};
</script>

<style lang="postcss">
.customFlex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
