<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useRouter, RouterLink } from "vue-router";

const store = useUserStore();
const { usuario } = storeToRefs(store);
console.log("Valor de usuario en MedicoHomeView:", usuario);

</script>


<template>
  <main>
    <div class="text-center">
      <h1>Bienvenido, {{  usuario.nombre }} {{usuario.apellido }}</h1>
      <RouterLink to="/agendaMedico"
        ><button class="btn btn-primary m-1">Ver Agenda</button></RouterLink
      >
      <RouterLink to="/modificarInfoMedico"
        ><button class="btn btn-primary m-1">
          Modificar Información
        </button></RouterLink
      >
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
