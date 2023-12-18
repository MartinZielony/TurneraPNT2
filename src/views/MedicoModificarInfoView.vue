<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useUserStore } from "../stores/user";

const usuario = useUserStore();

onMounted(() => {
  console.log('Componente montado. ID del usuario:', usuario.value.id);
});

onUpdated(() => {
  console.log('ID del usuario después de la actualización:', usuario.id);
});


let email = ref(usuario.email);
let nombre = ref(usuario.nombre);
let apellido = ref(usuario.apellido);
let horarioInicioAtencion = ref(usuario.horarioInicioAtencion);
let horarioFinAtencion = ref(usuario.horarioFinAtencion);
let especialidad = ref(usuario.especialidad);


const editar = async() => {
  console.log("ID del usuario:", usuario.id);



  // llamar a la acción editarUsuario(usuario) de useusuarioStore
  await usuario.editarUsuario({
    email: email.value,
    nombre: nombre.value,
    apellido: apellido.value,
    esPaciente: usuario.esPaciente,
    horarioInicioAtencion: horarioInicioAtencion.value,
    horarioFinAtencion: horarioFinAtencion.value,
    especialidad: especialidad.value,
  });

    // Actualiza el usuario en el store con los nuevos valores
    usuario.usuario = {
    id: usuario.id,
    email: email.value,
    nombre: nombre.value,
    apellido: apellido.value,
    esPaciente: usuario.esPaciente,
    horarioInicioAtencion: horarioInicioAtencion.value,
    horarioFinAtencion: horarioFinAtencion.value,
    especialidad: especialidad.value,
  };
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
          v-model="email"
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
      <!--El usuario tiene un atributo numerico llamado especialidad, asignar valor del value del select a ese atributo-->
      <div>
        <label for="selectEspecialidad" class="form-label">Especialidad</label>
        <select class="form-select" name="Especialidades" id="especialidades">
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