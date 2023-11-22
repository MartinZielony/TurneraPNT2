<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useMedicosStore } from '../stores/medicos'
import { useRouter, RouterLink } from "vue-router";
const medicos = useMedicosStore()
const router = useRouter();

</script>

<template>
  <main>
    <div class="text-center">
      <h1>Sacaste un turno nuevo con el medico NOMBRE APELLIDO en la fecha DÍA HORA</h1>
      <!--RECIBIR ACÁ LA INFO DEL MEDICO SELECCIONADO AL SACAR EL TURNO-->
      <!--MISMO CASO CON LA FECHA SELECCIONADA-->
      
      
      
      <RouterLink to="/homePaciente"><button class="btn btn-primary">Volver al Inicio</button></RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.text-center {
  width: 100%;
  height: 80%;
  padding: 20px;
  border-radius: 8px;
  background-color: #d1dadc;
}
</style>