<script setup lang="ts">

import { reactive, onMounted, capitalize } from "vue";
import { Roller } from "vue-roller";

import "vue-roller/dist/style.css";
import json from './assets/verbs.json';

const state = reactive({
    verb: {
      "french": "",
      "base": "",
      "past-simple": "",
      "past-participle": ""
    },
    expand: false,
    verbs: json.verbs
});

function randomVerb() {
  state.expand = false;
  var keys = Object.keys(state.verbs);
  state.verb = state.verbs[keys[ keys.length * Math.random() << 0]];
  // console.log(state.verb)
}

function capitalized(name) {
  const capitalizedFirst = name[0].toUpperCase();
  const rest = name.slice(1);

  return capitalizedFirst + rest;
}

onMounted(() => {
  randomVerb();
})
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-white dark:bg-black px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-blue-600 dark:text-blue-400">Irregular verb</p>
      <Roller 
        @click="state.expand = true"
        default-value="loading…" 
        :value="`To ${state.verb.base}`" 
        char-set="alphabet" 
        :duration="1000" 
        class="mt-4 text-4xl md:text-8xl cursor-pointer font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl justify-center"></Roller>

      <div 
        @click="state.expand = !state.expand"
        class="flex flex-col justify-around min-h-[15rem] cursor-pointer">
        <Transition>
          <div class="" v-if="state.expand">
            <p class="text-xs font-semibold text-blue-600 dark:text-blue-400">Past simple</p>
            <h3 class="text-2xl dark:text-gray-100 font-semibold" v-text="capitalize(state.verb['past-simple'])"></h3>
          </div>
        </Transition>

        <Transition>
          <div class="" v-if="state.expand">
            <p class="text-xs font-semibold text-blue-600 dark:text-blue-400">Past participle</p>
            <h3 class="text-2xl dark:text-gray-100 font-semibold" v-text="capitalize(state.verb['past-participle'])"></h3>
          </div>
        </Transition>

        <Transition>
          <div class="" v-if="state.expand">
            <p class="text-xs font-semibold text-blue-600 dark:text-blue-400">French 🇫🇷</p>
            <h3 class="text-2xl dark:text-gray-100 font-semibold" v-text="capitalize(state.verb.french)"></h3>
          </div>
        </Transition>
      </div>

      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button type="button" class="rounded-md bg-blue-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" @click="randomVerb()">Random verb</button>
      </div>
    </div>
  </main>


</template>

<style>
.v-enter-active,
.v-leave-active {
  animation: bounce-in 0.5s;
}

.v-enter-from,
.v-leave-to {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
