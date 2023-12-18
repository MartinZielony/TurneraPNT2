<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const usuario = useUserStore();
const router = useRouter();

let email = ref("");
let contrasenia = ref("");

const validarInfo = async () => {
  if (email.value == "" && contrasenia.value == "") {
    alert("Usuario y Contraseña deben estar completos!");
    email = "";
    contrasenia = "";
  } else {
    let respuesta = await usuario.login(email.value, contrasenia.value);
    if (respuesta) {
      if (respuesta.esPaciente) {
        router.push("/homePaciente");
      } else {
        router.push("/homeMedico");
      }
    } else {
      alert("Error en el usuario o contraseña!");
    }
  }
};
</script>


<template>
  <main>
    <form class="form" @submit.prevent="validarInfo()">
      <h1>Login</h1>
      <div class="col-md-12">
        <label for="inputEmail4" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail4"
          v-model="email"
        />
      </div>
      <div class="col-md-12">
        <label for="inputPassword4" class="form-label">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword4"
          v-model="contrasenia"
        />
      </div>

      <div class="col-12">
        <button class="btn btn-primary">Ingresar</button>
      </div>

      <RouterLink to="/register"
        ><a>¿No tenés cuenta? Registrate!</a></RouterLink
      >
      <br />
      <RouterLink to="/olvideContrasena"
        ><a class="font-weight-bold">Olvidé mi contraseña</a></RouterLink
      >
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
.font-weight-bold {
  font-weight: bold;
}
</style>