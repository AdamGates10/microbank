/** @format */

import Api from "@/apis/Api";

export default {
  state: {
    accounts: [],
    countAccount: []
  },
  getters: {
    getters_accounts: (state) => state.accounts,
    getters_countaccount: (state) => state.countAccount

  },
  mutations: {
    ACCOUNT_LIST: (state, customer) => (state.accounts = customer),
    ADD_ACCOUNT: (state, account) => state.accounts.push(account),
    COUNT_ACCOUNT:(state, account) => state.countAccount = account
  },
  actions: {

    async accountList({ commit },) {
      await Api
        .post("/accountlist",)
        .then((res) => {
          commit('ACCOUNT_LIST', res.data.data)
        });
    },

    async addAccount({ commit }, account) {
      await Api
        .post('/addaccount', { account })
        .then((res) => commit('ADD_ACCOUNT', res.data.data))
    },

    async countAccount({commit}){
      await Api
      .post('/countaccount')
      .then((res)=> commit('COUNT_ACCOUNT', res.data.data))
    }

  },
};
