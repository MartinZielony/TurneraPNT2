<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const selectorEspecialidad = ref("");
let medicosFiltrados = ref([]);
let fechaSeleccionada = ref("");
let horaSeleccionada = ref("");

const revelarMedicos = async() => {
  console.log("valor del selector", selectorEspecialidad.value);
  switch (selectorEspecialidad.value) {
    // cada caso llama a la acción del store getMedicosEspecialidad. Esta acción pide en la base de datos a los medicos de X especialidad
    case "1":
      medicosFiltrados.value = await useUserStore().getMedicosEspecialidad(1);
      break;
    case "2":
      medicosFiltrados.value = await useUserStore().getMedicosEspecialidad(2);;
      break;
      case "3":
      medicosFiltrados.value = await useUserStore().getMedicosEspecialidad(3);;
      break;
      case "4":
      medicosFiltrados.value = await useUserStore().getMedicosEspecialidad(4);;
      break;
      case "5":
      medicosFiltrados.value = await useUserStore().getMedicosEspecialidad(5);;
      break;
  }
  console.log(medicosFiltrados);
};

const reservado = () => {
  alert("Reservado!");
  router.push("/exitoNuevoTurno");
};

let horarios = ref([
  {
    hora: "10:00",
    disponible: true,
  },
  {
    hora: "11:00",
    disponible: false,
  },
  {
    hora: "12:00",
    disponible: false,
  },
  {
    hora: "13:00",
    disponible: true,
  },
  {
    hora: "14:00",
    disponible: true,
  },
  {
    hora: "15:00",
    disponible: true,
  },
]);
</script>

<template>
  <main>
    <div class="formulario text-center">
      <h1>Nuevo Turno</h1>
      <select
        v-model="selectorEspecialidad"
        v-on:change="revelarMedicos"
        class="form-select"
      >
       <option value="#" selected disabled>Seleccione una especialidad</option>
        <option value="1">Pediatría</option>
        <option value="2">Clínico</option>
        <option value="3">Oftalmología</option>
        <option value="4">Dermatología</option>
        <option value="5">Nutrición</option>
      </select>
      <select class="form-select">
        <option value="#" selected disabled>Seleccione un médico</option>
        <option v-for="medico in medicosFiltrados" value="medico.nombre">
          Dr/Dra  {{ medico.nombre }} {{ medico.apellido }}
        </option>
      </select>
      <input type="date" class="form-control" /> <br />
      <div class="table-container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Hora</th>
              <th scope="col">Disponible</th>
              <th scope="col">Reservar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hora in horarios">
              <th scope="row">{{ hora.hora }}</th>
              <td v-if="hora.disponible">Si</td>
              <td v-if="!hora.disponible">No</td>
              <td v-if="hora.disponible">
                <button @click="reservado" class="btn btn-success">
                  Reservar
                </button>
              </td>
              <td v-if="!hora.disponible">
                <button class="btn btn-danger" disabled>No disponible</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.formulario {
  width: 100%;
  height: 80%;
  padding: 25px;
  border-radius: 8px;
  background-color: #d1dadc;
  overflow: auto;
}
.table-container {
  height: 100%;
  overflow: auto;
  width: 100%;
}
</style>
