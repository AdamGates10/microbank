/** @format */

import axios from "axios";

let Api = axios.create({
	baseURL: "https://dtsl-backend.herokuapp.com/api",
});

/* let Api = () => {
	let token = localStorage.getItem("token");
	if (token) {
		BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
	return BaseApi;
}; */
Api.defaults.withCredentials = true

export default Api;
