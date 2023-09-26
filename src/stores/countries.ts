import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Country } from '../types/country'

export const useCountriesStore = defineStore('countries', () => {
  const selectedCountry = ref<Country>()

  function setSelectedCountry(newSelectedCountry: Country) {
    selectedCountry.value = newSelectedCountry
  }

  return {
    selectedCountry,
    setSelectedCountry,
  }
})
