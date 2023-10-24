import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const correoUsuario = ref("")
  const esPaciente = ref(false)
  const estaLogueado = ref(false)
  const nombreUsuario = ref("")
  const apellidoUsuario = ref("")
  const dniUsuario = ref('')

  const login = (mail, contrasena) => {
    if (contrasena == "123") {
      correoUsuario.value = mail
      estaLogueado.value = true
      esPaciente.value = true
      nombreUsuario.value = "Martin"
      apellidoUsuario.value = "Zielony"
      return true
    }
    alert(`Se ingresó, ${mail} ${contrasena}`)
  }

const reset = () => {
  correoUsuario.value = ""
  estaLogueado.value = false
}

  return { correoUsuario, esPaciente, estaLogueado, nombreUsuario, apellidoUsuario, dniUsuario, login, reset }
})
