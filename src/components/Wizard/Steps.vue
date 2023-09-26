<template>
  <ol class="d-flex justify-content-center">
    <Step :class="{ highlight: currentStep === WizardStep.CountriesSearch }">
      1. Search
    </Step>
    <Step :class="{ highlight: currentStep === WizardStep.CountryDetails }">
      2. Details
    </Step>
    <Step :class="{ highlight: currentStep === WizardStep.SubmitForm }">
      3. Submit
    </Step>
  </ol>
</template>
<script setup lang="ts">
import Step from './Step.vue'
import { WizardStep } from '../../utils/enums'

const { currentStep } = defineProps<{
  currentStep: WizardStep
}>()
</script>
<style scoped>
.highlight {
  background: blue;
  color: white;
}
</style>
