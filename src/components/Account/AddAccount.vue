<template>
  <v-container fluid>
    <validation-observer ref="observer" tag="form" v-slot="{ passes, invalid }">
      <v-form ref="form" @submit.prevent="passes(addAccountBtn)">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>ADD ACCOUNT</v-toolbar-title>
        </v-toolbar>
        <v-row class="mt-4">
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Account name"
              rules="required|alpha"
            >
              <v-text-field
                hide-details="auto"
                label="Account Name"
                outlined
                placeholder="Account Name"
                v-model="accountName"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>

          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Account code"
              rules="required|numeric"
            >
              <v-text-field
                hide-details="auto"
                label="Account Code"
                outlined
                placeholder="Account Code"
                v-model.number="accountCode"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>

          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Minimum Balance"
              rules="required|numeric"
            >
              <v-text-field
                hide-details="auto"
                label="Minimum Balance"
                outlined
                placeholder="Minimum Balance"
                v-model.number="minBalance"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col>
            <v-btn type="submit" color="primary" :disabled="invalid">
              Continue
            </v-btn>
          </v-col>
        </v-row>
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
  import { required, numeric, alpha } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  import { useActions } from "vuex-composition-helpers";
  import Response from "@/components/ActionResponse/Response";

  setInteractionMode("eager");

  extend("numeric", {
    ...numeric,
    message: "{_field_} is invalid. ",
  });

  extend("required", {
    ...required,
    message: "{_field_} can not be empty",
  });

  extend("alpha", {
    ...alpha,
    message: "{_field_} is invalid",
  });

  export default defineComponent({
    components: {
      Response,
    },
    setup() {
      const { addAccount } = useActions(["addAccount"]);
      const accountForm = reactive({
        accountName: null,
        accountCode: null,
        minBalance: 0,
        form: null,
        overlay: false,
        msgHeader: null,
        msgBody: null,
        msgIcon: null,
        color: null,
        actionResponse: false,
      });

      const {
        overlay,
        accountName,
        accountCode,
        minBalance,
        form,
        msgHeader,
        msgBody,
        msgIcon,
        color,
        actionResponse,
      } = toRefs(accountForm);

      const addAccountBtn = () => {
        actionResponse.value = false;
        overlay.value = true;
        addAccount({
          account_name: accountName.value,
          account_code: accountCode.value,
          min_balance: minBalance.value,
        })
          .then(() => {
            msgHeader.value = "Success";
            msgBody.value = "New Customer Is Created Successfully";
            msgIcon.value = "mdi-check-circle";
            color.value = "success";
          })
          .catch(() => {
            msgHeader.value = "Error";
            msgBody.value = "Try Again Later or Call the System Administrator";
            msgIcon.value = "mdi-close-circle";
            color.value = "error";
          })
          .finally(() => {
            actionResponse.value = true;
            overlay.value = false;
            form.value.reset();
          });
      };

      provide("color", color);

      return {
        ...toRefs(accountForm),
        addAccountBtn,
      };
    },
  });
</script>
