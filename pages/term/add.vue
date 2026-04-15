<template>
  <section class="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-gray-900/95 p-6 shadow-xl shadow-black/20">
    <div class="mb-6 border-b border-white/10 pb-5">
      <h1 class="mt-2 text-2xl font-semibold text-gray-100">Add New Term</h1>
    </div>

    <form class="space-y-4" @submit.prevent="addTerm">
      <UFormGroup label="Term" required class="mb-4">
        <UInput 
          v-model="newTerm.term" 
          placeholder="Digite o termo" 
          class="py-2 focus:ring-0 text-gray-100 dark:text-gray-100"
          aria-describedby="term-help"
        />
        <p id="term-help" class="mt-2 text-xs text-gray-500">Campo obrigatorio.</p>
      </UFormGroup>

      <UFormGroup label="Translation" required class="mb-4">
        <UInput 
          v-model="newTerm.translation" 
          placeholder="Use '|' to separate multiple translations." 
          class="py-2 focus:ring-0 text-gray-100 dark:text-gray-100"
          aria-describedby="translation-help"
        />
        <p id="translation-help" class="mt-2 text-xs text-gray-500">Campo obrigatorio. Exemplo: palavra 1 | palavra 2.</p>
      </UFormGroup>

      <UFormGroup label="Example" class="mb-4">
        <UTextarea 
          v-model="newTerm.example" 
          placeholder="Use '|' to separate multiple examples." 
          class="py-2 focus:ring-0 text-gray-100 dark:text-gray-100"
        />
      </UFormGroup>

      <UFormGroup label="Description" class="mb-4">
        <UTextarea 
          v-model="newTerm.description" 
          placeholder="Use '|' to separate multiple descriptions." 
          class="py-2 focus:ring-0 text-gray-100 dark:text-gray-100"
        />
      </UFormGroup>

      <UFormGroup label="Pronunciation" class="mb-4">
        <UInput 
          v-model="newTerm.pronunciation" 
          placeholder="Use '|' to separate multiple pronunciations." 
          class="py-2 focus:ring-0 text-gray-100 dark:text-gray-100"
        />
      </UFormGroup>

      <div class="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <UFormGroup label="Password" class="mb-0">
          <UInput 
            v-model="password" 
            type="password" 
            placeholder="Type the password" 
            class="py-2 focus:ring-0 text-gray-100 dark:text-gray-100"
          />
        </UFormGroup>
      </div>

      <UButton 
        type="submit"
        color="primary"
        block
        :loading="loading"
        class="mt-4 px-6 py-4 text-lg font-semibold transition-all duration-300 ease-in-out 
          bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </UButton>
    </form>
  </section>
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
    $toast.warning('The term and translation are required!')
    return
  }

  if (password.value !== 'ab34') {
    $toast.error('Incorrect password!')
    return
  }

  loading.value = true

  // Verifica se o termo já existe antes de enviá-lo
  const checkResponse = await useFetch(`/api/terms?term=${newTerm.value.term}`)

  if (checkResponse.data.value) {
    $toast.warning('This term already exists in the list!')
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
    $toast.error('Error adding term!')
    return
  }

  newTerm.value = { term: '', translation: '', example: '', description: '', pronunciation: '' }
  password.value = ''
  $toast.success('Term added successfully!')
}
</script>
