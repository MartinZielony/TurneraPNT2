<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";
const user = useUserStore()
const router = useRouter();

let mail = ref("")

const validarInfo = () => {
  if (mail.value == "") {
    alert("Campo Mail debe estar completo!")
    mail = ""
  } else {
    alert("Te enviaremos un mail para que resetees tu contraseña.")
    router.push("/login")
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <h1>Resetear Contraseña</h1>
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="mail">
      </div>
      <div class="col-12">
        <button class="btn btn-primary">Resetear Contraseña</button>
      </div>
    </form>
  </main>
</template>
