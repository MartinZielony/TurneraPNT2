<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const user = useUserStore();
const router = useRouter();

let mail = ref("");

const validarInfo = () => {
  if (mail.value == "") {
    alert("Campo Mail debe estar completo!");
    mail = "";
  } else {
    alert("Te enviaremos un mail para que resetees tu contraseña.");
    router.push("/login");
  }
};
</script>


<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <h1>Recupera tu cuenta</h1>

      <a
        >Un correo será enviado a tu casilla y podrás seguir las instrucciones
        para continuar</a
      >
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail4"
          v-model="mail"
        />
      </div>
      <div class="col-12">
        <button class="btn btn-primary">Restablecer contraseña</button>
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
</style>
