<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/layouts/Header.vue'
</script>
