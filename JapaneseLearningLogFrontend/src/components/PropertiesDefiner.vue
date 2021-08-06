<template>
  <SmallBox>
    <div v-if="postObj != null">
      <!-- <div>{{ postObj.id }}</div> -->
      <!-- <div>{{ postObj.log_FK_id }}</div> -->

      <div class="flex flex-wrap -mx-3 overflow-hidden">
        <div class="my-1 w-full overflow-hidden">
          <!-- <button
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
          </button> -->

          <button
            class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 mx-4 px-2 w-8 h-8 float-right rounded-full"
            @click="DeletePost()"
          >
            <TrashIcon size="1x" />
          </button>
        </div>
        <div class=" px-3  overflow-hidden  lg:w-4/12 w-full">
          <!-- <input
            class="block my-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            type="text"
            v-model="postObj.elapsedTime"
          /> -->

          <label
            for="lmethod"
            class="w-full text-gray-700 text-sm font-semibold"
            >Learn Method:
          </label>

          <vue-bootstrap-typeahead
            ref="typeahead"
            :minMatchingChars="1"
            :maxMatches="10"
            class="customSearchbar lmethod mb-8"
            v-model="postObj.learnMethod"
            :data="learnMethods"
          />
          <TimePicker :time="postObj.elapsedTime" @change="setTime" />
        </div>

        <div class="mb-3 px-3  overflow-hidden lg:w-8/12 w-full">
          <label for="lcom" class="w-full text-gray-700 text-sm font-semibold"
            >Comment:
          </label>
          <textarea
            class="w-full px-3 py-3 my-1 text-gray-700 border rounded-lg focus:outline-none lcom"
            rows="5"
            v-model="postObj.comment"
            @change="UpdatePost()"
          ></textarea>
        </div>
      </div>
    </div>
  </SmallBox>
</template>

<script>
import { TrashIcon } from "@vue-hero-icons/outline";

import SmallBox from "./GeneralComponents/SmallBox.vue";
import TimePicker from "./GeneralComponents/TimePicker.vue";
export default {
  components: { SmallBox, TimePicker, TrashIcon },
  data() {
    return {
      postObj: null,
      learnMethods: null,
    };
  },
  watch: {
    // eslint-disable-next-line
    "postObj.learnMethod": function(newVal, oldVal) {
      this.UpdatePost();
    },
  },
  created() {
    this.$eventbus.$on("currentPost", this.SetCurrentPost);
  },
  beforeDestroy() {
    this.$eventbus.$off("currentPost");
  },
  mounted() {
    this.fillLearnMethods();
  },
  methods: {
    fillLearnMethods() {
      this.axios.get("/getLearnMethods").then((response) => {
        this.learnMethods = response.data;
      });
    },
    setTime(e) {
      this.postObj.elapsedTime = e;
      this.UpdatePost();
    },

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
        this.fillLearnMethods();
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
      const tmpPromise = new Promise((resolve) => {
        this.postObj = e;
        this.$forceUpdate();
        resolve();
      });
      tmpPromise.then(() => {
        this.$refs.typeahead.inputValue = this.postObj.learnMethod;
      });
    },
  },
};
</script>

<style>
.input-group input {
  width: 100%;
  padding: 0.5rem;
  --text-opacity: 1;
  color: #4a5568;
  color: rgba(74, 85, 104, var(--text-opacity));
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-width: 1px;
  border-radius: 0.5rem;
  display: block;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.list-group.shadow.vbt-autcomplete-list {
  background: wheat;
  display: grid;
}
</style>
