/** @format */

import Api from "@/apis/Api";

export default {
  state: {
    accounts: [],
    monthlyTransaction: [],
    transaction: {}
  },
  getters: {
    getters_monthly_transactions: (state) => state.monthlyTransaction,
    getters_transaction: (state) => state.transaction
  },
  mutations: {
    MONTHLY_TRANSACTION: (state, transaction) => state.monthlyTransaction = transaction,
    SAVE_TRANSACTION: (state, transaction) => state.transaction = transaction
  },
  actions: {
    async monthlyTransaction({ commit }, date) {
      await Api
        .post("/getmonthlytransaction", { date })
        .then((res) => {
          commit('MONTHLY_TRANSACTION', res.data.data)
        });
    },

    async saveTransaction({ commit }, data) {
      await Api
        .post("/savetransaction", { data })
        .then((res) => {
          commit('SAVE_TRANSACTION', res.data.data)
        });
    },

  },
};
