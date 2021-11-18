<template>
  <v-card outlined class="pa-4">
    <validation-observer ref="observer">
      <v-form @submit.prevent ref="form1">
        <v-row>
          <v-col cols="12" lg="6">
            <v-hover v-slot="{ hover }" style="cursor: pointer !important">
              <v-card
                :elevation="hover ? 4 : 1"
                :class="{ 'on-hover': hover, shake: invalidImage }"
                @click="triggerUpload"
                class="mt-0"
              >
                <input
                  class="d-none"
                  ref="uploader"
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
                />
                <v-img aspect-ratio="1.23" contain :src="image">
                  <v-row
                    class="fill-height flex-column"
                    align="center"
                    justify="center"
                  >
                    <p
                      v-if="!image"
                      :class="{ 'show-btns': hover }"
                      class="title text-center px-4 text-wrap"
                    >
                      CLICK TO ADD PROFILE PICTURE
                    </p>
                  </v-row>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row>
              <v-col cols="12" lg="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Agent Name"
                  rules="required"
                >
                  <v-autocomplete
                    hide-details="auto"
                    label="Agent Name"
                    outlined
                    :items="getters_single_staff"
                    @keyup="searchStaffBtn"
                    item-text="name"
                    :loading="isLoaded"
                    item-value="id"
                    v-model="staffId"
                    :error-messages="errors"
                    required
                  ></v-autocomplete>
                </validation-provider>
              </v-col>
              <v-col cols="12" lg="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Other Names"
                  rules="required|alpha_spaces"
                >
                  <v-text-field
                    hide-details="auto"
                    label="Other Names"
                    outlined
                    v-model="othernames"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" lg="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Last Names  "
                  :rules="{
                    required: true,
                    regex: /[a-zA-Z]([\w\W -]*[a-zA-Z])?$/,
                  }"
                >
                  <v-text-field
                    hide-details="auto"
                    label="Last Name"
                    v-model="lastname"
                    :error-messages="errors"
                    required
                    outlined
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" lg="12">
                <v-menu
                  v-model="menu"
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
                        v-model="dob"
                        label="Date of Birth"
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
                    v-model="dob"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!--  <v-col cols="12" lg="12">
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
                    outlined
                    v-model="hometown"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Address"
                  rules="required"
                >
                  <v-text-field
                    label="Personal Postal Address"
                    outlined
                    v-model="address"
                    :error-messages="errors"
                    hide-details="auto"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" lg="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Personal Email"
                  rules="required|email"
                >
                  <v-text-field
                    hide-details="auto"
                    label="Personal Email"
                    v-model="personEmail"
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
                    hide-details="auto"
                    label="Mobile number 2 (optional)"
                    v-model="mobileNumber2"
                    :error-messages="errors"
                    outlined
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col>
            <v-btn type="submit" color="primary" @click="sendData">
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script>
  import { defineComponent, reactive, toRefs, watch } from "@vue/composition-api";
  import {
    required,
    alpha,
    alpha_spaces,
    regex,
    email,
    digits,
  } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  import { useActions, useGetters } from "vuex-composition-helpers";
  import debounce from "@/debounce/debounce";
  setInteractionMode("eager");

  extend("digits", {
    ...digits,
    message: "{_field_} needs to be {length} digits starting with zero(0). ",
  });

  extend("required", {
    ...required,
    message: "{_field_} can not be empty",
  });

  extend("email", {
    ...email,
    message: "{_field_} is not valid",
  });

  extend("alpha", {
    ...alpha,
    message: "{_field_} can only accepts alphabets",
  });

  extend("alpha_spaces", {
    ...alpha_spaces,
    message: "{_field_} can only accepts alphabets",
  });

  extend("regex", {
    ...regex,
    message: "{_field_}  not a valid name",
  });

  export default defineComponent({
    setup(props, context) {
      const { searchStaff } = useActions(["searchStaff"]);
      const { getters_single_staff } = useGetters(["getters_single_staff"]);

      const generalForm = reactive({
        observer: null,
        othernames: null,
        lastname: null,
        personEmail: null,
        title: null,
        mobileNumber: null,
        mobileNumber2: null,
        select: null,
        address: null,
        gender: null,
        titleArray: ["Mr.", "Mrs.", "Miss.", "Dr.", "Prof."],
        genderArray: ["Male", "Female"],
        hometown: null,
        dob: null,
        valid: true,
        nationality: "",
        transparent: "rgba(255, 255, 255, 0)",
        image: null,
        uploader: null,
        menu: false,
        profilePicture: null,
        error: false,
        sheet: false,
        invalidImage: false,
        staffId: null,
        isLoaded: false,
      });

      const {
        staffId,
        isLoaded,
        invalidImage,
        observer,
        uploader,
        image,
        title,
        gender,
        othernames,
        lastname,
        dob,
        profilePicture,
        error,
        personEmail,
        mobileNumber,
        mobileNumber2,
        address,
      } = toRefs(generalForm);

      watch(
        () => title.value,
        (title) => {
          switch (title) {
            case "Miss.":
              gender.value = "Female";
              break;
            case "Mr.":
              gender.value = "Male";
              break;
            case "Mrs.":
              gender.value = "Female";
              break;
            default:
              gender.value = null;
              break;
          }
        }
      );

      const uploadImage = (e) => {
        invalidImage.value = false;
        profilePicture.value = e.target.files[0];
        if (!profilePicture.value.type.match("image/*")) {
          image.value = null;
          return setTimeout(() => (invalidImage.value = true), 100);
        }
        const reader = new FileReader();
        reader.readAsDataURL(profilePicture.value);
        reader.onload = (e) => {
          image.value = e.target.result;
        };
      };

      const triggerUpload = () => {
        uploader.value.click();
      };

      const sendData = async () => {
        if (image.value == null) invalidImage.value = true;
        await observer.value.validate("form1").then((result) => {
          if (result && !invalidImage.value) {
            let data = {
              othernames: othernames.value,
              lastname: lastname.value,
              dob: dob.value,
              pic: profilePicture.value,
              personEmail: personEmail.value,
              mobileNumber: mobileNumber.value,
              mobileNumber2: mobileNumber2.value,
              address: address.value,
              user_id: staffId.value,
            };

            context.emit("page", { bool: true, page: 0, data, name: "general" });
          }
          if (result === false) {
            context.emit("page", { bool: false, page: 0 });
            error.value = true;
            return;
          }
        });
      };

      const searchStaffBtn = debounce((event) => {
        isLoaded.value = true;
        searchStaff(event.target.value).finally(() => (isLoaded.value = false));
      });

      return {
        ...toRefs(generalForm),
        sendData,
        uploadImage,
        triggerUpload,
        getters_single_staff,
        searchStaffBtn,
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
