import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const correoUsuario = ref("")
  const esPaciente = ref(true)
  const estaLogueado = ref(false)
  const nombreUsuario = ref("")
  const apellidoUsuario = ref("")
  const dniUsuario = ref('')
  
  const login = (mail, contrasena) => {
    if(contrasena == "123") {
      this.correoUsuario = mail
      this.estaLogueado = true
    }
    alert(`Se ingresó, ${mail} ${contrasena}`)
    
  }

  return { correoUsuario, esPaciente, estaLogueado, nombreUsuario, apellidoUsuario, dniUsuario, login }
})
