/** @format */

import Api from "@/apis/Api";

export default {
  state: {
    staff: [],
    staffMeta: [],
    singleStaff: [],
    members: []
  },
  getters: {
    getters_staff: (state) => state.staff,
    getters_staff_meta: (state) => state.staffMeta,
    getters_single_staff: (state) => state.singleStaff,
    getters_members: (state) => state.members
  },
  mutations: {
    STAFF_LIST: (state, staff) => (state.staff = staff),
    ADD_STAFF: (state, staff) => state.staff.push(staff),
    STAFF_LIST_PAGINATE: (state, meta) => state.staffMeta = meta,
    SEARCH_STAFF: (state, staff) => state.singleStaff = staff,
    COUNT_MEMBERS: (state, members) => state.members = members
  },
  actions: {

    async staffList({ commit },) {
      await Api()
        .post("/stafflist",)
        .then((res) => {
          commit('STAFF_LIST', res.data.data)
          commit('STAFF_LIST_PAGINATE', res.data.meta)
        });
    },

    async addStaff({ commit }, staff) {
      await Api()
        .post('/addstaff', { staff })
        .then((res) => commit('ADD_STAFF', res.data.data))
    },

    async searchStaff({ commit }, staff) {
      await Api()
        .post('/searchstaff', { staff })
        .then((res) => commit('SEARCH_STAFF', res.data.data))
    },

    async countMembers({ commit }) {
      await Api()
        .post('/countmembers')
        .then((res) => commit('COUNT_MEMBERS', res.data.data))
    }

  },
};
