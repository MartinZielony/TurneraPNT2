<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';
import { useTurnoStore } from '../stores/turnos';
import { useRouter, RouterLink } from 'vue-router';

const { turno } = storeToRefs(useTurnoStore());
const { usuario } = storeToRefs(useUserStore());
const router = useRouter();
const pacienteNombres = ref({});

onMounted(async () => {
  console.log('Valor de usuario en Agenda :', usuario.value);

  for (const turno of usuario.value.turnos) {
    await obtenerPaciente(turno.id_paciente);
  }
});

const obtenerPaciente = async (id_paciente) => {
  try {
    const paciente = await useUserStore().getUsuarioPorId(id_paciente);
    pacienteNombres.value[id_paciente] = paciente
      ? `${paciente.nombre} ${paciente.apellido}`
      : 'Paciente no encontrado';
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    pacienteNombres.value[id_paciente] = 'Error al obtener paciente';
  }
};

const estasSeguro = async (id) => {
  if (confirm('Estás seguro de que querés cancelar el turno?')) {
    const eliminacionExitosa = await useTurnoStore().delete(id);

    // Actualizar la lista de turnos en la vista solo si la eliminación fue exitosa
    if (eliminacionExitosa) {
      // Actualizar la referencia de usuario.turnos
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
    console.error('Error al cargar los turnos:', error);
    return [];
  }
};

const obtenerNombrePorId = (id_paciente) => {
  return pacienteNombres.value[id_paciente] || 'Nombre no encontrado';
};
</script>

<template>
  <main>
    <div class="text-center" style="height: fit-content;">
      <h1>
        Esta es su agenda, {{ usuario.nombre }} {{ usuario.apellido }}
      </h1>

      <div class="grilla">
        <div v-for="turno in usuario.turnos" :key="turno.id">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ turno.fechaHora }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {{ usuario.nombre }} {{ usuario.apellido }}
              </h6>
              <p class="card-text">
                Turno con el paciente {{ obtenerNombrePorId(turno.id_paciente) }}
              </p>
              <button @click="estasSeguro(turno.id)" class="btn btn-danger card-link">
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
