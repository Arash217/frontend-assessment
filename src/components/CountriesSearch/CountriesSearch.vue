<template>
  <div class="d-flex gap-5 flex-column">
    <!-- Search countries with input -->
    <input
      type="text"
      placeholder="Search..."
      @input="debouncedSearch($event)"
    />
    <!-- Show loading message if API call is pending -->
    <p v-if="isLoading">Loading...</p>
    <!-- Show error if there's an error -->
    <p v-else-if="error">{{ error }}</p>
    <!-- Show "No results" countries array is empty -->
    <p v-else-if="countries.length === 0">No results</p>
    <!-- Show API call results -->
    <div v-else>
      <p>Results:</p>
      <CountriesList
        :countries="countries"
        @selectedCountry="showCountryDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountriesStore } from '../../stores/countries'
import { COUNTRIES_API_BASE_URL } from '../../utils/constants'
import { Country } from '../../types/country'
import { debounce } from '../../utils/debounce'
import CountriesList from '../CountriesList/CountriesList.vue'

const countries = ref<Country[]>([])
const isLoading = ref(false)
const error = ref('')

const store = useCountriesStore()
const { setSelectedCountry } = store

async function search(e: Event) {
  const search = (e.target as HTMLInputElement).value
  countries.value = []
  error.value = ''

  // Return early if user input is less than 3 charachters
  if (search.length < 3) {
    return
  }

  try {
    isLoading.value = true
    // Fetch countries given the user input
    const res = await fetch(`${COUNTRIES_API_BASE_URL}/name/${search}`)
    const data = await res.json()

    // Handle case when no countries are found given the user input
    if (data.status === 404) {
      error.value = 'No countries found'
      return
    }

    // Set countries
    countries.value = data
  } catch {
    // Generic error message
    error.value = 'Something went wrong'
  } finally {
    isLoading.value = false
  }
}

const debouncedSearch = debounce(search)

const emit = defineEmits(['showCountryDetails'])

function showCountryDetails(country: Country) {
  // Set selected country in store to show the details
  setSelectedCountry(country)
  // Emit to show CountryDetails component
  emit('showCountryDetails')
}
</script>
