<template>
  <v-container fluid>
    <v-overlay absolute :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <template v-if="!overlay">
      <v-toolbar color="primary" dark elevation="1" rounded>
        {{ `${customer.other_names} ${customer.last_name}` }}
        <v-spacer></v-spacer>
        <span v-text="`${currentAccType} Account`"></span>
        <v-icon>mdi-circle-small</v-icon>
        <span v-text="`${currentAccNumber}`"></span>
      </v-toolbar>
      <v-row>
        <v-col>
          <v-data-table
            tile
            :headers="headers"
            :items="items"
            class="elevation-1"
            :loading="isLoaded"
            item-key="id"
            disable-pagination
            hide-default-footer
          >
            <template #item.created_at="{ value }">
              {{ moment(value).format("Do MMMM YYYY, h:mm:ss a") }}
            </template>
            <template v-slot:no-data>
              <span class="subheading font-weight-bold">Not available</span>
            </template>
          </v-data-table>

          <v-card
            v-if="getters_customer_transaction.length"
            v-intersect="intersected"
          >
            <v-progress-linear
              :indeterminate="true"
              v-if="loadingScroll"
            ></v-progress-linear>
          </v-card>
        </v-col>
      </v-row>
    </template>
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

  export default defineComponent({
    setup() {
      const currentAccNumber = inject("currentAccNumber");
      const currentAccType = inject("currentAccType");
      const { getCustomerTransaction } = useActions(["getCustomerTransaction"]);
      const {
        getters_customer_transaction,
        getters_customer_transaction_meta,
        customer,
      } = useGetters([
        "getters_customer_transaction",
        "getters_customer_transaction_meta",
        "customer",
      ]);

      const transaction = reactive({
        overlay: true,
        loadingScroll: false,
        page: 1,
        isIntersecting: false,
        items: [],
        headers: [
          { text: "CREDIT", value: "credit" },
          { text: "DEBIT", value: "debit" },
          { text: "BALANCE", value: "balance" },
          { text: "DATE", value: "created_at" },
        ],
        isLoaded: true,
      });

      const { overlay, loadingScroll, page, isIntersecting, items, isLoaded } =
        toRefs(transaction);

      getCustomerTransaction({
        page: page.value,
        acc_number: currentAccNumber.value,
      })
        .then(() => {
          items.value = getters_customer_transaction.value;
          overlay.value = false;
        })
        .finally(() => (isLoaded.value = false));

      const intersected = (entries) => {
        isIntersecting.value = entries[0].isIntersecting;
        if (!isIntersecting.value) {
          loadingScroll.value = true;
          return;
        }
        if (
          getters_customer_transaction_meta.value.current_page >=
          getters_customer_transaction_meta.value.last_page
        ) {
          loadingScroll.value = false;
          return;
        }

        page.value++;
        getCustomerTransaction({
          page: page.value,
          acc_number: currentAccNumber.value,
        }).then(() => {
          loadingScroll.value = false;
          items.value = [
            ...new Set([...getters_customer_transaction.value, ...items.value]),
          ];
        });
      };

      return {
        ...toRefs(transaction),
        getters_customer_transaction,
        intersected,
        currentAccNumber,
        currentAccType,
        customer,
      };
    },
  });
</script>
