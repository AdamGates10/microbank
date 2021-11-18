/** @format */

import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import customer from "./modules/customer";
import account from "./modules/account";
import transaction from "./modules/transaction";
import user from "./modules/user";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    customer,
    account,
    transaction, user
  },
});
