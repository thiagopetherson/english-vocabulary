<template>
  <header class="w-full bg-[#18181B] text-white py-4 shadow-md">
    <div class="w-[95%] mx-auto flex justify-between items-center px-6">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="border-2 border-white rounded-full px-3 py-1 text-lg font-bold">EV</span>
        <span class="text-xl font-semibold">English Vocabulary</span>
      </NuxtLink>

      <NuxtLink 
        v-if="!isCurrenciesPage" 
        to="/term/add"
        class="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded"
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
