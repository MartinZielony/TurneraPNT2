<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter, RouterLink } from "vue-router";
import { useTurnoStore } from "../stores/turnos";


const router = useRouter();
const selectorEspecialidad = ref("");
let medicosFiltrados = ref([]);
let id_paciente = useUserStore().usuario.id;
let medicoSeleccionado = ref(null);
let fechaSeleccionada = ref("");

console.log("ID PACIENTE NUEVO TURNO ", id_paciente)

const revelarMedicos = async() => { // muestra médicos según especialidad
  console.log("valor del selector", selectorEspecialidad.value);
  switch (selectorEspecialidad.value) {
    // cada caso llama a la acción del store getMedicosEspecialidad. Esta acción pide en la base de datos a los medicos de N° especialidad
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

const reservado = async (hora) => {  // crea la reserva - recibe la hora por párametro porque es la que manda en el boton reservar
  
  // Obtener la información seleccionada
  if (medicoSeleccionado && fechaSeleccionada.value && hora) {
    
    //la API ref se utiliza para crear referencias reactivas y se accede al valor real a través de la propiedad _value

    const id_medico = medicoSeleccionado._value.id;
    
    // Llamar a la acción agregar del store con la información necesaria
    const turno = await useTurnoStore().agregar(
      fechaSeleccionada.value, // obtiene el valor del ref
      hora, // lo obtiene por párametro
      id_medico, 
      useUserStore().usuario.id, 
    );
   console.log(turno)
    alert("Reservado!");
    router.push("/exitoNuevoTurno");
  } else {
    alert("Selecciona un médico, una fecha y una hora antes de reservar.");
  }
};

let horarios = ref([ //lista de horarios para visualizar y reservar
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
       <option value="" selected disabled>Seleccione una especialidad</option>
        <option value="1">Pediatría</option>
        <option value="2">Clínico</option>
        <option value="3">Oftalmología</option>
        <option value="4">Dermatología</option>
        <option value="5">Nutrición</option>
      </select>
      <select class="form-select"  v-model="medicoSeleccionado">
      <!--El v-model le asigna el valor a la variable, en este caso medicoSeleccionado-->
        <option value="null" selected disabled>Seleccione un médico</option>
        <option v-for="medico in medicosFiltrados" :value="medico">
                <!--El :value permite especificar el valor que se asignará al modelo cuando esa opción sea seleccionada-->
          Dr/Dra  {{ medico.nombre }} {{ medico.apellido }}
        </option>
      </select>
      <input  v-model="fechaSeleccionada" type="date" class="form-control" />  
      <!--El v-model le asigna el valor a la variable, en este caso fechaSeleccionada-->
      <br /> 
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
                <button @click="reservado(hora.hora)" class="btn btn-success">
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
      <RouterLink to="/homePaciente"
        ><button class="btn btn-primary">Volver al Inicio</button></RouterLink
      >
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
