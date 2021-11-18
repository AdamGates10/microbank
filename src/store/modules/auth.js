/** @format */

import Api from "@/apis/Api";

export default {
	state: {
		authenticated: false,
		user: null,
		userList: [],
		customerList: [],
		customerMeta: [],
		userMeta: []
	},
	getters: {
		authenticated: (state) => state.authenticated,
		user: (state) => state.user,
		password: (state) => state.user,
		getters_users: (state) => state.userList,
		getters_users_meta: (state) => state.userMeta,
	
	},
	mutations: {
		SET_AUTHENTICATED: (state, value) => (state.authenticated = value),
		SET_USER: (state, value) => (state.user = value),
		USER_LIST: (state, user) => (state.userList = user),
		USER_LIST_PAGINATE: (state, meta) => state.userMeta = meta
	},
	actions: {
		async signIn({ dispatch }, credentials) {
			await Api()
				.post("/login", credentials)
				.then((response) => {
					localStorage.setItem("token", response.data);
				});
			return dispatch("me");
		},

		async signOut({ dispatch }) {
			await Api()
				.post("/logout")
				.then(() => localStorage.removeItem("token"));
			return dispatch("me");
		},

		me({ commit }) {
			return Api()
				.get("/user")
				.then((response) => {
					commit("SET_AUTHENTICATED", true);
					commit("SET_USER", response.data);
				})
				.catch(() => {
					commit("SET_AUTHENTICATED", false);
					commit("SET_USER", null);
				});
		},

		async userList({ commit },) {
			await Api()
				.post("/userlist",)
				.then((res) => {
					commit('USER_LIST', res.data.data)
					commit('USER_LIST_PAGINATE', res.data.meta)
				});
		},
	},
};
