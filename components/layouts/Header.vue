<template>
  <header class="sticky top-0 z-30 w-full border-b border-white/10 bg-gray-950/85 text-white shadow-lg backdrop-blur">
    <div class="mx-auto flex w-[95%] items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="rounded-full border-2 border-teal-400/80 px-3 py-1 text-lg font-bold text-teal-200">EV</span>
        <span class="block text-xl font-semibold leading-none">English Vocabulary</span>
      </NuxtLink>

      <NuxtLink 
        v-if="!isCurrenciesPage" 
        to="/term/add"
        class="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white transition hover:bg-teal-400 focus-visible:outline-none"
      >
        Add
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCurrenciesPage = computed(() => route.path === '/currency/currencies')
</script>
