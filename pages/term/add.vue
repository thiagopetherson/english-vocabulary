<template>
  <div class="p-6 max-w-2xl mx-auto bg-gray-900 shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Add New Term</h2>

    <UFormGroup label="Term" class="mb-4">
      <UInput 
        v-model="newTerm.term" 
        placeholder="Digite o termo" 
        class="py-2 focus:ring-0"
      />
    </UFormGroup>

    <UFormGroup label="Translation" class="mb-4">
      <UInput 
        v-model="newTerm.translation" 
        placeholder="Use '|' to separate multiple translations." 
        class="py-2 focus:ring-0"
      />
    </UFormGroup>

    <UFormGroup label="Example" class="mb-4">
      <UTextarea 
        v-model="newTerm.example" 
        placeholder="Use '|' to separate multiple examples." 
        class="py-2 focus:ring-0"
      />
    </UFormGroup>

    <UFormGroup label="Description" class="mb-4">
      <UTextarea 
        v-model="newTerm.description" 
        placeholder="Use '|' to separate multiple descriptions." 
        class="py-2 focus:ring-0"
      />
    </UFormGroup>

    <UFormGroup label="Pronunciation" class="mb-4">
      <UInput 
        v-model="newTerm.pronunciation" 
        placeholder="Use '|' to separate multiple pronunciations." 
        class="py-2 focus:ring-0"
      />
    </UFormGroup>

    <UFormGroup label="Password" class="mb-4">
      <UInput 
        v-model="password" 
        type="password" 
        placeholder="Type the password" 
        class="py-2 focus:ring-0"
      />
    </UFormGroup>

    <UButton 
      @click="addTerm"
      color="primary"
      block
      :loading="loading"
      class="mt-4 px-6 py-4 text-lg font-semibold transition-all duration-300 ease-in-out 
        bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Save
    </UButton>
  </div>
</template>

<script setup>
const { $toast } = useNuxtApp()

const newTerm = ref({
  term: '',
  translation: '',
  example: '',
  description: '',
  pronunciation: ''
})

const password = ref('')
const loading = ref(false)

const addTerm = async () => {
  if (!newTerm.value.term || !newTerm.value.translation) {
    $toast.warning('O termo e a tradução são obrigatórios!')
    return
  }

  if (password.value !== 'ab34') {
    $toast.error('Senha incorreta!')
    return
  }

  loading.value = true

  // Verifica se o termo já existe antes de enviá-lo
  const checkResponse = await useFetch(`/api/terms?term=${newTerm.value.term}`)

  if (checkResponse.data.value) {
    $toast.warning('Este termo já existe no dicionário!')
    loading.value = false
    return
  }

  // Se não existir, adiciona o termo
  const response = await useFetch('/api/terms', {
    method: 'POST',
    body: newTerm.value,
    cache: 'no-cache'
  })

  loading.value = false

  if (response.error.value) {
    $toast.error('Erro ao adicionar termo!')
    return
  }

  newTerm.value = { term: '', translation: '', example: '', description: '', pronunciation: '' }
  password.value = ''
  $toast.success('Termo adicionado com sucesso!')
}
</script>
