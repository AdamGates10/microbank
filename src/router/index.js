/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "Login",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      guestOnly: true,
      title: "SMS - Login",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      authOnly: true,
      title: "FT - Home",
    },
  },
  {
    path: "/transaction_management/record",
    name: "Transaction",
    component: () => import("@/views/Transaction/Record.vue"),
    meta: {
      authOnly: true,
      title: "FT - Record",
    },
    children: [
      {
        props: true,
        meta: {
          authOnly: true,
          title: "FT - ADD TRANSACTION",
        },
        path: ":/addtransaction", component: () => import("@/components/Transaction/Record.vue"),
        name: "AddTransaction",
      },
      /*  {
         props: true,
         meta: {
           authOnly: true,
           title: "FT - ADD TRANSACTION",
         },
         path: ":/addtransaction", component: () => import("@/components/Transaction/Record.vue"),
         name: "AddTransaction",
       }, */
    ]
  },
  {
    path: "/transaction_management/statement",
    name: "Statement",
    component: () => import("@/views/Transaction/Statement.vue"),
    meta: {
      authOnly: true,
      title: "FT - Statement",
    },

  },
  {
    path: "/account_management/accounts",
    name: "Accounts",
    component: () => import("@/views/Account/AccountList.vue"),
    meta: {
      authOnly: true,
      title: "FT - Accounts",
    },
    children: [
      {
        props: true,
        meta: {
          authOnly: true,
          title: "FT - ADD ACCOUNT",
        },
        path: ":/addaccount", component: () => import("@/components/Account/AddAccount.vue"),
        name: "AddAccount",
      },

    ]
  },

  {
    path: "/user_management/stafflist",
    name: "Users",
    component: () => import("@/views/User/Staff/StaffList.vue"),
    meta: {
      authOnly: true,
      title: "FT - Users",
    },
    children: [

      {
        props: true,
        meta: {
          authOnly: true,
          title: "FT - ADD USER",
        }, path: ":/addstaff", component: () => import("@/components/User/Staff/Create/AddStaff"),
        name: "AddStaff",
      }
    ]
  },
  {
    props: true,
    path: "/user_management/customerlist",
    name: "Customers",
    component: () => import("@/views/User/Customer/CustomerList.vue"),
    meta: {
      authOnly: true,
      title: "FT - Customers",
    },
    children: [
      {
        props: true,
        meta: {
          authOnly: true,
          title: "SMS - VIEW CUSTOMER",
        },
        path: ":/customer/:id", component: () => import("@/components/User/Customer/View/ViewCustomer.vue"),
        name: "Customer",
      },
      {
        props: true,
        meta: {
          authOnly: true,
          title: "FT - ADD CUSTOMER",
        }, path: ":/addcustomer", component: () => import("@/components/User/Customer/Create/NewCustomer"), name: "AddCustomer",
      }
    ]
  },
  {
    path: '*',
    component: () => import("@/views/PageNotFound.vue"),
    title: "SMS - Page Not Found",
    name: 'Page Not Found'
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
});

const isLoggedIn = () => {
  return localStorage.getItem("token");
};

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    if (!store.getters.authenticated && (!isLoggedIn() || isLoggedIn())) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else { next() }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (
      isLoggedIn() &&
      store.getters.authenticated
    ) {
      //if (to.matched.some((record) => record.name === "Login")) {
      next("/home");
      //	}
    } else {
      next();
    }
  } else {

    next();
  }
});

export default router;
