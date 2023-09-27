<template>
  <ul class="countries m-0 gap-3 p-3 border">
    <li
      class="country d-flex flex-column border p-3"
      v-for="country in countries"
      :key="country.cca2"
      @click="emit('selectedCountry', country)"
    >
      <p>{{ country.name.common }}</p>
      <p>{{ country.name.official }}</p>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { Country } from '../../types/country'

const { countries } = defineProps<{
  countries: Country[]
}>()

const emit = defineEmits<{
  selectedCountry: [country: Country]
}>()
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
