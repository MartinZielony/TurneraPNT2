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
    let respuesta = user.register(mail.value, contrasena.value)
    if (respuesta && user.esPaciente) {
      router.push("/homePaciente")
    }
  }
}

const registrar = () => {
  alert("Te registraste!")
  router.push("/login")
}

</script>


<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <h1>Registrarse</h1>
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="mail">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="contrasena">
      </div>
      <br>
      <div class="col-12">
        <button @click="registrar" class="btn btn-primary">Registrarse</button>
      </div>
    </form>
  </main>
</template>

