<template>
  <v-card flat>
    <validation-observer ref="observer">
      <v-form @submit.prevent ref="accountForm">
        <v-card outlined>
          <v-card-text>
            <v-slide-y-transition group>
              <template v-for="(account, i) in accounts">
                <v-row justify="center" align="center" :key="i">
                  <v-col cols="12" lg="4">
                    <validation-provider
                      name="Account"
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <v-select
                        hide-selected
                        :items="getters_accounts"
                        @change="getBalance($event, i)"
                        item-value="id"
                        item-text="account_name"
                        outlined
                        v-model="account.id"
                        hide-details="auto"
                        label="Account Name"
                        placeholder="Account Name"
                        :error-messages="errors"
                      ></v-select>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Credit"
                      rules="required|numeric|password:@confirm"
                    >
                      <v-text-field
                        hide-details="auto"
                        label="Credit"
                        v-model.number="account.credit"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
                    </validation-provider>
                  </v-col>

                  <v-col cols="12" lg="2">
                    <validation-provider
                      v-slot="{ errors }"
                      name="confirm"
                      rules="required|numeric"
                    >
                      <v-text-field
                        disabled
                        hide-details="auto"
                        label="Min Bal"
                        v-model="account.balance"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
                    </validation-provider>
                  </v-col>

                  <v-col cols="12" lg="2" class="text-center">
                    <v-slide-y-reverse-transition>
                      <v-btn
                        icon
                        dark
                        v-if="i + 1 === accounts.length"
                        color="success"
                        @click="newRow()"
                        :disabled="!valid"
                      >
                        <v-icon dark>mdi-plus-circle</v-icon>
                      </v-btn>
                    </v-slide-y-reverse-transition>
                    <v-slide-y-reverse-transition>
                      <v-btn
                        v-if="i + 1 >= 2"
                        dark
                        icon
                        color="red"
                        @click="removeRow(i)"
                      >
                        <v-icon dark> mdi-delete-outline </v-icon>
                      </v-btn>
                    </v-slide-y-reverse-transition>
                  </v-col>
                </v-row>
              </template>
            </v-slide-y-transition>
          </v-card-text>
        </v-card>
      </v-form>
    </validation-observer>

    <v-card-actions class="ml-2">
      <v-btn v-if="!props.user_id" color="primary" @click="sendData">
        Continue
      </v-btn>
      <v-btn color="success" @click="addNewSpouseChildren" v-else>
        save changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "@vue/composition-api";
  import { required, numeric } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  import { useActions, useGetters } from "vuex-composition-helpers";

  setInteractionMode("eager");

  extend("password", {
    params: ["target"],
    validate(value, { target }) {
      return value >= target;
    },
    message: "Credit should be greater than minimum balance",
  });

  extend("required", {
    ...required,
    message: "{_field_} can not be empty",
  });

  extend("numeric", {
    ...numeric,
    message: "{_field_} can not be empty",
  });

  export default defineComponent({
    props: ["user_id"],
    setup(props, context) {
      const { accountList } = useActions(["accountList"]);
      const { getters_accounts } = useGetters(["getters_accounts"]);

      accountList();

      const bankDetails = reactive({
        observer: null,
        valid: true,
        accounts: [
          {
            id: null,
            credit: 0.0,
            balance: 0.0,
          },
        ],
        accountForm: null,
      });

      const { accounts, observer } = toRefs(bankDetails);

      const sendData = async () => {
        await observer.value.validate().then((result) => {
          if (result) {
            let data = {
              accounts: accounts.value,
            };
            context.emit("page", {
              bool: true,
              page: 3,
              data,
              name: "accounts",
            });
          } else context.emit("page", { bool: false, page: 3 });
        });
      };

      const newRow = async () => {
        await observer.value.validate().then((result) => {
          if (result) {
            accounts.value.push({
              id: null,
              credit: 0.0,
              balance: 0.0,
            });
          }
        });
      };

      const getBalance = (id, i) => {
        getters_accounts.value.map((item) =>
          item.id === id ? (accounts.value[i].balance = item.min_balance) : null
        );
      };

      const removeRow = (i) => {
        accounts.value.splice(i, 1);
      };

      return {
        ...toRefs(bankDetails),
        sendData,
        newRow,
        removeRow,
        props,
        getters_accounts,
        getBalance,
      };
    },
  });
</script>
