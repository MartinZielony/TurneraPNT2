import { defineStore } from "pinia";
import { turnoService } from "../services/turnoService";

export const useTurnoStore = defineStore("turno", {
  state: () => {
    return {
      turno: {
        fechaHora: "",
        id_medico: 0,
        id_paciente: 0,
      },
    };
  },

  actions: {
    async agregar(fechaHora, id_medico, id_paciente) {
      try {
        const respuesta = await turnoService.register({
          state: () => {
            return {
              turnos: [],
            };
          },
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

    async delete(id) {
      try {
        const response = await turnoService.delete(id);

        // Muestra la respuesta en la consola para depuración
        console.log("Respuesta al eliminar turno:", response);

        // Actualizar la lista de turnos después de eliminar uno
        if (response.data) {
          await this.loadTurnos();
        }

        return response.data;
      } catch (error) {
        console.log("Error al eliminar turno ", error);
      }
    },

    async loadTurnos() {
      try {
        // Cargamos la lista de turnos y actualizamos el estado
        const response = await turnoService.getAll();
        this.turnos = response?.data || []; // Ajuste aquí

        return response; // Retornamos la respuesta completa
      } catch (error) {
        console.error("Error al cargar los turnos:", error);
        return {
          data: [],
          status: 500,
          statusText: "Error al cargar los turnos",
        }; // Retornamos un objeto de respuesta vacío
      }
    },
  },
});
