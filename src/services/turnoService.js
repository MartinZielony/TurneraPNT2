import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const turnoService = {
  getAll() {
    //Utilizo api Client que es el objeto inicializado de axios
    return apiClient.get("/turnos/");
    //http://localhost:3000/api/turnos
    // axios pero instanciado con la direccion y las caracteristicas de la peticion.
  },

  delete(id) {
    return apiClient.delete(`/turnos/${id}`);
  },
};
