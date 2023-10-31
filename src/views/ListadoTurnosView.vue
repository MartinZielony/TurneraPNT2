<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, RouterLink } from "vue-router";
const user = useUserStore()
const router = useRouter();

const estasSeguro = () => {
  confirm("Estás seguro de que querés cancelar el turno?")
}
//Provisoriamente tenemos el método estasSeguro en ListadoTurnosView, pero en realidad la idea es que el cancelamiento lo maneje el objeto Turno en sí.
//Y que el botón para cancelarlo aparezca en cada elemento del listado.
</script>

<template>
  <main>
    <div class="text-center">
      <h1>Estos son tus turnos, {{ user.nombreUsuario }} {{ user.apellidoUsuario }}</h1>
      <!--Acá habría que utilizar un componente "Turno" que incluya botones para cancelar o detallar turnos-->
      <RouterLink to="/homePaciente"><button class="btn btn-primary">Volver al Inicio</button></RouterLink>
    </div>

  </main>
</template>

