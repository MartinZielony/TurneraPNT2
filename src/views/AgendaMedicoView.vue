<script setup>
import { ref, onMounted } from "vue"; // onMounted se ejecuta al renderizar la página
import { storeToRefs } from "pinia"; // convierte propiedades del store de pinia en referencias reactivas de vue
import { useUserStore } from "../stores/user";
import { useTurnoStore } from "../stores/turnos";
import { useRouter, RouterLink } from "vue-router";

const { turno } = storeToRefs(useTurnoStore());
const { usuario } = storeToRefs(useUserStore());
const router = useRouter();
const pacienteNombres = ref({});

onMounted(async () => {
  // función para ver los valores del paciente
  console.log("Valor de usuario en Agenda :", usuario.value);

  for (const turno of usuario.value.turnos) {
    await obtenerPaciente(turno.id_paciente);
  }
});

const obtenerPaciente = async (id_paciente) => {
  try {
    // busca al paciente a través de la acción del store
    const paciente = await useUserStore().getUsuarioPorId(id_paciente);

    // agrega en el elemento del array con su nombre completo si paciente existe
    pacienteNombres.value[id_paciente] = paciente
      ? `${paciente.nombre} ${paciente.apellido}`
      : "Paciente no encontrado";
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    pacienteNombres.value[id_paciente] = "Error al obtener paciente";
  }
};

const obtenerPorId = (id_paciente) => {
  // muestra el valor del array en esa posicion
  return pacienteNombres.value[id_paciente] || "Nombre no encontrado";
};

const estasSeguro = async (id) => {
  if (confirm("Estás seguro de que querés cancelar el turno?")) {
    //usa la acción del store para eliminar
    const eliminacionExitosa = await useTurnoStore().delete(id);

    // actualiza la lista de turnos en la vista si la eliminación fue exitosa
    if (eliminacionExitosa) {
      // actualzia la referencia de usuario.turnos
      usuario.value.turnos = await loadTurnos();
    }
  }
};

const loadTurnos = async () => {
  try {
    // Cargamos la lista de turnos y retornamos la data
    const response = await useTurnoStore().loadTurnos();
    return response.data;
  } catch (error) {
    console.error("Error al cargar los turnos:", error);
    return [];
  }
};
</script>

<template>
  <main>
    <div class="text-center" style="height: fit-content">
      <h1>Esta es su agenda, {{ usuario.nombre }} {{ usuario.apellido }}</h1>

      <div class="grilla">
        <div v-for="turno in usuario.turnos" :key="turno.id">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ turno.fecha }} / {{ turno.hora }}</h5>
              <hr />
              <p class="card-text">
                Turno con el paciente
                <b>{{ obtenerPorId(turno.id_paciente) }}</b>
              </p>
              <button
                @click="estasSeguro(turno.id)"
                class="btn btn-danger card-link"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      <RouterLink to="/homeMedico">
        <button class="btn btn-primary">Volver al Inicio</button>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.grilla {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 5%;
  justify-items: center;
  padding: 3%;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-center {
  width: 100%;
  border-radius: 8px;
  background-color: #d1dadc;
}
</style>
