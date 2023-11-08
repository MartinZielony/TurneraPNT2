import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMedicosStore = defineStore('medicos', {
  state: () => {
    return {
      listadoMedicos: [
        {
          nombre: "Martin Zielony",
          especialidad: 1
        },
        {
          nombre: "Marcelo Gomez",
          especialidad: 1
        },
        {
          nombre: "Pablo Canseco",
          especialidad: 2
        },
        {
          nombre: "Maria Victoria",
          especialidad: 3
        }
      ]
    }
  },
  getters: {
    listar: (state) => state.listadoMedicos,
    pediatras: (state) => state.listadoMedicos.filter(medico => medico.especialidad == 1),
    clinicos: (state) => state.listadoMedicos.filter(medico => medico.especialidad == 2),
    urologos: (state) => state.listadoMedicos.filter(medico => medico.especialidad == 3)
  }
})
