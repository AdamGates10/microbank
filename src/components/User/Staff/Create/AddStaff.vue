<template>
  <v-container fluid>
    <validation-observer ref="observer" tag="form" v-slot="{ passes, invalid }">
      <v-form ref="form" @submit.prevent="passes(addStaffBtn)">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>ADD STAFF</v-toolbar-title>
        </v-toolbar>
        <v-row class="mt-4">
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Staff name"
              rules="required|alpha_spaces"
            >
              <v-text-field
                dense
                hide-details="auto"
                label="Staff Name"
                outlined
                placeholder="Staff Name"
                v-model="name"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>

          <v-col cols="12" lg="12">
            <validation-provider
              v-slot="{ errors }"
              name="Staff Email"
              rules="required|email"
            >
              <v-text-field
                dense
                hide-details="auto"
                label="Staff Email"
                v-model="email"
                :error-messages="errors"
                outlined
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" lg="12">
            <validation-provider
              v-slot="{ errors }"
              name="Mobile number"
              :rules="{
                required: true,
                digits: 10,
                regex: '^(0)\\d{9}$',
              }"
            >
              <v-text-field
                dense
                hide-details="auto"
                outlined
                label="Mobile Number"
                :error-messages="errors"
                v-model="mobileNumber"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" lg="12">
            <validation-provider
              v-slot="{ errors }"
              name="Mobile number 2"
              :rules="{
                regex: mobileNumber2 ? '^(0)\\d{9}$' : '',
              }"
            >
              <v-text-field
                dense
                hide-details="auto"
                label="Mobile number 2 (optional)"
                v-model="mobileNumber2"
                :error-messages="errors"
                outlined
              ></v-text-field>
            </validation-provider>
          </v-col>

          <v-col cols="12" lg="12">
            <validation-provider
              v-slot="{ errors }"
              rules="required|min:8|contains_number|contains_lowercase|contains_uppercase"
              name="Password"
            >
              <v-text-field
                dense
                hide-details="auto"
                label="Password"
                v-model="password"
                :error-messages="errors"
                outlined
                :type="show1 ? 'text' : 'password'"
                :hint="
                  contains_lowercase &&
                  contains_number &&
                  contains_uppercase &&
                  min_characters
                    ? 'Password is strong'
                    : 'Password is not strong'
                "
              >
                <template v-slot:append>
                  <v-icon @click="show1 = !show1">{{
                    show1 ? "mdi-eye" : "mdi-eye-off"
                  }}</v-icon>
                  <v-slide-x-reverse-transition>
                    <v-avatar
                      size="30"
                      class="mt-n1"
                      :color="
                        contains_lowercase &&
                        contains_number &&
                        contains_uppercase &&
                        min_characters
                          ? 'success'
                          : 'error'
                      "
                      v-if="password"
                    >
                      <span class="white--text">{{ password.length }}</span>
                    </v-avatar>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>
            </validation-provider>

            <div class="mt-5">
              <div>
                <v-icon>mdi-circle-small</v-icon>
                <span v-bind:class="{ lowercase_valid: contains_lowercase }">
                  Lowercase
                </span>
              </div>

              <div>
                <v-icon>mdi-circle-small</v-icon>
                <span v-bind:class="{ number_valid: contains_number }">
                  Number
                </span>
              </div>

              <div>
                <v-icon>mdi-circle-small</v-icon>
                <span v-bind:class="{ characters_valid: min_characters }">
                  Eight characters
                </span>
              </div>

              <div>
                <v-icon>mdi-circle-small</v-icon>
                <span v-bind:class="{ uppercase_valid: contains_uppercase }">
                  Uppercase
                </span>
              </div>
            </div>
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
    watch,
  } from "@vue/composition-api";
  import {
    required,
    numeric,
    alpha_spaces,
    regex,
    email,
    digits,
    min,
  } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  import { useActions } from "vuex-composition-helpers";
  import Response from "@/components/ActionResponse/Response";

  setInteractionMode("eager");

  extend("min", {
    ...min,
    message: "{_field_} should be more than 8 characters. ",
  });

  extend("numeric", {
    ...numeric,
    message: "{_field_} is invalid. ",
  });

  extend("required", {
    ...required,
    message: "{_field_} can not be empty",
  });

  extend("email", {
    ...email,
    message: "{_field_} can not be empty",
  });

  extend("alpha_spaces", {
    ...alpha_spaces,
    message: "{_field_} is invalid",
  });

  extend("regex", {
    ...regex,
    message: "{_field_}  not a valid mobile number",
  });

  extend("digits", {
    ...digits,
    message: "{_field_}  not a valid mobile number",
  });

  extend("contains_uppercase", {
    message: `The password must contain at least 1 uppercase letter`,
    validate: (value) => {
      var regex = new RegExp("^(?=.*[A-Z])");
      return regex.test(value);
    },
  });

  extend("contains_number", {
    message: `The password must contain at 1 number`,
    validate: (value) => {
      var regex = new RegExp("^(?=.*[0-9])");
      return regex.test(value);
    },
  });

  extend("contains_lowercase", {
    message: `The password must contain at least 1 Lowercase letter`,
    validate: (value) => {
      var regex = new RegExp("^(?=.*[a-z])");
      return regex.test(value);
    },
  });

  export default defineComponent({
    components: {
      Response,
    },
    setup() {
      const { addStaff } = useActions(["addStaff"]);
      const staffForm = reactive({
        name: null,
        email: null,
        mobileNumber: null,
        mobileNumber2: null,
        form: null,
        overlay: false,
        msgHeader: null,
        msgBody: null,
        msgIcon: null,
        color: null,
        actionResponse: false,
        password: null,
        countPassword: 0,
        contains_lowercase: false,
        contains_number: false,
        contains_uppercase: false,
        min_characters: false,
        show1: false,
      });

      const {
        contains_lowercase,
        contains_number,
        contains_uppercase,
        min_characters,
        password,
        overlay,
        name,
        email,
        mobileNumber,
        mobileNumber2,
        form,
        msgHeader,
        msgBody,
        msgIcon,
        color,
        actionResponse,
      } = toRefs(staffForm);

      watch(password, (pass) => {
        contains_lowercase.value = /[a-z]/.test(pass);
        contains_number.value = /\d/.test(pass);
        contains_uppercase.value = /[A-Z]/.test(pass);
        min_characters.value = pass.length > 7 ? true : false;
      });

      const addStaffBtn = () => {
        actionResponse.value = false;
        overlay.value = true;
        addStaff({
          name: name.value,
          email: email.value,
          mobile_number_1: mobileNumber.value,
          mobile_number_2: mobileNumber2.value,
          password: password.value,
        })
          .then(() => {
            msgHeader.value = "Success";
            msgBody.value = "New Staff Is Created Successfully";
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
            contains_lowercase.value = false;
            contains_number.value = false;
            contains_uppercase.value = false;
            min_characters.value = false;
          });
      };

      provide("color", color);

      return {
        ...toRefs(staffForm),
        addStaffBtn,
      };
    },
  });
</script>
<style >
  .lowercase_valid,
  .number_valid,
  .uppercase_valid,
  .characters_valid {
    text-decoration: line-through;
    color: green;
  }
</style>