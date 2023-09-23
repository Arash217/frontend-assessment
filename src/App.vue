<template>
  <!-- Bootstrap classes -->
  <main class="d-flex justify-content-center align-items-center">
    <Wizard />
  </main>
</template>

<script setup lang="ts">
import Wizard from './components/Wizard/Wizard.vue'
</script>

<style>
/* Set height of containers to 100% so that the Wizard component can be vertically centered */
html,
body,
#app,
main {
  height: 100%;
}

body {
  background: #f2f1f1;
}
</style>
