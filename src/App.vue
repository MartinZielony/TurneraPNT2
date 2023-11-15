<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import NavBar from './components/NavBar.vue'
//LN - conexion a styles
import '@/styles/styles.css';
const user = useUserStore()
</script>

<template>
  <header>
    <NavBar/>
  </header>

  <RouterView />
</template>

<style scoped>
body{
  background-color: white;
}
</style>
