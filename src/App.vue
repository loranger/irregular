<script setup>

import { reactive, onMounted, capitalize } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { Roller } from "vue-roller";

import "vue-roller/dist/style.css";
import json from './assets/verbs.json';

const router = useRouter();
const route = useRoute();

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
  router.push(`/${state.verb.base}`)
}

function capitalized(name) {
  const capitalizedFirst = name[0].toUpperCase();
  const rest = name.slice(1);

  return capitalizedFirst + rest;
}

onMounted(async () => {
  await router.isReady();
  if (route.params.verb) {
    const found = state.verbs.find(element => element.base === route.params.verb);
    if (found) {
      state.verb = found;
      state.expand = true;
    } else {
      window.location.href = '/';
    }
    return;
  }
  randomVerb();
})
</script>

<template>
  <main class="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-blue-600 dark:text-blue-400">Irregular verb</p>
      <Roller 
        @click="state.expand = true"
        default-value="loading…" 
        :value="`To ${state.verb.base}`" 
        char-set="alphabet" 
        :duration="1000" 
        class="my-4 text-4xl md:text-8xl cursor-pointer font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl justify-center"></Roller>

      <div 
        @click="state.expand = !state.expand"
        class="flex flex-col justify-around min-h-[15rem] my-8 cursor-pointer">
        <TransitionGroup>
          <div class="" v-if="state.expand">
            <p class="text-xs font-semibold text-blue-600 dark:text-blue-400">Past simple</p>
            <h3 class="text-2xl dark:text-gray-100 font-semibold" v-text="capitalize(state.verb['past-simple'])"></h3>
          </div>
 
          <div class="" v-if="state.expand">
            <p class="text-xs font-semibold text-blue-600 dark:text-blue-400">Past participle</p>
            <h3 class="text-2xl dark:text-gray-100 font-semibold" v-text="capitalize(state.verb['past-participle'])"></h3>
          </div>
          
          <div class="" v-if="state.expand">
            <p class="text-xs font-semibold text-blue-600 dark:text-blue-400">French 🇫🇷</p>
            <h3 class="text-2xl dark:text-gray-100 font-semibold" v-text="capitalize(state.verb.french)"></h3>
          </div>
        </TransitionGroup>
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
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
