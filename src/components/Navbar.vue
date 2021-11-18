<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer" />

      <v-spacer />

      <div class="justify-center">
        <div v-if="!loading">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="grey" v-bind="attrs" v-on="on">
                <span class="text-h6 font-weight-bold">
                  {{ `${user.name}` }}
                </span>
                <v-icon right large> mdi-chevron-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in nav.links"
                :key="index"
                @click.stop="doAction(item.action)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-icon right> mdi-{{ item.icon }} </v-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div v-else>
          <v-slide-x-transition>
            <v-progress-circular
              class="mr-9"
              size="30"
              width="3"
              color="primary"
              indeterminate
            />
          </v-slide-x-transition>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="300">
      <v-list>
        <v-list-item class="font-weight-bold text-wrap">
          <v-list-item-content>
            DIVINE TRUSTIES SAVING AND LOAN
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list nav expand>
        <v-list-item-group>
          <template v-for="(item, i) in sidebarLinks">
            <v-list-group
              v-if="item.children"
              :key="`group-${i}`"
              no-action
              :prepend-icon="item.icon"
              :group="item.route"
              active-class="light-blue dark darken-2 white--text"
            >
              <template v-slot:activator>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </template>
              <template>
                <v-list-item
                  v-for="(child, i) in item.children"
                  router
                  :to="`${child.route.name}`"
                  :key="i"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
            <template v-else>
              <v-list-item
                active-class="light-blue darken-2 white--text"
                :key="`item-${i}`"
                link
                router
                :to="item.route"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  import { ref, reactive, toRefs } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";
  export default {
    components: {},
    setup(props, ctx) {
      let { user } = useGetters(["user"]);
      let { signOut } = useActions(["signOut"]);

      let openAvatar = ref("false");
      let color = ref("primary");
      let loading = ref(false);
      let drawer = ref("true");
      const nav = reactive({
        links: [
          {
            title: "Change Password",
            action: "changePassword",
            icon: "lock",
          },

          {
            title: "Log Out",
            action: "logOut",
            icon: "exit-to-app",
          },
        ],
      });

      const sideBar = reactive({
        model: 1,
        sidebarLinks: [
          {
            title: "DASHBOARD",
            icon: "mdi-view-dashboard-outline",
            route: "/home",
          },
          {
            title: "USERS",
            icon: "mdi-account-group-outline",
            route: "/user_management",
            children: [
              {
                title: "Staff List",
                route: { name: "/user_management/stafflist" },
              },
              {
                title: "Customer List",
                route: { name: "/user_management/customerlist" },
              },
            ],
          },
          {
            title: "TRANSACTIONS",
            icon: "mdi-bank",
            route: "/transaction_management",
            children: [
              {
                title: "Record Transaction",
                route: { name: "/transaction_management/record" },
              },
              {
                title: "Statement",
                route: { name: "/transaction_management/statement" },
              },
            ],
          },
          {
            title: "ACCOUNTS",
            icon: "mdi-folder",
            route: "/account_management",
            children: [
              {
                title: "Accounts",
                route: { name: "/account_management/accounts" },
              },
            ],
          },
        ],
      });

      const doAction = (name) => {
        switch (name) {
          case "changePassword":
            ctx.root.$router.replace({
              name: "Password",
            });
            break;

          default:
            signOutAction();
            break;
        }
      };

      const signOutAction = async () => {
        loading.value = true;
        await signOut().then(() => {
          ctx.root.$router.replace({
            name: "Login",
          });
          loading.value = false;
        });
      };
      return {
        ...toRefs(sideBar),
        user,
        nav,
        loading,
        color,
        drawer,
        openAvatar,
        doAction,
        signOut,
        signOutAction,
      };
    },
  };
</script>

<style scoped>
  .border {
    border-left: 4px solid white;
  }

  #avatar:hover {
    cursor: pointer;
  }
</style>
