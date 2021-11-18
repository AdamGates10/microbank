<template>
  <v-container fluid>
    <v-row v-if="getters_members">
      <v-col v-for="[key, value] in Object.entries(getters_members)" :key="key">
        <v-card :color="getColor()" dark>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" lg="8">
                <div>
                  <v-icon x-large>
                    {{
                      key === "staff"
                        ? " mdi-account-hard-hat "
                        : "mdi-account-multiple-outline"
                    }}
                  </v-icon>
                </div>
                <div class="font-weight-normal subtitle-1 text-capitalize">
                  {{ key }}
                </div>
              </v-col>
              <v-divider vertical class="my-4"></v-divider>
              <v-col
                cols="12"
                lg="4"
                class="font-weight-bold headline text-center"
              >
                {{ value }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="getters_countaccount">
      <v-col v-for="(account, i) in getters_countaccount" :key="i">
        <v-card dark :color="getColor()">
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" lg="8">
                <v-icon x-large color="">mdi-bank-outline</v-icon>
                <div>{{ account.account_name }}</div>
              </v-col>
              <v-divider vertical class="my-4"></v-divider>
              <v-col
                cols="12"
                lg="4"
                class="font-weight-bold headline text-center"
                v-text="account.total"
              ></v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { defineComponent } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";

  export default defineComponent({
    setup() {
      const { countMembers, countAccount } = useActions([
        "countMembers",
        "countAccount",
      ]);
      const { getters_members, getters_countaccount } = useGetters([
        "getters_members",
        "getters_countaccount",
      ]);

      Promise.all([countMembers(), countAccount()]);

      const getColor = () =>
        "#" + Math.floor(Math.random() * 16777215).toString(16);

      return {
        getters_members,
        getters_countaccount,
        getColor,
      };
    },
  });
</script>
