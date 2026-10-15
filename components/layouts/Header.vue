<template>
  <header class="sticky top-0 z-30 w-full border-b border-white/10 bg-gray-950/85 text-white shadow-lg backdrop-blur">
    <div class="mx-auto flex w-[95%] items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="rounded-full border-2 border-teal-400/80 px-3 py-1 text-lg font-bold text-teal-200">EV</span>
        <span class="block text-xl font-semibold leading-none">English Vocabulary</span>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <select
          v-if="voices.length"
          v-model="selectedVoiceURI"
          @change="setVoice(selectedVoiceURI)"
          class="rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm text-gray-200 focus:outline-none"
          aria-label="Select pronunciation voice"
        >
          <option v-for="voice in voices" :key="voice.voiceURI" :value="voice.voiceURI">
            {{ voice.name }} ({{ voice.lang }})
          </option>
        </select>

        <NuxtLink
          v-if="!isCurrenciesPage"
          to="/term/add"
          class="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white transition hover:bg-teal-400 focus-visible:outline-none"
        >
          Add
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSpeech } from '~/composables/useSpeech'

const route = useRoute()
const isCurrenciesPage = computed(() => route.path === '/currency/currencies')

const { getVoices, setVoice, selectedVoiceURI } = useSpeech()
const voices = ref([])

const loadVoices = () => {
  voices.value = getVoices()
  if (!selectedVoiceURI.value && voices.value.length) {
    setVoice(voices.value[0].voiceURI)
  }
}

onMounted(() => {
  loadVoices()
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices
  }
})
</script>
