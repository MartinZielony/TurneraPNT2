<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, RouterLink } from "vue-router";
const user = useUserStore()
const router = useRouter();

//Esto está armado en base al listado de turnos del paciente, por eso las similitudes.

const estasSeguro = (id) => {
  if (confirm("Estás seguro de que querés eliminar el turno?")) {
    user.eliminarTurno(id)
  }
}
//Provisoriamente tenemos el método estasSeguro en ListadoTurnosView, pero en realidad la idea es que el cancelamiento lo maneje el objeto Turno en sí.
//Y que el botón para cancelarlo aparezca en cada elemento del listado.
</script>

<template>
  <main>
    <div class="text-center">
      <h1>Esta es su agenda, {{ user.nombreUsuario }} {{ user.apellidoUsuario }}</h1>
      <div class="grilla">
        <div v-for="turno in user.listaTurnos">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ turno.fecha }}/{{ turno.hora }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ turno.medico.nombre }} {{ turno.medico.apellido }}</h6>
            <p class="card-text">Turno con el paciente {{ turno.paciente.apellido }} {{ turno.paciente.nombre }}</p>
            <button @click="estasSeguro(turno.id)" class="btn btn-danger card-link">Eliminar</button>
          </div>
        </div>
      </div>
      </div>
      <RouterLink to="/homeMedico"><button class="btn btn-primary">Volver al Inicio</button></RouterLink>
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
</style>
