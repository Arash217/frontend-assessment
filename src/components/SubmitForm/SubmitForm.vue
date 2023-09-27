<template>
  <form class="d-flex gap-3 flex-column" @submit.prevent="handleSubmit">
    <div class="form-group row">
      <label for="firstName" class="col-4">First Name *</label>
      <div class="col-8">
        <input id="firstName" v-model="form.firstName" />
      </div>
      <p class="text-danger" v-for="error in v$.firstName.$errors">
        {{ error.$message }}
      </p>
    </div>
    <div class="form-group row">
      <label for="lastName" class="col-4">Last Name</label>
      <div class="col-8">
        <input id="lastName" v-model="form.lastName" />
      </div>
      <p class="text-danger" v-for="error in v$.lastName.$errors">
        {{ error.$message }}
      </p>
    </div>
    <div class="form-group row">
      <label for="email" class="col-4">Email *</label>
      <div class="col-8">
        <input id="email" v-model="form.email" />
      </div>
      <p class="text-danger" v-for="error in v$.email.$errors">
        {{ error.$message }}
      </p>
    </div>
    <p class="text-success" v-if="showSuccessMessage">
      Form successfully validated
    </p>
    <div class="d-flex justify-content-between mt-5">
      <slot name="buttons" />
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { Form } from '../../types/form'

const form = ref<Form>({
  firstName: '',
  lastName: '',
  email: '',
})

const showSuccessMessage = ref(false)

// Validation rules
const rules = {
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  email: {
    required,
    email,
  },
}

const v$ = useVuelidate(rules, form)

// Handle form submit
async function handleSubmit() {
  // Validate form
  const isValidated = await v$.value.$validate()

  // If form is valid, show the success message
  if (isValidated) {
    showSuccessMessage.value = true
  }
}
</script>
