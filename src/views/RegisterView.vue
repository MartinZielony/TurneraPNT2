<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";
const user = useUserStore()
const router = useRouter();

let mail = ref("")
let nombre = ref("")
let apellido = ref("")
let contrasena = ref("")
let esMedico = ref(false)

const validarInfo = () => {
  if (mail.value == "" && contrasena.value == "") {
    alert("Usuario y Contraseña deben estar completos!")
    mail = ""
    contrasena = ""
  } else {
    let respuesta = user.register(mail.value, contrasena.value, nombre.value, apellido.value, esMedico)
  }
}

const registrar = () => {
  validarInfo()
}

</script>

<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <h1>Registrarse</h1>
      <div class="col-md-6">
        <label for="inputNombre4" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inputNombre4" v-model="nombre">
      </div>
      <div class="col-md-6">
        <label for="inputApellido" class="form-label">Apellido</label>
        <input type="texto" class="form-control" id="inputApellido" v-model="apellido">
      </div>
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="mail">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="contrasena">
      </div>
      <input type="checkbox" id="checkbox" v-model="esMedico" />
      <label for="checkbox">Soy Médico</label>
      <br>
      <div class="col-12">
        <button @click="registrar" class="btn btn-primary">Registrarse</button>
      </div>
    </form>
  </main>
</template>
