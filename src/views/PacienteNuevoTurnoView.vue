<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useMedicosStore } from '../stores/medicos'
import { useRouter } from "vue-router";
const medicos = useMedicosStore()
const router = useRouter();

let listado = ref([])

const selectorEspecialidad = ref()

const revelarMedicos = () => {
  listado = medicos.listadoMedicos
  console.log(listado);
}


</script>

<template>
  <main>
    <div class="text-center">
      <h1>Nuevo Turno</h1>
      <select v-model="selectorEspecialidad" @change="revelarMedicos()" class="form-select" name="Especialidades" id="especialidades">
        <option value="1">Pediatría</option>
        <option value="2">Clínico</option>
        <option value="3">Urólogo</option>
      </select>
      <select class="form-select">
        <option v-for="medico in listado" value="medico.nombre">{{ medico.nombre }}</option>
      </select>
    </div>
  </main>
</template>

