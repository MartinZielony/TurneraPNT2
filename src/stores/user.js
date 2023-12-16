
  import { defineStore } from "pinia";
  import { userService } from "../services/userService";

  export const useUserStore = defineStore("user", {
    state: () => {
      return {
        usuario: {
          nombre: "",
          apellido: "",
          email: "",
          contrasenia: "",
          esPaciente: false,
          especialidad: 0,
          horarioInicioAtencion: "",
          horarioFinalAtencion: "",
          turnos: [],
        },
        estaLogueado: false,
      };
    },
    actions: {
      async login(email, contrasenia) {
        try {
          const respuesta = await userService.login({ email, contrasenia });

          console.log("Respuesta del servicio de login:", respuesta);


          if (respuesta.status === 200) {
            this.usuario.email = respuesta.data.email;
            this.estaLogueado = true;
            this.usuario.esPaciente = respuesta.data.esPaciente;
            this.usuario.nombre = respuesta.data.nombre;
            this.usuario.apellido = respuesta.data.apellido;
            this.usuario.turnos = respuesta.data.turnos;

            if (!this.usuario.esPaciente) {
              this.usuario.horarioInicioAtencion =
                respuesta.data.horarioInicioAtencion;
              this.usuario.horarioFinalAtencion =
                respuesta.data.horarioFinalAtencion;
            }

            console.log("Usuario después del inicio de sesión:", this.usuario);

            return this.usuario;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error en la solicitud de login:", error);
          if (error.response) {
            console.error("Respuesta del servidor:", error.response.data);
          } else if (error.request) {
            console.error("No hay respuesta del servidor:", error.request);
          } else {
            console.error("Error durante la solicitud:", error.message);
          }
          return null;
        }
      },

      async register(email, contrasenia, nombre, apellido, esMedico) {
        try {
          const respuesta = await userService.register({
            email,
            contrasenia,
            nombre,
            apellido,
            esMedico,
          });

          if (respuesta.status === 200) {
            alert(`Se registró, ${nombre} ${apellido}`);
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error("Error en la solicitud de registro:", error);
          return false;
        }
      },

      reset() {
        this.usuario = {
          nombre: "",
          apellido: "",
          email: "",
          contrasenia: "",
          esPaciente: false,
          especialidad: 0,
          horarioInicioAtencion: "",
          horarioFinalAtencion: "",
          turnos: [],
        };
        this.estaLogueado = false;
      },

      eliminarTurno(id) {
        const turno = this.usuario.turnos.find((turno) => turno.id === id);
        const indice = this.usuario.turnos.indexOf(turno);
        this.usuario.turnos.splice(indice, 1);
        console.log("Lista de turnos luego de eliminar: ", this.usuario.turnos);
      },
    },
  });

/*
----------------------------------------------------------------------------------------------
      FORMA INCIAL DEL STORE. FUNCIONA PERO CORRE RIESGO DE INYECCION - NO ES SEGURO
----------------------------------------------------------------------------------------------
*/

/*import { ref } from 'vue'
import { defineStore } from 'pinia'
import userService from '../services/userService'
import { useRouter } from "vue-router";
const router = useRouter();

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

  --
  async function login(email, contrasenia) {
    console.log(email);
    console.log(contrasenia);
    let respuesta = await userService.login({ email, contrasenia })
    console.log(respuesta);
    if (respuesta.status == 200) {
      console.log("Respuesta exitosa");
      console.log(respuesta.data)
      this.correoUsuario = respuesta.data.email
      this.estaLogueado = true
      this.esPaciente = respuesta.data.esPaciente
      this.nombreUsuario = respuesta.data.nombre
      this.apellidoUsuario = respuesta.data.apellido
      this.listaTurnos = respuesta.data.turnos

      if (!esPaciente) {
        this.horarioInicioAtencion = respuesta.data.horarioInicioAtencion
        this.horarioFinAtencion = respuesta.data.horarioFinAtencion
      }

      return true
    } else {
      return false
    }
  }
  --
  
  async function login(email, contrasenia) {
    console.log(email);
    console.log(contrasenia);
  
    try {
      let respuesta = await userService.login({ email, contrasenia });
      console.log(respuesta);
  
      // Manejar la respuesta exitosa
      this.correoUsuario = respuesta.data.email;
      this.estaLogueado = true;
      this.esPaciente = respuesta.data.esPaciente;
      this.nombreUsuario = respuesta.data.nombre;
      this.apellidoUsuario = respuesta.data.apellido;
      this.listaTurnos = respuesta.data.turnos;
  
      if (!esPaciente) {
        this.horarioInicioAtencion = respuesta.data.horarioInicioAtencion;
        this.horarioFinAtencion = respuesta.data.horarioFinAtencion;
      }
  
      return true;
    } catch (error) {
      // Manejar el error
      console.error("Error en la solicitud de login:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      } else if (error.request) {
        console.error("No hay respuesta del servidor:", error.request);
      } else {
        console.error("Error durante la solicitud:", error.message);
      }
      return false;
    }
  }

  const register = async (email, contrasenia, nombre, apellido, esMedico) => {
    let respuesta = await userService.register({ email, contrasenia, nombre, apellido, esMedico })
    if (respuesta.status == 200) {
      alert(`Se registró, ${nombre} ${apellido}`)
      router.push("/login")
      return true
    } else return false
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
*/
