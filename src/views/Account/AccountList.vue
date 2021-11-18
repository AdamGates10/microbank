<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn @click="addAccountBtn" color="success" class="font-weight-bold">
          ADD ACCOUNT
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="getters_accounts"
          hide-default-footer
          class="elevation-1"
          :loading="loading"
          disable-pagination
        >
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-navigation-drawer
        overlay-color="black"
        v-model="openAccount"
        fixed
        :permanent="openAccount"
        right
        width="40%"
        class="shadow"
        clipped
      >
        <div class="mt-15 d-flex justify-space-between">
          <v-spacer></v-spacer>
          <v-btn
            @click="openAccount = !openAccount"
            icon
            class="ma-2"
            to="/account_management/accounts"
          >
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </div>

        <!-- Record Transaction Here -->
        <AddAccount v-if="openAccount" />
      </v-navigation-drawer>
    </v-row>
  </v-container>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";
  import AddAccount from "@/components/Account/AddAccount";
  export default defineComponent({
    components: { AddAccount },
    setup(props, context) {
      const { accountList } = useActions(["accountList"]);
      const { getters_accounts } = useGetters(["getters_accounts"]);
      const accountTable = reactive({
        headers: [
          {
            text: "ACCOUNT NAME",
            value: "account_name",
          },
          { text: "ACCOUNT CODE", value: "account_code" },
        ],
        loading: true,
        openAccount: false,
      });

      const { loading, openAccount } = toRefs(accountTable);

      accountList()
        .then(() => (loading.value = false))
        .finally(() => {
          switch (context.root.$route.name) {
            case "AddAccount":
              openAccount.value = true;
              break;

            default:
              break;
          }
        });

      const addAccountBtn = () => {
        openAccount.value = true;
        context.root._router.replace({
          path: `/account_management/accounts/:/addaccount`,
        });
      };

      return {
        ...toRefs(accountTable),
        getters_accounts,
        addAccountBtn,
      };
    },
  });
</script>
