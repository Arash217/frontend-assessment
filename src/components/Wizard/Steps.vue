<template>
  <ol class="d-flex justify-content-center">
    <li
      class="step p-4"
      :class="{ highlight: currentStep === Step.CountriesSearch }"
    >
      1. Search
    </li>
    <li
      class="step p-4"
      :class="{ highlight: currentStep === Step.CountryDetails }"
    >
      2. Details
    </li>
    <li
      class="step p-4"
      :class="{ highlight: currentStep === Step.SubmitForm }"
    >
      3. Submit
    </li>
  </ol>
</template>
<script setup lang="ts">
import { Step } from '../../utils/enums'

const { currentStep } = defineProps<{
  currentStep: Step
}>()
</script>
<style scoped>
.step {
  display: flex;
  color: blue;
}

.highlight {
  background: blue;
  color: white;
}
</style>
