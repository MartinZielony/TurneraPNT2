<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";
const user = useUserStore()
const router = useRouter();
</script>

<template>
  <main>
    <div class="text-center">
      <h1>Bienvenido, {{ user.nombreUsuario }} {{ user.apellidoUsuario }}</h1>
      <button @click="router.push('/pacienteNuevoTurno')" class="btn btn-primary m-1">Sacar un Turno</button>
      <button class="btn btn-primary m-1">Ver mis Turnos</button>
    </div>

  </main>
</template>

