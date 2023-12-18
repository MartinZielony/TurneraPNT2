<script setup>
import { onMounted, onUpdated, ref } from "vue"; // onMounted se ejecuta al renderizar la página, onUpdate luego de un cambio
import { useUserStore } from "../stores/user";
import { RouterLink } from "vue-router";

const store = useUserStore();
const usuario = ref(store.usuario); // Obtiene el usuario como una referencia

onMounted(() => {
  console.log("Componente montado usuario:", usuario.value);
});

onUpdated(() => {
  console.log("ID del usuario después de la actualización:", usuario.value);
  usuario.usuario = store.getUsuarioPorId(usuario.value.id);
});

let emailNuevo = ref(usuario.value.email);
let nombreNuevo = ref(usuario.value.nombre);
let apellidoNuevo = ref(usuario.value.apellido);
let horarioInicioAtencionNuevo = ref(usuario.value.horarioInicioAtencion);
let horarioFinAtencionNuevo = ref(usuario.value.horarioFinAtencion);
let especialidadNuevo = ref(usuario.value.especialidad);

const editar = async () => {
  console.log("ID del usuario:", usuario.value.id);

  // Llama a la acción editarUsuario del store y le envía los valores
  await store.editarUsuario({
    id: usuario.value.id,
    email: emailNuevo.value,
    nombre: nombreNuevo.value,
    apellido: apellidoNuevo.value,
    esPaciente: usuario.value.esPaciente,
    horarioInicioAtencion: horarioInicioAtencionNuevo.value,
    horarioFinAtencion: horarioFinAtencionNuevo.value,
    especialidad: especialidadNuevo.value,
  });

  console.log("USUARIO LUEGO DE ACTUALIZAR ", usuario.value);
};
</script>

<template>
  <main>
    <form class="formulario text-center" @submit.prevent="editar()">
      <h1>Modificar perfil de <b>Médico</b></h1>
      <div>
        <label for="inputEmail4" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail4"
          v-model="emailNuevo"
        />
      </div>

      <div>
        <label for="inputName4" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="inputNombre4"
          v-model="nombreNuevo"
        />
      </div>

      <div>
        <label for="inputApellido4" class="form-label">Apellido</label>
        <input
          type="text"
          class="form-control"
          id="inputApellido4"
          v-model="apellidoNuevo"
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
          v-model="horarioInicioAtencionNuevo"
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
          v-model="horarioFinAtencionNuevo"
        />
      </div>
      <!--El usuario tiene un atributo numerico llamado especialidad, asignar valor del value del select a ese atributo-->
      <div>
        <label for="selectEspecialidad" class="form-label">Especialidad</label>
        <select class="form-select" name="Especialidades" id="especialidades" v-model="especialidadNuevo">
          <option value="1">Pediatría</option>
          <option value="2">Clínico</option>
          <option value="3">Oftalmología</option>
          <option value="4">Dermatología</option>
          <option value="5">Nutrición</option>
        </select>
      </div>
      <br />
      <div>
        <button type="submit" class="btn btn-primary">Modificar</button>
        <RouterLink to="/homeMedico"> <button class="btn btn-primary">Volver al Inicio</button> </RouterLink>
      </div>
    </form>
    
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: #d1dadc;
  height: 80%;
  overflow: auto;
}
</style>
