<template>
  <v-container fluid>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
      <v-form @submit.prevent>
        <v-card class="mb-2" color="teal lighten-2" dark>
          <v-card-title primary-title> Services </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="sms"
                  label="SMS Alert"
                  color="white"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card color="teal" dark class="mb-2">
          <v-card-title>
            Proof of Residential and Postal Address (any of the following):
          </v-card-title>
          <v-card-text>
            <ValidationProvider v-slot="{ errors }">
              <v-row align="center">
                <v-col v-for="(file, index) in ex4" :key="index">
                  <v-checkbox
                    :value="file"
                    v-model="files"
                    :label="file.label"
                    color="white"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>

              <div v-if="errors.length > 0">
                {{ errors }}
              </div>
            </ValidationProvider>
          </v-card-text>
        </v-card>

        <v-slide-y-transition v-if="files.length > 0">
          <v-card outlined>
            <v-card-text>
              <v-row align="center" v-for="(file, index) in files" :key="index">
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|ext:pdf,jpeg,jpg,png"
                  >
                    <v-file-input
                      v-model="file.file"
                      show-size
                      outlined
                      :label="file.label"
                      hide-details="auto"
                      :error-messages="errors"
                      hint="File extensions. jpg, jpeg, png are required"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="info accent-4"
                          dark
                          label
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-slide-y-transition>

        <v-row class="mt-3">
          <v-col>
            <v-btn color="primary" :disabled="invalid" @click="validate">
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "@vue/composition-api";
  import { required, ext } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  setInteractionMode("eager");

  extend("exact_length", {
    params: ["length", "message"],
    validate(val, { length, message }) {
      if (val.length === 0) return message ?? "Tick At Least " + length + " item";
      return true;
    },
  });

  extend("required", {
    ...required,
    message: "Field is required",
  });

  extend("ext", {
    ...ext,
    message: "File extensions. pdf, jpg, jpeg, png are required",
  });

  export default defineComponent({
    setup(props, context) {
      const filesForm = reactive({
        ex4: [
          { label: "Utility Bill", file: null },
          { label: "Tenancy Agreement", file: null },
          { label: 'Employer"s Reference Letter', file: null },
        ],
        files: [],
        observer: null,
        sms: false,
      });

      const { files, observer, sms } = toRefs(filesForm);

      const validate = async () => {
        await observer.value.validate().then((result) => {
          if (result) {
            let data = { files: files.value, sms: sms.value };
            
            context.emit("page", { bool: true, page: 2, data, name: "files" });
          } else context.emit("page", { bool: false, page: 2 });
        });
      };

      return {
        validate,
        ...toRefs(filesForm),
      };
    },
  });
</script>
<style scoped>
  .v-card {
    transition: opacity 0.4s ease-in-out;
  }

  .show-btns {
    color: #002e69 !important;
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 1) 5px,
      rgba(206, 206, 206, 0.25) 20px
    );
  }
</style>
