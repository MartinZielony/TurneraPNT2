<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../stores/user'
const user = useUserStore()
const turnos = user.listaTurnos
</script>

<template>
  <h3></h3>
</template>
