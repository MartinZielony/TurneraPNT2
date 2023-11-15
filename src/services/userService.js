import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();

export default {
	login(user) {
		//Utilizo api Client que es el objeto inicializado de axios
		return apiClient.post('/usuarios/login', user);
        //http://localhost:3000/api/usuarios/login
		// axios pero instanciado con la direccion y las caracteristicas de la peticion.
	},

	register(user){
		return apiClient.post('/usuario/', user);
        //http://localhost:8080/api/usuario/
	}
}
