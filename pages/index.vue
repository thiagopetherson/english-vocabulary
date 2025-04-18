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
  <div class="mx-auto w-[95%] xs:w-[100%]">
    <h1 class="text-3xl font-bold text-right mb-5">Terms</h1>
    <RandomTermsModal :terms="terms" />
    <Table :terms="terms" />
  </div>
</template>
