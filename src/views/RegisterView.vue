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

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: #d1dadc;
}

label {
  display: block;
  margin-bottom: 8px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

input {
  width: 100% !important;
  padding: 8px;
  margin-bottom: 16px;
}
a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #496c74;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.checkbox{
	width: 20px;
	height: 20px;
  border: none;
  background-color: #fff; 
}
</style>