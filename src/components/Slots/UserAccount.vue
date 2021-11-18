<template>
  <v-container fluid>
    <div v-for="(account, index) of accounts" :key="'account' + index">
      <v-card class="mb-2" tile outlined rounded="0">
        <v-toolbar color="primary" dark outlined elevation="0">
          <v-toolbar-title> {{ index }} Account </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            {{ account.length }}
            {{ account.length > 1 ? "Accounts" : "Account" }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div v-for="(acc_number, i) in account" :key="'div' + i">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-card outlined>
                    <v-card-text>
                      <v-row align="center">
                        <v-col>
                          <v-list-item-title>Account Number </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ acc_number.acc }}
                          </v-list-item-subtitle>
                        </v-col>

                        <v-col>
                          <v-list-item-title> Date Created </v-list-item-title>
                          <v-list-item-subtitle>
                            {{
                              moment(acc_number.created).format("Do MMMM YYYY")
                            }}
                          </v-list-item-subtitle>
                        </v-col>

                        <v-col cols="12" lg="2" class="text-right">
                          <v-list-item-title>
                            <v-btn
                              x-large
                              color="success"
                              icon
                              @click="viewTransaction(acc_number.acc, index)"
                            >
                              <v-icon x-large>mdi-bank-transfer</v-icon>
                            </v-btn>
                          </v-list-item-title>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    reactive,
    toRefs,
  } from "@vue/composition-api";
  import { useGetters } from "vuex-composition-helpers";
  import emitter from "@/debounce/emitter";

  export default defineComponent({
    setup() {
      const { customer } = useGetters(["customer"]);

      const userAccount = reactive({
        accounts: [],
        window: 0,
      });

      const { accounts } = toRefs(userAccount);

      onMounted(() => {
        accounts.value = customer.value.accounts.reduce((acc, curr) => {
          const key = curr.account_name;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push({
            acc: curr.customer_account.account_number,
            created: curr.customer_account.created_at,
          });
          return acc;
        }, {});
      });

      const viewTransaction = (accNumber, accType) => {
        emitter.emit("view-customer-transaction", {
          number: accNumber,
          type: accType,
        });
      };

      return {
        customer,
        ...toRefs(userAccount),
        viewTransaction,
      };
    },
  });
</script>


<style scoped>
  tr:nth-child(even) {
    background-color: #eeecec;
  }
</style>