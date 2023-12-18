import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();

export const userService = {
	login(user) {
		//Utilizo api Client que es el objeto inicializado de axios
		return apiClient.post('/usuarios/login', user);
        //http://localhost:3000/api/usuarios/login
		// axios pero instanciado con la direccion y las caracteristicas de la peticion.
	},

	crearUsuario(user){
		return apiClient.post('/usuarios/crearUsuario', user);
        //http://localhost:3000/api/usuarios/crearUsuario
	},

	editarUsuario(user){
		return apiClient.put(`/usuarios/${user.id}`,user);
		 //http://localhost:3000/api/usuarios/:id
	},

	obtenerUsuario(id){
		return apiClient.get(`/usuarios/${id}`);
	},

	obtenerMedicoEspecialidad(especialidad){
		return apiClient.get(`/usuarios/especialidad/${especialidad}`);
	}

}
