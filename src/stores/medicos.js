import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMedicosStore = defineStore('medicos', {
  state: () => {
    const listadoMedicos = [
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
    return listadoMedicos
  }
})
