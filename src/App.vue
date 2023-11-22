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

<style>
body{
  background: url('/src/img/bkg.jpg') center/cover fixed; 
}

h1 {
   text-align: center;
   margin-bottom: 20px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #5f7e85 !important;
  color: #fff !important;
  border: none !important;
  border-radius: 4px;
  }
  
  button:hover {
    background-color:#a4b5b9!important;
  }

  #btn-logout{
  width: min-content;
}
</style>