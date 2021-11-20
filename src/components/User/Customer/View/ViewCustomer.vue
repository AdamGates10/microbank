<template>
  <v-container fluid>
    <template v-if="response">
      <v-card tile flat v-if="customer">
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" lg="6">
              <v-breadcrumbs
                class="pl-0"
                large
                :items="breadcrumbs"
              ></v-breadcrumbs>
            </v-col>
            <!-- <v-col class="text-right" cols="12" lg="6">
              <v-btn color="success" @click="editCustomer">
                <v-icon left>mdi-pencil</v-icon>
                Edit Customer
              </v-btn>
            </v-col> -->
          </v-row>

          <v-row align="center">
            <v-col cols="12" lg="5">
              <v-avatar size="250" tile>
                <img :src="customer.avatar_url" alt="" />
              </v-avatar>
            </v-col>
            <v-col cols="12" lg="7">
              <v-list class="pt-0">
                <v-list-item
                  class="text-h4"
                  v-text="`${customer.other_names} ${customer.last_name}`"
                ></v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-calendar-account-outline </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="`${moment(customer.dob).format('Do MMMM YYYY')}`"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-home-map-marker </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="`${customer.address}`"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-phone </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span> {{ customer.mobile_number_1 }} </span>
                      <span v-if="customer.mobile_number_2">
                        {{ customer.mobile_number_2 }}
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-account-plus-outline </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span> {{ customer.staff.name }} </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>

        <v-tabs v-model="tab" align-with-title>
          <v-tab v-for="item in tabItems" :key="item">
            {{ item }}
          </v-tab>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <UserDetails>
                <template #name>
                  {{ `${customer.other_names} ${customer.last_name}` }}
                </template>
                <template #dob>
                  {{ `${moment(customer.dob).format("Do MMMM YYYY")}` }}
                </template>
                <template #address>
                  <div class="text-wrap">
                    {{ `${customer.address}` }}
                  </div>
                </template>
                <template #mobile_number>
                  <span> {{ customer.mobile_number_1 }} </span>
                  <span v-if="customer.mobile_number_2">
                    {{ customer.mobile_number_2 }}
                  </span>
                </template>
                <template #next_of_kin>
                  {{ `${customer.next_of_kin}` }}
                </template>
                <template #kin_dob>
                  {{ `${moment(customer.kin_dob).format("Do MMMM YYYY")}` }}
                </template>
                <template #kin_mobile_number>
                  <span> {{ customer.kin_mobile_number_1 }} </span>
                  <span v-if="customer.kin_mobile_number_2">
                    {{ customer.kin_mobile_number_2 }}
                  </span>
                </template>
              </UserDetails>
            </v-tab-item>
            <v-tab-item>
              <UserAccount />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
      <v-alert prominent v-else type="error"> No Customer Found... </v-alert>
    </template>

    <v-overlay absolute v-model="overlay" opacity="1">
      <v-progress-circular size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
  import {
    defineComponent,
    inject,
    reactive,
    toRefs,
  } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";
  import UserDetails from "@/components/Slots/UserDetails";
  import UserAccount from "@/components/Slots/UserAccount";
  export default defineComponent({
    components: { UserDetails, UserAccount },
    setup(props, context) {
      const { getCustomer } = useActions(["getCustomer"]);
      const { customer } = useGetters(["customer"]);
      const customerId = inject("customerId");

      const data = reactive({
        overlay: true,
        pageTitle: context.root.$route.name,
        breadcrumbs: [],
        tab: null,
        tabItems: ["Customer Details", "Account Details"],
        response: false,
      });

      const { overlay, breadcrumbs, response } = toRefs(data);

      getCustomer(customerId.value)
        .then(() => {
          breadcrumbs.value = [
            {
              text: "Customer List",
              disabled: false,
              href: "/user_management/customerlist",
            },
            {
              text: `${customer.value.other_names} ${customer.value.last_name}`,
              disabled: true,
            },
          ];
        })
        .finally(() => {
          overlay.value = false;
          response.value = true;
        });

      const editCustomer = () => {};

      return {
        customer,
        editCustomer,
        ...toRefs(data),
      };
    },
  });
</script>
