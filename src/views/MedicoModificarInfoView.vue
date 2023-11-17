<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const user = useUserStore();
const router = useRouter();

let mail = user.correoUsuario;
let nombre = user.nombreUsuario;
let apellido = user.apellidoUsuario;
let horarioInicioAtencion = user.horarioInicioAtencion;
let horarioFinAtencion = user.horarioFinAtencion;

const validarInfo = () => {
  if (mail.value == "" && contrasena.value == "") {
    alert("Usuario y Contraseña deben estar completos!");
    mail = "";
    contrasena = "";
  } else {
    let respuesta = user.login(mail.value, contrasena.value);
    if (respuesta && user.esPaciente) {
      router.push("/homePaciente");
    }
  }
};
</script>

<template>
  <main>
    <form class="formulario text-center" @submit.prevent="validarInfo()">
      <h1>Modificar perfil de <b>Médico</b></h1>
      <div>
        <label for="inputEmail4" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail4"
          v-model="mail"
        />
      </div>

      <div>
        <label for="inputName4" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="inputNombre4"
          v-model="nombre"
        />
      </div>

      <div>
        <label for="inputApellido4" class="form-label">Apellido</label>
        <input
          type="text"
          class="form-control"
          id="inputApellido4"
          v-model="apellido"
        />
      </div>

      <div>
        <label for="inputHorarioInicioAtencion" class="form-label"
          >Horario de Inicio de Atención</label
        >
        <input
          class="form-control"
          type="time"
          name="inputHorarioInicioAtencion"
          v-model="horarioInicioAtencion"
        />
      </div>

      <div>
        <label for="inputHorarioFinAtencion" class="form-label"
          >Horario de Fin de Atención</label
        >
        <input
          class="form-control"
          type="time"
          name="inputHorarioFinAtencion"
          v-model="horarioFinAtencion"
        />
      </div>

      <div>
        <label for="selectEspecialidad" class="form-label">Especialidad</label>
        <select class="form-select" name="Especialidades" id="especialidades">
          <option value="1">Pediatría</option>
          <option value="2">Clínico</option>
          <option value="3">Urólogo</option>
        </select>
      </div>
      <br />
      <div>
        <button class="btn btn-primary">Modificar</button>
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
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: #d1dadc;
}
</style>