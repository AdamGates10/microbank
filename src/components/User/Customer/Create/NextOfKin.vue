<template>
  <v-card flat>
    <v-card-title primary-title v-show="props.user_id">
      Next Of Kin
    </v-card-title>
    <v-card-text class="px-0">
      <validation-observer ref="observer">
        <v-form @submit.prevent>
          <v-container fluid class="px-0">
            <v-card outlined class="pa-4">
              <v-row>
                <v-col cols="12" lg="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      hide-details="auto"
                      label="Next of Kin's name"
                      v-model="kinName"
                      :error-messages="errors"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-menu
                    v-model="menuDob"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Date of birth"
                        rules="required"
                      >
                        <v-text-field
                          v-model="kinDob"
                          label="Date of birth"
                          readonly
                          outlined
                          hide-details="auto"
                          :error-messages="errors"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </validation-provider>
                    </template>
                    <v-date-picker
                      v-model="kinDob"
                      @input="menuDob = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <!-- <v-col cols="12" lg="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Hometown"
                    :rules="{
                      required: true,
                      regex: /[a-zA-Z]([\w\W -]*[a-zA-Z])?$/,
                    }"
                  >
                    <v-text-field
                      hide-details="auto"
                      label="Hometown"
                      :error-messages="errors"
                      v-model="kinHometown"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </v-col> -->
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Mobile number 1"
                    :rules="{
                      required: true,
                      digits: 10,
                      regex: '^(0)\\d{9}$',
                    }"
                  >
                    <v-text-field
                      hide-details="auto"
                      label="Mobile number 1"
                      v-model="kinNumber1"
                      :error-messages="errors"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" lg="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Mobile number 2"
                    :rules="{
                      regex: kinNumber2 ? '^(0)\\d{9}$' : '',
                    }"
                  >
                    <v-text-field
                      hide-details="auto"
                      label="Mobile number 2 (optional)"
                      v-model="kinNumber2"
                      :error-messages="errors"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Address"
                    rules="required"
                  >
                    <v-textarea
                      hide-details="auto"
                      outlined
                      label="Address"
                      :error-messages="errors"
                      v-model="kinAddress"
                    ></v-textarea>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card>
          </v-container>

          <v-row class="mt-3">
            <v-col>
              <v-btn v-if="!props.user_id" color="primary" @click="sendData">
                Continue
              </v-btn>
              <v-btn @click="addNewKin" color="success" v-else>
                save changes
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>
<script>
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import {
  required,
  min,
  alpha_dash,
  alpha,
  alpha_num,
  alpha_spaces,
  regex,
} from "vee-validate/dist/rules";
import { extend, setInteractionMode } from "vee-validate";
import { useActions } from "vuex-composition-helpers";

setInteractionMode("eager");

extend("regex", {
  ...regex,
  message: "{_field_}  must be ten digits starting with zero(0)",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("min", {
  ...min,
  message: "{_field_} can not be empty",
});

extend("alpha_dash", {
  ...alpha_dash,
  message: "{_field_} can only accepts alphabets",
});

extend("alpha", {
  ...alpha,
  message: "{_field_} can only accepts alphabets",
});

extend("alpha_num", {
  ...alpha_num,
  message: "{_field_} can only accepts alphabets and numbers",
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "{_field_} can only accepts alphabets",
});
export default defineComponent({
  props: ["user_id"],
  setup(props, context) {
    const { userKin } = useActions(["userKin"]);
    const nextOfKin = reactive({
      observer: null,
      valid: true,
      kinName: "",
      kinDob: "",
      kinAddress: "",
      kinNumber1: "",
      kinNumber2: "",
      // kinHometown: "",
      menuDob: false,
      kinNumberError: "",
    });

    const {
      observer,
      kinName,
      kinDob,
      kinAddress,
      kinNumber1,
      kinNumber2,
      // kinHometown,
    } = toRefs(nextOfKin);

    const sendData = async () => {
      await observer.value.validate().then((result) => {
        if (result) {
          let data = {
            kin_name: kinName.value,
            kin_dob: kinDob.value,
            kin_address: kinAddress.value,
            kin_number1: kinNumber1.value,
            kin_number2: kinNumber2.value,
            // kin_hometown: kinHometown.value,
          };

          context.emit("page", {
            bool: true,
            page: 1,
            data,
            name: "nextofkin",
          });
        } else context.emit("page", { bool: false, page: 1 });
      });
    };

    const addNewKin = async () => {
      await observer.value.validate().then((result) => {
        if (result) {
          let data = {
            kin_name: kinName.value,
            kin_dob: kinDob.value,
            kin_address: kinAddress.value,
            kin_number1: kinNumber1.value,
            kin_number2: kinNumber2.value,
            // kin_hometown: kinHometown.value,
            user_id: props.user_id,
          };

          userKin(data);
        }
      });
    };

    return {
      ...toRefs(nextOfKin),
      sendData,
      addNewKin,
      props,
    };
  },
});
</script>
