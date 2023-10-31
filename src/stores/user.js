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

  const login = async (mail, contrasena) => {
    console.log(mail);
    console.log(contrasena);
    let respuesta = await userService.login({ mail, contrasena })
    console.log(respuesta);
    return true
    /*if (respuesta.status == 200) {
      estaLogueado.value = true
      correoUsuario.value = respuesta.usuario.mail
      esPaciente.value = respuesta.usuario.esPaciente
      nombreUsuario.value = respuesta.usuario.nombre
      apellidoUsuario.value = respuesta.usuario.apellido
      return true
    } else {
      return false
    } */

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

  return { correoUsuario, esPaciente, estaLogueado, nombreUsuario, apellidoUsuario, dniUsuario, login, register, reset }
})
