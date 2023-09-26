<template>
  <div class="country-details p-3">
    <p>Country details</p>
    <div>
      <!-- cca2 refers to country code -->
      <strong>Country code:</strong>
      <p>{{ selectedCountry?.cca2 }}</p>
    </div>
    <div>
      <!-- Common name of the country -->
      <strong>Common name:</strong>
      <p>{{ selectedCountry?.name.common }}</p>
    </div>
    <div>
      <!-- Official name of the country -->
      <strong>Official name:</strong>
      <p>{{ selectedCountry?.name.official }}</p>
    </div>
    <div>
      <!-- 
        Capitals of the country, 
        apparently there are countries with more than 1 capital 
      -->
      <strong>Capital(s):</strong>
      <p>{{ capitals }}</p>
    </div>
    <div>
      <!-- 
        The continents that a country belongs to,
        Russia for example is in both Europe and Asia
      -->
      <strong>Continent(s):</strong>
      <p>{{ continents }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '../../stores/countries'

const store = useCountriesStore()
/* 
  Use storeToRefs in order to keep the reactivity intact when destructuring
*/
const { selectedCountry } = storeToRefs(store)

const capitals = computed(() => selectedCountry.value?.capital.join(', '))
const continents = computed(() => selectedCountry.value?.continents.join(', '))

</script>
<style scoped>
.country-details {
  background: #fff;
}
</style>
