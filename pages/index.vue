<script setup>
import Table from '@/components/commons/Table.vue'
import RandomTermsModal from '@/components/commons/RandomTermsModal.vue'

const terms = ref([])

const fetchTerms = async () => {
  const { data, error } = await useFetch('/api/terms', { cache: 'no-cache' })

  if (error.value) {
    console.error('Error loading terms:', error.value)
    return
  }

  terms.value = data.value || []
}

onMounted(fetchTerms)
</script>

<template>
  <div class="mx-auto w-[97%] max-w-none">
    <section class="mb-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 shadow-lg shadow-black/20 backdrop-blur sm:px-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Terms</h1>
        </div>
        <div class="rounded-xl border border-teal-400/20 bg-gray-950/70 px-4 py-3 text-sm text-gray-300">
          <span class="block text-xs uppercase tracking-[0.2em] text-teal-300">Total salvo</span>
          <span class="text-2xl font-bold text-white">{{ terms.length }}</span>
        </div>
      </div>
    </section>
    <RandomTermsModal :terms="terms" />
    <Table :terms="terms" />
  </div>
</template>
