<template>
  <div class="overflow-x-auto max-w-full">
    <div class="bg-gray-900 shadow-md rounded-lg p-4">
      <div class="flex py-3.5 border-b border-gray-700">
        <UInput 
          v-model="q" 
          placeholder="Filter term..." 
          class="w-full text-gray-200 bg-gray-800 border-gray-600 focus:ring-0 focus:border-gray-500" 
        />
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
          <div class="flex items-center space-x-2">
            <span class="block font-medium text-gray-100" v-html="row.term"></span>
            <button               
              class="text-teal-400 hover:text-teal-300 transition"
              @click="speak(row.term)"
            >         
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                <path d="M9 3L4 7H1v6h3l5 4V3zM16.707 4.293l-1.414 1.414A7.967 7.967 0 0118 10a7.967 7.967 0 01-2.707 5.293l1.414 1.414A9.953 9.953 0 0020 10c0-2.761-1.117-5.261-3.293-7.293z"></path>
                <path d="M13.293 7.293L11.879 8.707A3.98 3.98 0 0113 10a3.98 3.98 0 01-1.121 2.293l1.414 1.414A5.978 5.978 0 0015 10a5.978 5.978 0 00-1.707-4.293z"></path>
              </svg>             
            </button>
          </div>
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
import { useSpeech } from '~/composables/useSpeech'

const { speak } = useSpeech()

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
