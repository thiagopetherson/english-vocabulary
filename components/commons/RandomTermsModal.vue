<template>
  <div>
    <section class="mb-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gray-950/60 px-4 py-4 shadow-md shadow-black/20">
      <p class="text-sm font-semibold text-white">Random review</p>
      <button
        type="button"
        @click="openModal"
        class="rounded-lg border border-teal-400/40 bg-teal-400/10 px-4 py-2 font-medium text-teal-200 transition hover:bg-teal-400/20"
        aria-haspopup="dialog"
        aria-controls="random-terms-modal"
      >
        Show random terms
      </button>
    </section>

    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeModal">
      <div
        id="random-terms-modal"
        class="modal rounded-2xl border border-white/10 bg-gray-950 px-6 py-6 shadow-2xl shadow-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="random-terms-title"
      >
        <div class="mb-6 flex items-start justify-between gap-4">
          <h2 id="random-terms-title" class="text-[1.7rem] font-semibold text-white">Random Terms</h2>
          <button
            type="button"
            @click="closeModal"
            class="rounded-full border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
            aria-label="Close random terms modal"
          >
            Close
          </button>
        </div>

        <ul v-if="randomTerms.length" class="list-none p-0">
          <li
            v-for="(term, index) in randomTerms"
            :key="index"
            class="mb-3 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-left text-[1.05rem] text-gray-100"
          >
            <span class="mr-3 text-sm font-semibold text-teal-300">{{ index + 1 }}.</span>
            <strong>{{ term.term }}</strong>
          </li>
        </ul>

        <p v-else class="rounded-xl border border-dashed border-white/10 px-4 py-6 text-sm text-gray-400">
          Nenhum termo disponivel para sortear.
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            @click="copyTerms"
            class="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
          >
            Copy words
          </button>

          <button 
              type="button"
              @click="closeModal" 
              class="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white transition hover:bg-teal-600">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const { $toast } = useNuxtApp()

const props = defineProps({
  terms: {
    type: Array,
    required: true
  }
})

const isModalVisible = ref(false)
const randomTerms = ref([])

const openModal = () => {
  isModalVisible.value = true
  randomTerms.value = getRandomTerms()
}

const closeModal = () => {
  isModalVisible.value = false
}

const copyTerms = async () => {
  const text = randomTerms.value
    .map((term) => `${term.term} - `)
    .join('\n')

  if (!text) {
    $toast.warning('No terms to copy!')
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    $toast.success('Terms copied to clipboard!')
  } catch {
    $toast.error('Could not copy the terms!')
  }
}

const getRandomTerms = () => {
  const shuffled = [...props.terms].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 5)
}

</script>

<style lang="sass" scoped>
.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.85)
  display: flex
  justify-content: center
  align-items: center
  z-index: 9999
  padding: 1rem

  .modal
    width: min(100%, 420px)
    max-height: 80vh
    overflow-y: auto
    text-align: center

</style>
