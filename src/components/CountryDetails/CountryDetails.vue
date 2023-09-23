<template>
  <div class="country-details p-3">
    <p>Country details</p>
     <!-- 
      Note: we use the non-null assertion operator (!) with selectedCountry,
      in order to tell the TypeScript compiler that selectedCountry is not undefined,
      since we fetch the countries in the previous step (CountriesSearch component)
      and let the user select a country.
    -->
    <div>
      <!-- cca2 refers to country code -->
      <strong>Country code:</strong>
      <p>{{ selectedCountry!.cca2 }}</p>
    </div>
    <div>
      <!-- Common name of the country -->
      <strong>Common name:</strong>
      <p>{{ selectedCountry!.name.common }}</p>
    </div>
    <div>
      <!-- Official name of the country -->
      <strong>Official name:</strong>
      <p>{{ selectedCountry!.name.official }}</p>
    </div>
    <div>
      <!-- 
        Capitals of the country, 
        apparently there are countries with more than 1 capital 
      -->
      <strong>Capital:</strong>
      <p>{{ selectedCountry!.capital.join(', ') }}</p>
    </div>
    <div>
      <!-- 
        The continents that a country belongs to,
        Russia for example is in both Europe and Asia
      -->
      <strong>Continents:</strong>
      <p>{{ selectedCountry!.continents.join(', ') }}</p>
    </div>
  </div>

  <div class="d-flex justify-content-between">
    <!-- Emit event in order to the previous step (CountriesSearch component) -->
    <button @click="emit('showCountriesSearch')">Previous</button>
    <!-- Emit event in order to the next step (SubmitForm component) -->
    <button @click="emit('showSubmitForm')">Next</button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '../../stores/countries'

const store = useCountriesStore()
/* 
  Use storeToRefs in order to keep the reactivity intact when destructuring
*/
const { selectedCountry } = storeToRefs(store)

const emit = defineEmits(['showCountriesSearch', 'showSubmitForm'])
</script>
<style scoped>
.country-details {
  background: #fff;
}
</style>
