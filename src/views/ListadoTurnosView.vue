<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';
import { useTurnoStore } from '../stores/turnos';
import { useRouter, RouterLink } from 'vue-router';

const { usuario } = storeToRefs(useUserStore());
const medicoNombres = ref({});

onMounted(async () => {
  console.log('Valor de usuario en Turnos :', usuario.value);

  for (const turno of usuario.value.turnos) {
    await obtenerMedico(turno.id_medico);
  }
});

const obtenerMedico = async (id_medico) => {
  try {
    const medico = await useUserStore().getUsuarioPorId(id_medico);
    medicoNombres.value[id_medico] = medico
      ? `${medico.nombre} ${medico.apellido}`
      : 'Médico no encontrado';
  } catch (error) {
    console.error('Error al obtener médico:', error);
    medicoNombres.value[id_medico] = 'Error al obtener médico';
  }
};

const obtenerNombrePorId = (id_medico) => {
  return medicoNombres.value[id_medico] || 'Nombre no encontrado';
};
</script>

<template>
  <main>
    <div class="text-center" style="height: fit-content;">
      <h1>
        Estos son tus turnos, {{ usuario.nombre }}
        {{ usuario.apellido }}
      </h1>
      <div class="grilla">
        <div v-for="turno in usuario.turnos">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ turno.fechaHora }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
               especialidad
              </h6>
              <p class="card-text">
                Turno con el/la Dr/Dra {{ obtenerNombrePorId(turno.id_medico) }}
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
