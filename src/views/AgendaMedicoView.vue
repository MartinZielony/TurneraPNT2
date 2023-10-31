<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, RouterLink } from "vue-router";
const user = useUserStore()
const router = useRouter();

//Esto está armado en base al listado de turnos del paciente, por eso las similitudes.

const estasSeguro = () => {
  confirm("Estás seguro de que querés cancelar el turno?")
}
//Provisoriamente tenemos el método estasSeguro en ListadoTurnosView, pero en realidad la idea es que el cancelamiento lo maneje el objeto Turno en sí.
//Y que el botón para cancelarlo aparezca en cada elemento del listado.
</script>

<template>
  <main>
    <div class="text-center">
      <h1>Esta es su agenda, {{ user.nombreUsuario }} {{ user.apellidoUsuario }}</h1>
      <!--Acá habría una lista similar a la de ListadoTurnosView pero quizás con algunos aspectos distintos, siendo que es el médico quien los está consultando.-->
      <RouterLink to="/homeMedico"><button class="btn btn-primary">Volver al Inicio</button></RouterLink>
    </div>

  </main>
</template>

