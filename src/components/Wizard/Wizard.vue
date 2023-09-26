<template>
  <!-- Bootstrap classes -->
  <div class="d-flex gap-5 flex-column">
    <!-- The steps of the Wizard -->
    <Steps :currentStep="currentStep" />
    <!-- Search step-->
    <TransitionGroup name="fade">
      <div key="search" v-show="currentStep === WizardStep.CountriesSearch">
        <CountriesSearch @showCountryDetails="setCountryDetailsStep" />
      </div>
      <!-- Details step-->
      <div key="details" v-show="currentStep === WizardStep.CountryDetails">
        <CountryDetails />
        <div class="d-flex mt-5 justify-content-between">
          <!-- Emit event in order to the previous step (CountriesSearch component) -->
          <button @click="setCountriesSearchStep">Previous</button>
          <!-- Emit event in order to the next step (SubmitForm component) -->
          <button @click="setSubmitFormStep">Next</button>
        </div>
      </div>
      <!-- Submit step-->
      <div key="submit" v-show="currentStep === WizardStep.SubmitForm">
        <SubmitForm>
          <template #buttons>
            <button type="button" @click="setCountryDetailsStep">
              Previous
            </button>
          </template>
        </SubmitForm>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
/* 
  Steps component cannot exist independent of the the Wizard component
  so we keep the file within the Wizard directory 
*/
import Steps from './Steps.vue'
/* 
  The components CountriesSearch, CountryDetails and SubmitForm 
  can theoretically exist independent of the Wizard component
  so we keep them in separate directories
*/
import CountriesSearch from '../CountriesSearch/CountriesSearch.vue'
import CountryDetails from '../CountryDetails/CountryDetails.vue'
import SubmitForm from '../SubmitForm/SubmitForm.vue'
import { WizardStep } from '../../utils/enums'

// Keep track of the current step
const currentStep = ref(WizardStep.CountriesSearch)

function setCountriesSearchStep() {
  currentStep.value = WizardStep.CountriesSearch
}

function setCountryDetailsStep() {
  currentStep.value = WizardStep.CountryDetails
}

function setSubmitFormStep() {
  currentStep.value = WizardStep.SubmitForm
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  display: none;
}
</style>
