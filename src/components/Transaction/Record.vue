<template>
  <v-container fluid>
    <validation-observer ref="observer" tag="form">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>TRANSACTION</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent ref="form1">
        <v-row class="mt-4">
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Account number"
              rules="required|numeric"
              ref="accountNumberRef"
            >
              <v-text-field
                hide-details="auto"
                label="Account Number"
                outlined
                placeholder="Account Number"
                v-model="accountNumber"
                :error-messages="errors"
                :loading="response"
                required
                @keyup="searchAccNum"
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
    <validation-observer
      ref="observer1"
      tag="form"
      v-slot="{ passes, invalid }"
    >
      <v-form ref="form2" @submit.prevent="passes(addTransaction)">
        <v-slide-y-transition>
          <div v-if="success">
            <v-row>
              <v-col>
                <v-row align="center">
                  <v-col cols="12" lg="5">
                    <v-avatar size="250" tile>
                      <img :src="customer[0].user.avatar_url" alt="" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" lg="7">
                    <v-list class="pt-0">
                      <v-list-item
                        class="text-h4"
                        v-text="
                          `${customer[0].user.other_names} ${customer[0].user.last_name}`
                        "
                      ></v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon> mdi-calendar-account-outline </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="
                              `${moment(customer[0].user.dob).format(
                                'Do MMMM YYYY'
                              )}`
                            "
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon> mdi-home-map-marker </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="`${customer[0].user.address}`"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon> mdi-phone </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span>
                              {{ customer[0].user.mobile_number_1 }}
                            </span>
                            <span v-if="customer[0].user.mobile_number_2">
                              {{ customer[0].user.mobile_number_2 }}
                            </span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12">
                <v-alert color="primary" dark :value="true">
                  <v-row align="center">
                    <v-col cols="12" lg="6"> Select Where Applicable </v-col>
                    <v-col cols="12" lg="6">
                      Bal: GH₵
                      {{ parseFloat(customer[1].customer_balance).toFixed(2) }}
                    </v-col>
                  </v-row>

                  <ValidationProvider
                    rules="required|exact_length"
                    ref="checkbox"
                  >
                    <v-row align="center">
                      <v-col v-for="(type, index) in creditDebit" :key="index">
                        <v-radio-group v-model="radioGroup">
                          <v-radio
                            :value="type"
                            v-model="type.label"
                            :label="type.label"
                            color="white"
                            hide-details
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </ValidationProvider>
                </v-alert>

                <v-slide-y-transition leave-absolute>
                  <v-row align="center">
                    <v-col cols="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="{ min_value: 1 }"
                        :name="radioGroup"
                        ref="amountValue"
                      >
                        <v-text-field
                          outlined
                          :label="radioGroup"
                          :placeholder="radioGroup"
                          hide-details="auto"
                          :error-messages="errors"
                          v-model.number="amount"
                        >
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <v-row class="mt-3 px-3">
                      <v-col>
                        <v-btn
                          type="submit"
                          color="primary"
                          :disabled="invalid"
                        >
                          SAVE
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-slide-y-transition>
              </v-col>
            </v-row>
          </div>
        </v-slide-y-transition>
      </v-form>
    </validation-observer>

    <v-overlay absolute v-model="overlay" opacity="1">
      <v-progress-circular :value="64" indeterminate></v-progress-circular>
    </v-overlay>

    <Response v-if="actionResponse" class="mb-10">
      <template v-slot:header>{{ msgHeader }}</template>
      <template v-slot:body>{{ msgBody }}</template>
      <template v-slot:icon>{{ msgIcon }}</template>
    </Response>
  </v-container>
</template>

<script>
  import {
    defineComponent,
    provide,
    reactive,
    toRefs,
  } from "@vue/composition-api";
  import { required, numeric, regex, min_value } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  import debounce from "@/debounce/debounce";
  import Api from "@/apis/Api";
  import { useActions } from "vuex-composition-helpers";
  import Response from "@/components/ActionResponse/Response";
  import emitter from "@/debounce/emitter";
  setInteractionMode("eager");

  extend("regex", {
    ...regex,
    message: "{_field_} is invalid. ",
  });

  extend("min_value", {
    ...min_value,
    message: "{_field_} is invalid. ",
  });

  extend("decimal", {
    ...regex,
    message: "{_field_} is invalid. ",
  });

  extend("numeric", {
    ...numeric,
    message: "{_field_} is invalid. ",
  });

  extend("required", {
    ...required,
    message: "{_field_} can not be empty",
  });

  extend("exact_length", {
    params: ["length", "message"],
    validate(val, { length, message }) {
      if (val.length === 0) return message ?? "Tick At Least " + length + " item";
      return true;
    },
  });

  export default defineComponent({
    components: {
      Response,
    },
    setup() {
      const { saveTransaction } = useActions(["saveTransaction"]);

      const generalForm = reactive({
        accountNumber: null,
        observer: null,
        observer1: null,
        response: false,
        accountNumberRef: null,
        success: false,
        creditDebit: [
          { label: "credit", value: null },
          { label: "debit", value: null },
        ],
        checkbox: null,
        files: [],
        form1: null,
        form2: null,
        customer: null,

        radioGroup: null,
        amount: 0,
        currentBalance: 0,
        overlay: false,
        msgHeader: null,
        msgBody: null,
        msgIcon: null,
        color: null,
        actionResponse: false,
        amountValue: null,
      });

      const {
        overlay,
        observer,
        accountNumber,
        response,
        accountNumberRef,
        success,
        form1,
        form2,
        customer,
        radioGroup,
        amountValue,
        amount,
        currentBalance,
        msgHeader,
        msgBody,
        msgIcon,
        color,
        actionResponse,
      } = toRefs(generalForm);

      const searchAccNum = debounce(async () => {
        success.value = false;

        await observer.value.validate().then((result) => {
          if (result) {
            response.value = true;
            Api()
              .post("/searchaccountnumber", {
                account_number: accountNumber.value,
              })
              .then((res) => {
                success.value = true;
                customer.value = res.data.data;
              })
              .catch((err) => {
                switch (err.response.status) {
                  case 422:
                    accountNumberRef.value.setErrors(err.response.data.message);
                    success.value = false;
                    break;

                  default:
                    accountNumberRef.value.setErrors("Try again later");
                    break;
                }
              })
              .finally(() => (response.value = false));
          }
        });
      });

      const addTransaction = () => {
        let accMinBal = customer.value[2].min_balance;
        let currBal = customer.value[1].customer_balance;
        actionResponse.value = false;
        switch (radioGroup.value) {
          case "debit":
            if (currBal - amount.value < accMinBal) {
              amountValue.value.setErrors(
                "Insufficient funds to perform this transaction"
              );

              return;
            }
            currentBalance.value = currBal - amount.value;
            break;

          default:
            currentBalance.value = amount.value + currBal;
            break;
        }

        let data = {
          account_number: customer.value[0].account_number,
          account_id: customer.value[0].account_id,
          customer_id: customer.value[0].user.id,
          [radioGroup.value]: amount.value,
          balance: currentBalance.value,
          type: radioGroup.value + "ed",
        };

        overlay.value = true;
        saveTransaction(data)
          .then(() => {
            msgHeader.value = "Success";
            msgBody.value = "Transaction is completed successfully";
            msgIcon.value = "mdi-check-circle";
            color.value = "success";
            emitter.emit("savedTransaction", true);
          })
          .finally(() => {
            form1.value.reset();
            form2.value.reset();
            overlay.value = false;
            actionResponse.value = true;
            success.value = false;
          })
          .catch((e) => {
            console.log(e);
            switch (e.response.status) {
              case 422:
                msgBody.value = e.response.data.message;
                break;
              case 500:
                msgBody.value =
                  "The transaction could not be completed due to internet loss";
                break;
              default:
                msgBody.value =
                  "Try Again Later or Call the System Administrator";

                break;
            }

            msgHeader.value = "Error";
            msgIcon.value = "mdi-close-circle";
            color.value = "error";
          });
      };

      provide("color", color);

      return {
        ...toRefs(generalForm),
        searchAccNum,
        addTransaction,
      };
    },
  });
</script>
<style scoped>
  .v-card {
    transition: opacity 0.4s ease-in-out;
  }

  .show-btns {
    color: rgb(0, 46, 105) !important;
    cursor: pointer !important;
  }

  .shake {
    border: 1px solid red;
    border-radius: 5px;
    animation: shake-animation 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }
  @keyframes shake-animation {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
