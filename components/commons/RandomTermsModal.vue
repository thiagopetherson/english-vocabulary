<template>
  <div>
    <!-- Botão para abrir o modal -->
    <button @click="openModal" class="btn btn-primary">Show random terms</button>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2 class="mb-[30px] text-[1.7rem]">Random Terms</h2>
        <ul class="list-none p-0">
          <li v-for="(term, index) in randomTerms" :key="index" class="mb-[10px] text-[1.1rem]">
            <strong>{{ term.term }}</strong>
          </li>
        </ul>
        <button 
          @click="closeModal" 
          class="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 mt-[30px] rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

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

  .modal
    max-width: 400px
    max-height: 80vh
    overflow-y: auto
    text-align: center

</style>
