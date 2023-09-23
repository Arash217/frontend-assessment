import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Country } from '../types/country'

// Pinia store for countries data in order to retain state
export const useCountriesStore = defineStore('countries', () => {
  const _search = ref('')
  const _countries = ref<Country[]>([])
  const _selectedCountry = ref<Country>()

  function setSearch(search: string) {
    _search.value = search
  }

  function setCountries(countries: Country[]) {
    _countries.value = countries
  }

  function setSelectedCountry(selectedCountry: Country) {
    _selectedCountry.value = selectedCountry
  }

  return {
    search: _search,
    countries: _countries,
    selectedCountry: _selectedCountry,
    setSearch,
    setCountries,
    setSelectedCountry,
  }
})
