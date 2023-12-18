<script setup>
import { ref, onMounted } from "vue"; // onMounted se ejecuta al renderizar la página
import { storeToRefs } from "pinia"; // convierte propiedades del store de pinia en referencias reactivas de vue
import { useUserStore } from "../stores/user";
import { useTurnoStore } from "../stores/turnos";
import { useRouter, RouterLink } from "vue-router";

const { usuario } = storeToRefs(useUserStore());
const medicoNombres = ref({});

onMounted(async () => {
  // función para ver los valores del medico
  console.log("Valor de usuario en Turnos :", usuario.value);
  for (const turno of usuario.value.turnos) {
    await obtenerMedico(turno.id_medico);
  }
});

const obtenerMedico = async (id_medico) => {
  try {
    // busca al médico a través de la acción del store
    const medico = await useUserStore().getUsuarioPorId(id_medico);

    if (medico) {
      // agrega al médico en el elemento del array con su nombre completo y nombre de especialidad
      medicoNombres.value[id_medico] = {
        nombreCompleto: `${medico.nombre} ${medico.apellido}`,
        especialidad: obtenerNombreEspecialidad(medico.especialidad), // obtiene el nombre de la especialidad a través de un valor
      };
    } else {
      medicoNombres.value[id_medico] = "Médico no encontrado";
    }
  } catch (error) {
    console.error("Error al obtener médico:", error);
    medicoNombres.value[id_medico] = "Error al obtener médico";
  }
};

const obtenerNombreEspecialidad = (codigoEspecialidad) => {
  switch (codigoEspecialidad) {
    case 1:
      return "Pediatría";
    case 2:
      return "Clínico";
    case 3:
      return "Oftalmología";
    case 4:
      return "Dermatología";
    case 5:
      return "Nutrición";
  }
};

const obtenerPorId = (id_medico) => {
  // muestra el valor del array en esa posición
  return medicoNombres.value[id_medico] || "Nombre no encontrado";
};

const estasSeguro = async (id) => {
  if (confirm("Estás seguro de que querés cancelar el turno?")) {

    //usa la acción del store para eliminar
    const eliminacionExitosa = await useTurnoStore().delete(id);

    // actualiza la lista de turnos en la vista si la eliminación fue exitosa
    if (eliminacionExitosa) {
      // actualiza la referencia de usuario.turnos
      usuario.value.turnos = await loadTurnos();
    }
  }
};

const loadTurnos = async () => {
  try {
    // Cargamos nuevamente la lista de turnos y retornamos la data
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
      <h1>
        Estos son tus turnos, {{ usuario.nombre }}
        {{ usuario.apellido }}
      </h1>
      <div class="grilla">
        <div v-for="turno in usuario.turnos">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ turno.fecha }} / {{ turno.hora }}</h5>
              <hr />
              <h6 class="card-subtitle mb-2 text-muted">
                {{ obtenerPorId(turno.id_medico).especialidad }}
              </h6>
              <p class="card-text">
                Turno con el/la Dr/Dra
                <b>{{ obtenerPorId(turno.id_medico).nombreCompleto }}</b>
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
      <RouterLink to="/homePaciente"
        ><button class="btn btn-primary">Volver al Inicio</button></RouterLink
      >
    </div>
  </main>
</template>

<style>
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
  height: 100vh;
}
.text-center {
  width: 100%;
  border-radius: 8px;

  background-color: #d1dadc;
}
</style>
