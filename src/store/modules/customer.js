/** @format */

import Api from "@/apis/Api";

export default {
  state: {
    customer: null,
    customerList: [],
    customerMeta: [],
    customerTransaction: [],
    customerTransactionMeta: []
  },
  getters: {
    customer: (state) => state.customer,
    getters_customers: (state) => state.customerList,
    getters_customers_meta: (state) => state.customerMeta,
    getters_customer_transaction: (state) => state.customerTransaction,
    getters_customer_transaction_meta: (state) => state.customerTransactionMeta
  },
  mutations: {
    CUSTOMER_LIST: (state, customers) => (state.customerList = customers),
    CUSTOMER_LIST_PAGINATE: (state, meta) => state.customerMeta = meta,
    SINGLE_CUSTOMER: (state, customer) => state.customer = customer,
    SET_NEW_CUSTOMER: (state, customer) => state.customerList.push(customer),
    CUSTOMER_TRANSACTION_PG: (state, transaction) => state.customerTransaction = transaction,
    CUSTOMER_TRANSACTION_META: (state, meta) => state.customerTransactionMeta = meta,
  },
  actions: {
    async customerList({ commit }, page) {
      await Api()
        .post("/customerlist?page=" + page,)
        .then((res) => {
          commit('CUSTOMER_LIST', res.data.data)
          commit('CUSTOMER_LIST_PAGINATE', res.data.meta)
        });
    },

    async getCustomer({ commit }, customer_id) {
      await Api()
        .post("/getcustomer", { customer_id })
        .then((res) => {
          commit('SINGLE_CUSTOMER', res.data.data)
        });
    },

    async getCustomerTransaction({ commit }, { page, acc_number }) {
      await Api()
        .post("/customertransaction?page=" + page, { acc_number })
        .then((res) => {
          commit('CUSTOMER_TRANSACTION_PG', res.data.data)
          commit('CUSTOMER_TRANSACTION_META', res.data.meta)
        });
    },
  },
};
