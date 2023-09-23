<template>
  <!-- Search countries with input -->
  <input type="text" placeholder="Search..." v-model="search" />
  <!-- Show loading message if API call is pending -->
  <p v-if="isLoading">Loading...</p>
  <!-- Show error if there's an error -->
  <p v-else-if="error">{{ error }}</p>
  <!-- Show "No results" countries array is empty -->
  <p v-else-if="countries.length === 0">No results</p>
  <!-- Show API call results -->
  <div v-else>
    <p>Results:</p>
    <ul class="countries m-0 p-0 gap-3 p-3 border">
      <li
        class="country d-flex flex-column border p-3"
        v-for="country in countries"
        :key="country.cca2"
        @click="showCountryDetails(country)"
      >
        <p>{{ country.name.common }}</p>
        <p>{{ country.name.official }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useCountriesStore } from '../../stores/countries'
import { storeToRefs } from 'pinia'
import { COUNTRIES_API_BASE_URL } from '../../utils/constants'
import { Country } from '../../types/country'

/* 
  Store search, countries and selectedCountry in store,
  so that we can retain state
*/
const store = useCountriesStore()
/* 
  Use storeToRefs in order to keep the reactivity intact when destructuring
*/
const { search, countries } = storeToRefs(store)
const { setSearch, setCountries, setSelectedCountry } = store

const isLoading = ref(false)
const error = ref('')

/* 
  Use WatchDebounce in order to debounce (300 milliseconds) the input of the user,
  alternatively I could have used @input with a debounce function for the input,
  but this was more convenient given the time restriction
*/
watchDebounced(
  search,
  async () => {
    // Reset values before doing an API call
    setSearch(search.value)
    setCountries([])
    error.value = ''

    // Return early if user input is less than 3 charachters
    if (search.value.length < 3) {
      return
    }

    try {
      isLoading.value = true
      // Fetch countries given the user input
      const res = await fetch(`${COUNTRIES_API_BASE_URL}/name/${search.value}`)
      const data = await res.json()

      // Handle case when no countries are found given the user input
      if (data.status === 404) {
        error.value = 'No countries found'
        return
      }

      // Set countries
      setCountries(data)
    } catch {
      // Generic error message
      error.value = 'Something went wrong'
    } finally {
      isLoading.value = false
    }
  },
  {
    debounce: 300,
  }
)

const emit = defineEmits(['showCountryDetails'])

function showCountryDetails(country: Country) {
  // Set selected country in store to show the details
  setSelectedCountry(country)
  // Emit to show CountryDetails component
  emit('showCountryDetails')
}
</script>
<style scoped>
/* I couldn't get Bootstrap's column layout working, so I used grid here */
.countries {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
}

.country:hover {
  background: lightgray;
  cursor: pointer;
}
</style>
