<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";


const user = useUserStore()
const router = useRouter();




let mail = ref("")
let contrasena = ref("")

const validarInfo = async () => {
  if (mail.value == "" && contrasena.value == "") {
    alert("Usuario y Contraseña deben estar completos!")
    mail = ""
    contrasena = ""
  } else {
    let respuesta = await user.login(mail.value, contrasena.value)
    if (respuesta) {
      if(user.esPaciente) {
        router.push("/homePaciente")
      } else {
        router.push("/homeMedico")
      }
    } else {
      alert("Error en el usuario o contraseña!")
    }
  }
}

</script>


<template>
  <main>
    <form class=form @submit.prevent="validarInfo()">
      <h1>Login</h1>
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="mail">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="contrasena">
      </div>
    
      <div class="col-12">
        <button class="btn btn-primary">Ingresar</button>
      </div>
      
      <RouterLink to="/register"><a>¿No tenés cuenta? Registrate!</a></RouterLink> <br>
      <RouterLink to="/olvideContrasena"><a class="font-weight-bold">Olvidé mi contraseña</a></RouterLink>
    </form>
  </main>
</template>

