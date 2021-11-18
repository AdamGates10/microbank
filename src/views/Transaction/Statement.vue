<template>
  <v-container fluid>
    <validation-observer ref="observer" tag="form" v-slot="{ passes, invalid }">
      <v-form ref="form" @submit.prevent>
        <v-card>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col cols="12" lg="4">
                <v-dialog
                  ref="dialog1"
                  v-model="modal1"
                  :return-value.sync="date1"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Start Date"
                      rules="required"
                    >
                      <v-text-field
                        required
                        :error-messages="errors"
                        v-model="date1"
                        outlined
                        hide-details="auto"
                        label="Start Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </validation-provider>
                  </template>
                  <v-date-picker v-model="date1" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(date1)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="4">
                <v-dialog
                  ref="dialog2"
                  v-model="modal2"
                  :return-value.sync="date2"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors }"
                      name="End Date"
                      rules="required"
                    >
                      <v-text-field
                        outlined
                        :error-messages="errors"
                        hide-details="auto"
                        v-model="date2"
                        label="End Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </template>
                  <v-date-picker v-model="date2" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog2.save(date2)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="4">
                <v-btn
                  color="success"
                  :loading="loading"
                  type="submit"
                  :disabled="invalid"
                  @click="passes(statementExcel)"
                  icon
                  x-large
                >
                  <v-icon color="success" x-large>mdi-microsoft-excel</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  :loading="loading"
                  type="submit"
                  :disabled="invalid"
                  @click="passes(statementPDF)"
                  icon
                  x-large
                >
                  <v-icon x-large color="red">mdi-file-pdf-box</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </validation-observer>
  </v-container>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "@vue/composition-api";
  import { required } from "vee-validate/dist/rules";
  import { extend, setInteractionMode } from "vee-validate";
  import Api from "@/apis/Api";
  setInteractionMode("eager");

  extend("required", {
    ...required,
    message: "{_field_} can not be empty",
  });

  export default defineComponent({
    setup() {
      const calendarForm = reactive({
        date1: null,
        modal1: false,
        date2: null,
        modal2: false,
        loading: false,
      });

      const { date1, date2, loading } = toRefs(calendarForm);

      const statementExcel = async () => {
        let statement = {
          start_date: `${date1.value}T00:00:00`,
          end_date: `${date2.value}T23:59:59`,
        };
        loading.value = true;
        await Api()
          .post(
            "/statementexcel",
            { basket: statement },
            { responseType: "blob" }
          )
          .then((res) => {
            let fileName = "statement";
            const url = URL.createObjectURL(
              new Blob([res.data], {
                type: "application/vnd.ms-excel;charset=utf-8",
              })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName + ".xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .finally(() => (loading.value = false));
      };

      const statementPDF = async () => {
        let statement = {
          start_date: `${date1.value}T00:00:00`,
          end_date: `${date2.value}T23:59:59`,
        };
        loading.value = true;
        await Api()
          .post("/statementpdf", { basket: statement }, { responseType: "blob" })
          .then((res) => {
            let fileName = "statementexcel";
            const url = URL.createObjectURL(
              new Blob([res.data], {
                type: "application/pdf;charset=utf-8",
              })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName + ".pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .finally(() => (loading.value = false));
      };

      return {
        ...toRefs(calendarForm),
        statementExcel,
        statementPDF,
      };
    },
  });
</script>
