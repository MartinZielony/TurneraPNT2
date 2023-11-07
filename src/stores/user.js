import { ref } from 'vue'
import { defineStore } from 'pinia'
import userService from '../services/userService'

export const useUserStore = defineStore('user', () => {
  const correoUsuario = ref("")
  const esPaciente = ref(false)
  const estaLogueado = ref(false)
  const nombreUsuario = ref("")
  const apellidoUsuario = ref("")
  const dniUsuario = ref('')
  const listaTurnos = ref([])
  const horarioInicioAtencion = ref('')
  const horarioFinAtencion = ref('')

  async function login(mail, contrasena) {
    console.log(mail);
    console.log(contrasena);
    let respuesta = await userService.login({ mail, contrasena })
    console.log(respuesta);
    if (respuesta.status == 200) {
      console.log("Respuesta exitosa");
      this.correoUsuario = respuesta.data.mail
      this.estaLogueado = true
      this.esPaciente = respuesta.data.esPaciente
      this.nombreUsuario = respuesta.data.nombre
      this.apellidoUsuario = respuesta.data.apellido
      this.listaTurnos = respuesta.data.turnos

      if(!esPaciente) {
        this.horarioInicioAtencion = respuesta.data.horarioInicioAtencion
        this.horarioFinAtencion = respuesta.data.horarioFinAtencion
      }

      return true
    } else {
      return false
    }
  }

  const register = (mail, contrasena) => {
    if (contrasena == "123") {
      correoUsuario.value = mail
      estaLogueado.value = true
      esPaciente.value = true
      nombreUsuario.value = "Pablo"
      apellidoUsuario.value = "Canseco"

      alert(`Se registró, ${mail} ${contrasena}`)
      return true
    }
  }

  const reset = () => {
    correoUsuario.value = ""
    estaLogueado.value = false
  }

  const eliminarTurno = (id) => {
    let turno = listaTurnos.value.find(turno => turno.id == id)
    let indice = listaTurnos.value.indexOf(turno)
    listaTurnos.value.splice(indice, 1)
    console.log("Lista de turnos luego de eliminar: ", listaTurnos);
  }

  return { correoUsuario, esPaciente, estaLogueado, nombreUsuario, apellidoUsuario, dniUsuario, listaTurnos, horarioInicioAtencion, horarioFinAtencion, login, register, reset, eliminarTurno }
})
