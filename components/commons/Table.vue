<template>
  <div class="overflow-x-auto max-w-full">
    <div class="bg-gray-900 shadow-md rounded-lg p-4">
      <div class="flex py-3.5 border-b border-gray-700">
        <UInput v-model="q" placeholder="Filter term..." class="w-full text-gray-200 bg-gray-800 border-gray-600 focus:ring-0 focus:border-gray-500" />
      </div>

      <UTable
        v-if="filteredRows.length > 0"
        :sort="sort"
        :columns="columns"
        :rows="filteredRows"
        class="w-full text-sm md:text-base"
        :ui="{         
          thead: { base: 'bg-gray-800 text-gray-300' },
          tr: { base: 'border-b border-gray-700' },
          td: { base: 'px-4 py-3 whitespace-normal break-words text-gray-100' },
          th: { base: 'px-4 py-3 text-left font-semibold text-gray-300' }
        }"
      >
        <template #term-data="{ row }">
          <span class="block font-medium text-gray-100" v-html="row.term"></span>
        </template>
        <template #translation-data="{ row }">
          <span class="block text-gray-100" v-html="formatText(row.translation)"></span>
        </template>
        <template #example-data="{ row }">
          <span class="block italic text-gray-400" v-html="formatText(row.example)"></span>
        </template>
        <template #description-data="{ row }">
          <span class="block text-gray-300" v-html="formatText(row.description)"></span>
        </template>
        <template #pronunciation-data="{ row }">
          <span class="block text-gray-300" v-html="formatText(row.pronunciation)"></span>
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
