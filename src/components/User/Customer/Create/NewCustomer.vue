<template>
  <v-container fluid>
    <!-- <PageHeader>
      <span slot="courses" class="font-weight-light">NEW </span> STAFF
    </PageHeader> -->

    <v-row justify="center">
      <v-col cols="12" lg="3">
        <div style="position: sticky; top: 65px">
          <v-item-group v-model="curr" class="shrink" mandatory tag="v-flex">
            <v-item
              v-for="(step, n) in steps"
              :key="n"
              v-slot="{ active, toggle }"
            >
              <div>
                <v-btn
                  style="width: 100%"
                  @click="toggle"
                  depressed
                  :disabled="curr < n"
                  :class="{
                    'font-weight-bold': active,
                    red: active && !step.valid,
                    grey: curr === n && step.valid,
                    success: curr > n,
                  }"
                  class="mb-3 white--text d-flex justify-space-between"
                >
                  <div>{{ step.name }}</div>

                  <v-scroll-x-transition>
                    <v-icon v-if="curr > n"> mdi-check </v-icon>
                    <v-icon v-else-if="active && !step.valid">
                      mdi-alert-decagram-outline
                    </v-icon>
                  </v-scroll-x-transition>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>
        </div>
      </v-col>

      <v-col cols="12" lg="9">
        <v-window v-model="curr" flat>
          <template v-for="(step, n) in steps">
            <v-window-item :step="n" :key="n + 'content'">
              <keep-alive>
                <component
                  @page="data"
                  :is="step.componentname"
                  @goto="goto"
                  @send="send"
                  :key="reset"
                />
              </keep-alive>

              <span>
                <v-btn class="ml-4" text v-if="curr > 0" @click="curr = n - 1">
                  Back
                </v-btn>
              </span>
            </v-window-item>
          </template>
        </v-window>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-overlay :absolute="!absolute" :value="overlay">
          <v-progress-circular
            :value="progress"
            :rotate="360"
            :size="100"
            :width="15"
          >
            {{ `${progress}%` }}
          </v-progress-circular>
        </v-overlay>
      </v-col>
    </v-row>

    <Response v-if="actionResponse">
      <template v-slot:header>{{ msgHeader }}</template>
      <template v-slot:body>{{ msgBody }}</template>
      <template v-slot:icon>{{ msgIcon }}</template>
    </Response>
  </v-container>
</template>

<script>
  import PageHeader from "@/components/Slots/PageHeader";
  import { provide, reactive, toRefs } from "@vue/composition-api";
  import PersonalDetails from "@/components/User/Customer/Create/PersonalDetails";
  import NextOfKin from "@/components/User/Customer/Create/NextOfKin";
  import AccountDetails from "@/components/User/Customer/Create/AccountDetails";
  import Files from "@/components/User/Customer/Create/Files";
  import Results from "@/components/User/Customer/Create/Results";

  import Api from "@/apis/Api";
  import Response from "@/components/ActionResponse/Response";
  export default {
    components: {
      PageHeader,
      Files,
      PersonalDetails,
      AccountDetails,
      NextOfKin,
      Results,
      Response,
    },
    setup(props, context) {
      const stepperForm = reactive({
        valid: true,
        stepForm: [],
        curr: 0,
        steps: [
          {
            name: "Personal Details",
            componentname: "PersonalDetails",
            valid: true,
          },
          { name: "Next Of Kin", componentname: "NextOfKin", valid: true },
          { name: "Files", componentname: "Files", valid: true },
          {
            name: "Account Details",
            componentname: "AccountDetails",
            valid: true,
          },
          { name: "Results", componentname: "results", valid: true },
        ],
        formData: new FormData(),
        progress: 0,
        overlay: false,
        msgHeader: null,
        msgBody: null,
        msgIcon: null,
        actionResponse: false,
        color: null,
        absolute: true,
        reset: 0,
      });

      const store = context.root.$store;

      const {
        reset,
        curr,
        steps,
        formData,
        progress,
        overlay,
        msgHeader,
        msgBody,
        msgIcon,
        actionResponse,
        color,
      } = toRefs(stepperForm);

      const data = (response) => {
        const { bool, page, data, name } = response;
        if (bool) {
          steps.value[page].valid = true;
          curr.value = page + 1;

          if (data.pic) {
            formData.value.append("file", data.pic);
            delete data.pic;
            formData.value.append(name, JSON.stringify(data));
          } else if (data.files) {
            data.files.forEach((file, i) => {
              formData.value.append("documents[" + i + "]", file.file);
            });
            formData.value.append("sms", JSON.stringify(data.sms));
          } else formData.value.append(name, JSON.stringify(data));
          return;
        }
        steps.value[page].valid = false;
      };

      const send = (bool) => {
        if (bool) {
          progress.value = 0;
          overlay.value = true;
          actionResponse.value = false;
          Api()
            .post("/new_user", formData.value, {
              onUploadProgress: (e) => {
                progress.value = Math.round((e.loaded * 100) / e.total);
              },
            })
            .then((res) => {
              store.commit("SET_NEW_CUSTOMER", res.data.data);
              msgHeader.value = "Success";
              msgBody.value = "New Customer Is Created Successfully";
              msgIcon.value = "mdi-check-circle";
              color.value = "success";
              overlay.value = false;
              actionResponse.value = true;
              reset.value++;
              curr.value = 0;
            })
            .catch((e) => {
              console.log(e);
              msgHeader.value = "Error";
              msgBody.value = "Try Again Later or Call the System Administrator";
              msgIcon.value = "mdi-close-circle";
              color.value = "error";
              actionResponse.value = true;
            });
        }
      };

      const stepComplete = (step) => {
        return curr.value > step;
      };

      provide("color", color);

      const goto = (step) => (curr.value = step);

      return {
        ...toRefs(stepperForm),
        stepComplete,
        data,
        send,
        goto,
      };
    },
  };
</script>

<style scoped>
  .current {
    border: 5px solid red;
  }
</style>
