<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, RouterLink } from "vue-router";
const user = useUserStore()
const router = useRouter();

const estasSeguro = (id) => {
  if (confirm("Estás seguro de que querés eliminar el turno?")) {
    user.eliminarTurno(id)
  }
}

</script>

<template>
  <main>
    <div class="text-center">
      <h1>Estos son tus turnos, {{ user.nombreUsuario }} {{ user.apellidoUsuario }}</h1>
      <div class="grilla">
        <div v-for="turno in user.listaTurnos">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ turno.fecha }}/{{ turno.hora }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ turno.paciente.nombre }} {{ turno.paciente.apellido }}</h6>
            <p class="card-text">Turno con el/la Dr/Dra {{ turno.medico.apellido }} {{ turno.medico.nombre }}</p>
            <button @click="estasSeguro(turno.id)" class="btn btn-danger card-link">Eliminar</button>
          </div>
        </div>
      </div>
      </div>
      <RouterLink to="/homePaciente"><button class="btn btn-primary">Volver al Inicio</button></RouterLink>
    </div>

  </main>
</template>

<style>
.grilla{
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 5%;
  justify-items: center;
  padding: 3%;
}
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
