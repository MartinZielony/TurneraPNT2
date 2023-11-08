<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import { useMedicosStore } from '../stores/medicos'
import { useRouter } from "vue-router";
const medicos = useMedicosStore()
const router = useRouter();
const selectorEspecialidad = ref("")
let medicosFiltrados = ref([])

const revelarMedicos = () => {
  switch (parseInt(selectorEspecialidad.value)) {
    case 1:
      medicosFiltrados = medicos.pediatras
      break;
    case 2:
      medicosFiltrados = medicos.clinicos
      break;
    case 3:
      medicosFiltrados = medicos.urologos
      break;
  }
  console.log(medicosFiltrados);
}

const exito = () => {
  router.push("/exitoNuevoTurno")
}

let horarios = ref([
  {
    hora: "10:00",
    disponible: true
  },
  {
    hora: "11:00",
    disponible: false
  },
  {
    hora: "12:00",
    disponible: false
  },
  {
    hora: "13:00",
    disponible: true
  },
  {
    hora: "14:00",
    disponible: true
  },
  {
    hora: "15:00",
    disponible: true
  }
])

</script>

<template>
  <main>
    <div class="text-center">
      <h1>Nuevo Turno</h1>
      <select v-model="selectorEspecialidad" v-on:change="revelarMedicos" class="form-select" name="Especialidades"
        id="especialidades">
        <option value="1">Pediatría</option>
        <option value="2">Clínico</option>
        <option value="3">Urólogo</option>
      </select>
      <select class="form-select">
        <option v-for="medico in medicosFiltrados" value="medico.nombre">{{ medico.nombre }}</option>
      </select>
      <input type="date" v-on:change="" name=""> <br>
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
            <th scope="row">{{hora.hora}}</th>
            <td v-if="hora.disponible">Si</td>
            <td v-if="!hora.disponible">No</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </table>
      <button @click="exito" class="btn btn-primary">Continuar</button>
    </div>
  </main>
</template>

