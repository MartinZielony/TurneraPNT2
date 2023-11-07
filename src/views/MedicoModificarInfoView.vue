<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";
const user = useUserStore()
const router = useRouter();

let mail = user.correoUsuario
let nombre = user.nombreUsuario
let apellido = user.apellidoUsuario
let horarioInicioAtencion = user.horarioInicioAtencion
let horarioFinAtencion = user.horarioFinAtencion

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
        <label for="inputName4" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inputNombre4" v-model="nombre">
      </div>

      <div class="col-md-6">
        <label for="inputApellido4" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="inputApellido4" v-model="apellido">
      </div>

      <label for="inputHorarioInicioAtencion" class="form-label">Horario de Inicio de Atención</label>
      <input type="time" name="inputHorarioInicioAtencion" v-model="horarioInicioAtencion">
      <label for="inputHorarioFinAtencion" class="form-label">Horario de Fin de Atención</label>
      <input type="time" name="inputHorarioFinAtencion" v-model="horarioFinAtencion"> <br>

      <label for="selectEspecialidad" class="form-label">Especialidad</label>
      <select class="form-select" name="Especialidades" id="especialidades">
        <option value="1">Pediatría</option>
        <option value="2">Clínico</option>
        <option value="3">Urólogo</option>
      </select>
      <div class="col-12">
        <button class="btn btn-primary">Modificar</button>
      </div>
    </form>
  </main>
</template>
