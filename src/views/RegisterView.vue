<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();

let email = ref("");
let nombre = ref("");
let apellido = ref("");
let contrasenia = ref("");
let esMedico = ref(false);
let especialidad = ref(0);
let horarioInicioAtencion = ref ("");
let horarioFinalAtencion = ref("");

const validarInfo = async() => {
  try {

    let esPaciente = !esMedico.value;
    let datosUsuario = {
      email: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      contrasenia: contrasenia.value,
      esPaciente: esPaciente,
    };

    if (esMedico.value) {
      datosUsuario.especialidad = especialidad.value;
      datosUsuario.horarioInicioAtencion = horarioInicioAtencion.value;
      datosUsuario.horarioFinalAtencion = horarioFinalAtencion.value;
      console.log("Valor de horarioFinalAtencion antes de enviar la solicitud dentro de if:", horarioFinalAtencion.value);
    }
    console.log("Valor de horarioFinalAtencion antes de enviar la solicitud:", horarioFinalAtencion.value);


    const registroExitoso = await user.register(datosUsuario);

    if (registroExitoso) {
      alert(`Bienvenido/a, ${nombre.value} ${apellido.value} !`);
      router.push("/login");
    } else {
      alert("Error en el registro. Por favor, inténtelo de nuevo.");
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    alert("Error en el registro. Por favor, inténtelo de nuevo.");
  }
};

</script>

<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <h1>Registrarse</h1>
      <div class="col-md-12">
        <label for="inputNombre4" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="inputNombre4"
          v-model="nombre"
        />
      </div>
      <div class="col-md-12">
        <label for="inputApellido" class="form-label">Apellido</label>
        <input
          type="texto"
          class="form-control"
          id="inputApellido"
          v-model="apellido"
        />
      </div>
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
      <div>
        <label for="checkbox">Soy Médico</label>
        <input
          type="checkbox"
          id="checkbox"
          class="checkbox"
          v-model="esMedico"
        />
      </div>

      <div v-if="esMedico">
        <div>
          <label for="selectEspecialidad" class="form-label"
            >Especialidad</label
          >
          <select class="form-select" name="Especialidades" id="especialidades" v-model="especialidad">
            <option value="1">Pediatría</option>
            <option value="2">Clínico</option>
            <option value="3">Oftalmología</option>
            <option value="4">Dermatología</option>
            <option value="5">Nutrición</option>
          </select>
        </div>
        <div class="col-md-12">
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
        <div class="col-md-12">
          <label for="inputHorarioFinalAtencion" class="form-label"
            >Horario de Fin de Atención</label
          >
          <input
            class="form-control"
            type="time"
            name="inputHorarioFinalAtencion"
            v-model="horarioFinalAtencion"
          />
        </div>
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary">Registrarse</button>
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

.checkbox {
  width: 20px;
  height: 20px;
  border: none;
  background-color: #fff;
}
</style>
