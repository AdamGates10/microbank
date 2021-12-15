/** @format */

import axios from "axios";

let BaseApi = axios.create({
	// baseURL: "https://dtsl-backend.herokuapp.com/api",
	baseURL: "http://dtsl-backend.kuulvibes.com/api",

});

let Api = () => {
	let token = localStorage.getItem("token");
	if (token) {
		BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
	return BaseApi;
};

export default Api;
