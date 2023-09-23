<template>
  <!-- Bootstrap classes -->
  <div class="d-flex gap-5 flex-column">
    <!-- The steps of the Wizard -->
    <Steps :currentStep="currentStep" />
    <!-- Search step-->
    <CountriesSearch
      v-if="currentStep === Step.CountriesSearch"
      @showCountryDetails="currentStep = Step.CountryDetails"
    />
    <!-- Details step-->
    <CountryDetails
      v-if="currentStep === Step.CountryDetails"
      @showCountriesSearch="currentStep = Step.CountriesSearch"
      @showSubmitForm="currentStep = Step.SubmitForm"
    />
    <!-- Submit step-->
    <SubmitForm
      v-if="currentStep === Step.SubmitForm"
      @showCountryDetails="currentStep = Step.CountryDetails"
    />
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
import { Step } from '../../utils/enums'

// Keep track of the current step
const currentStep = ref(Step.CountriesSearch)
</script>
