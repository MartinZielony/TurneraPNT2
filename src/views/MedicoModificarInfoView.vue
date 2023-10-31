<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";
const user = useUserStore()
const router = useRouter();

let mail = ref("")
let contrasena = ref("")

const validarInfo = () => {
  if (mail.value == "" && contrasena.value == "") {
    alert("Usuario y Contraseña deben estar completos!")
    mail = ""
    contrasena = ""
  } else {
    let respuesta = user.login(mail.value, contrasena.value)
    if (respuesta && user.esPaciente) {
      router.push("/homePaciente")
    }
  }
}

</script>

<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <h1>Modificar Perfil de Médico</h1>
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="mail">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="contrasena">
      </div>

      <div class="col-md-6">
        <label for="inputName4" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inputNombre4">
      </div>

      <div class="col-md-6">
        <label for="inputApellido4" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="inputApellido4">
      </div>

      <label for="inputHorarioInicioAtencion" class="form-label">Horario de Inicio de Atención</label>
      <input type="datetime-local" name="inputHorarioInicioAtencion"> <br>
      <label for="inputHorarioFinAtencion" class="form-label">Horario de Fin de Atención</label>
      <input type="datetime-local" name="inputHorarioFinAtencion">

      <select class="form-select" name="Especialidades" id="especialidades">
        <option value="1">Pediatría</option>
        <option value="2">Clínico</option>
        <option value="3">Urólogo</option>
      </select>

      <button class="btn btn-primary">Agregar Especialidad</button>
      <button class="btn btn-danger">Eliminar Especialidad</button>
      <!--Esto es provisorio, agregar o eliminar varias especialidades al a vez se tiene que manejar distinto-->
      <div class="col-12">
        <button class="btn btn-primary">Modificar</button>
      </div>
    </form>
  </main>
</template>
