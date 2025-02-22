<template>
  <div class="overflow-auto max-w-full">    
    <div>
      <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Filter term..." />
      </div>

      <UTable
        v-if="filteredRows.length > 0"
        :sort="sort"
        :columns="columns"
        :rows="filteredRows"        
        class="min-w-full"
        :ui="{         
          td: { base: 'whitespace-normal break-words' } // Quebra de linha nos textos longos
        }"
      >
        <template #term-data="{ row }">
          <span class="w-full block" v-html="row.term"></span>
        </template>
        <template #translation-data="{ row }">
          <span class="w-full block" v-html="formatText(row.translation)"></span>
        </template>
        <template #example-data="{ row }">
          <span class="w-full block" v-html="formatText(row.example)"></span>
        </template>
        <template #description-data="{ row }">
          <span class="w-full block" v-html="formatText(row.description)"></span>
        </template>
        <template #pronunciation-data="{ row }">
          <span class="w-full block" v-html="formatText(row.pronunciation)"></span>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  terms: {
    type: Array,
    required: true
  }
})

const sort = ref({
  column: 'term',
  direction: 'asc'
})

const q = ref('')

const columns = [
  { key: 'term', label: 'Term', sortable: true },
  { key: 'translation', label: 'Translation', sortable: true },
  { key: 'example', label: 'Example', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'pronunciation', label: 'Pronunciation' }
]

const filteredRows = computed(() => {
  if (!q.value) {
    return props.terms
  }

  return props.terms.filter((term) => {
    return Object.values(term).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const formatText = (text) => {
  return text ? text.replace(/\|/g, '<br><br>') : '—'
}
</script>

