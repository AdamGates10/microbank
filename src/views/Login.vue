<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col md="4" sm="8" lg="3">
        <div class="mb-5" flat>
          <!-- <p><v-img :src="require('@/assets/gctu_logo.png')"></v-img></p> -->

          <p class="font-weight-bold text-center">
            DIVINE TRUSTIES SAVING AND LOANS
          </p>
        </div>
        <v-card class="align-center">
          <div class="text-center">
            <v-alert
              v-show="IsErrors"
              text
              prominent
              type="error"
              v-text="errors"
            />
          </div>

          <v-card-text>
            <v-form ref="form" @submit.prevent>
              <v-text-field
                outlined
                clearable
                v-model="emailAddress"
                prepend-inner-icon="mdi-account"
                label="Username"
                type="email"
                :rules="rules"
                required
                @focus="removeErrors"
                @keyup.enter="btnSignin"
              />

              <v-text-field
                outlined
                clearable
                ref="password"
                v-model="passwrd"
                prepend-inner-icon="mdi-lock"
                label="Password"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules"
                :type="show3 ? 'text' : 'password'"
                name="input-10-2"
                class="input-group--focused"
                @keyup.enter="btnSignin"
                @click:append="show3 = !show3"
              />

              <v-card-actions>
                <v-spacer />
                <v-scale-transition>
                  <v-btn
                    color="primary"
                    :loading="loading"
                    @click="btnSignin"
                    width="150"
                    class="font-weight-bold"
                  >
                    Login
                  </v-btn>
                </v-scale-transition>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { computed, reactive, toRefs } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";

  export default {
    setup(props, context) {
      document.title = context.root._route.meta.title;
      const { authenticated } = useGetters(["authenticated"]);
      const { signIn } = useActions(["signIn"]);

      const form = reactive({
        emailAddress: "",
        passwrd: "",
        device: "browser",
        disabled: false,
        loading: false,
        rules: [(value) => !!value || "Required."],
        errors: [],
        show3: false,
      });

      const { disabled, loading, emailAddress, passwrd, errors } = toRefs(form);

      const IsErrors = computed(() => {
        return errors.value.length > 0;
      });

      const btnSignin = () => {
        let email = emailAddress.value;
        let password = passwrd.value;

        disabled.value = true;

        let v = context.refs.form.validate();
        if (v) {
          loading.value = true;
          signIn({ email, password })
            .then(() => {
              loading.value = false;
              if (authenticated.value) {
                context.root._router.push({
                  path: context.root._route.query.redirect || `/home`,
                });
              }
            })
            .catch((error) => {
              loading.value = false;
              disabled.value = false;
              context.refs.form.reset();
              switch (error.response.status) {
                case 422:
                  errors.value = "User Credentials Are Invalid";

                  break;

                case 429:
                  errors.value = "Too Many Requests";

                  break;

                default:
                  errors.value = "Try Again Later";
                  break;
              }
            });
        } else {
          disabled.value = false;
        }
      };

      const removeErrors = () => {
        errors.value = [];
      };

      return {
        IsErrors,
        removeErrors,
        btnSignin,
        loading,
        ...toRefs(form),
        errors,
      };
    },
  };
</script>

<style></style>
