<template>
  <section class="overflow-x-auto max-w-full rounded-2xl border border-white/10 bg-gray-900/90 shadow-xl shadow-black/20">
    <div class="border-b border-gray-800 px-4 py-4 sm:px-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-white">Saved terms</h2>
        </div>
        <div class="rounded-xl border border-white/10 bg-gray-950/70 px-3 py-2 text-sm text-gray-300">
          <span class="text-white font-semibold">{{ filteredRows.length }}</span>
          {{ filteredRows.length === 1 ? ' result' : ' results' }}
        </div>
      </div>

      <label for="term-filter" class="mt-4 mb-2 block text-sm font-medium text-gray-300">
        Filter terms
      </label>
      <div class="flex py-1">
        <UInput 
          id="term-filter"
          v-model="q" 
          placeholder="Type a word, translation or example..." 
          class="w-full text-gray-200 bg-gray-800 border-gray-600 focus:ring-0 focus:border-gray-500" 
          aria-describedby="term-filter-help"
        />
      </div>
    </div>

    <UTable
      v-if="filteredRows.length > 0"
        :sort="sort"
        :columns="columns"
        :rows="filteredRows"
        class="w-full text-sm md:text-base"
        :ui="{         
          wrapper: 'overflow-x-auto',
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
              type="button"
              class="rounded-md p-1 text-teal-400 transition hover:bg-teal-400/10 hover:text-teal-300"
              @click="speak(row.term)"
              :aria-label="`Listen to ${row.term}`"
              title="Listen"
            >         
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                <path d="M9 3L4 7H1v6h3l5 4V3zM16.707 4.293l-1.414 1.414A7.967 7.967 0 0118 10a7.967 7.967 0 01-2.707 5.293l1.414 1.414A9.953 9.953 0 0020 10c0-2.761-1.117-5.261-3.293-7.293z"></path>
                <path d="M13.293 7.293L11.879 8.707A3.98 3.98 0 0113 10a3.98 3.98 0 01-1.121 2.293l1.414 1.414A5.978 5.978 0 0015 10a5.978 5.978 0 00-1.707-4.293z"></path>
              </svg>             
            </button>

            <button
              type="button"
              class="mb-1 rounded-md p-1 pl-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
              @click="removeTerm(row.term)"
              :aria-label="`Remove ${row.term}`"
              title="Remove"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M3 6h18v2H3V6zm2 4h14l-1.5 12.5a2 2 0 01-2 1.5H8.5a2 2 0 01-2-1.5L5 10zm5 2v8h2v-8H10zm4 0v8h2v-8h-2z"/>
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

    <div v-else class="px-4 py-12 text-center sm:px-6">
      <div class="mx-auto max-w-md rounded-2xl border border-dashed border-white/10 bg-gray-950/60 px-6 py-8">
        <h3 class="text-lg font-semibold text-white">No terms found</h3>
        <p class="mt-2 text-sm text-gray-400">
          Tente outro filtro ou limpe a busca para ver toda a sua lista novamente.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSpeech } from '~/composables/useSpeech'

const { speak } = useSpeech()
const { $toast } = useNuxtApp()

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

const removeTerm = async (term) => {
  const password = window.prompt(`Enter password "${term}"`)

  if (password === null || password.trim() === '') {    
    return
  }

  if (password.trim() !== 'ab34') {
    $toast.error('Incorrect password!')
    return
  }

  const { error } = await useFetch(`/api/terms?term=${term}`, {
    method: 'DELETE'
  })

  if (error.value) {
    $toast.error('Error deleting term!')
    return
  }

  $toast.success(`Term "${term}" successfully removed!`)
  window.location.reload() // Depois retirar isso
}

</script>
