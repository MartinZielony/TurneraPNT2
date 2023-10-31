<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, RouterLink } from "vue-router";
const user = useUserStore()
const router = useRouter();
</script>

<template>
  <main>
    <div class="text-center">
      <h1>Bienvenido, {{ user.nombreUsuario }} {{ user.apellidoUsuario }}</h1>
      <RouterLink to="/agendaMedico"><button class="btn btn-primary m-1">Ver Agenda</button></RouterLink>
      <RouterLink to="/modificarInfoMedico"><button class="btn btn-primary m-1">Modificar Información</button></RouterLink>
    </div>

  </main>
</template>

