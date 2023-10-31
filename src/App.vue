<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import NavBar from './components/NavBar.vue'
const user = useUserStore()
</script>

<template>
  <header>
    <NavBar/>
  </header>

  <RouterView />
</template>

<style scoped></style>
