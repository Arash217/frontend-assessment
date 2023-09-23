import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Form } from '../types/form'

// Pinia store for the form data in order to retain state
export const useFormStore = defineStore('form', () => {
  const form = ref<Form>({
    firstName: '',
    lastName: '',
    email: '',
  })

  return {
    form
  }
})
