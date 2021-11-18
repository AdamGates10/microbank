<template>
  <v-container fluid>
    <PageHeader>
      <span slot="header" class="font-weight-bold">CUSTOMER </span> LIST
    </PageHeader>

    <v-row>
      <v-col>
        <v-btn
          class="ma-2 font-weight-bold"
          @click="addnewCustomer"
          color="primary"
        >
          CREATE NEW CUSTOMER
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          fixed-header
          :headers="headers"
          :items="items"
          class="elevation-2"
          :loading="isLoaded"
          item-key="id"
          disable-pagination
          hide-default-footer
        >
          <template #item.basic="{ item }">
            <div class="d-flex align-center">
              <v-avatar size="40">
                <v-img
                  contain
                  :src="
                    item.avatar_url
                      ? item.avatar_url
                      : require('@/assets/download.jpg')
                  "
                  :lazy-src="item.avatar_url"
                ></v-img>
              </v-avatar>
            </div>
          </template>

          <template #item.basic="{ item }">
            <div
              class="subtitle-1"
              v-text="`${item.other_names} ${item.last_name}`"
            ></div>
          </template>

          <template #item.contact="{ item }">
            <div class="subtitle-1" v-text="`${item.mobile_number_1}`"></div>
          </template>

          <template #item.actions="{ item }">
            <v-menu
              offset-y
              open-on-hover
              transition="slide-x-transition"
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  outlined
                  color="grey darken-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list
                dark
                color="primary darken-2"
                min-width="250"
                tile
                class="py-0"
              >
                <v-list-item-group>
                  <v-list-item link @click="viewCustomerBtn(item)">
                    <v-list-item-content>
                      <v-list-item-title
                        >View Customer Details</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>

          <template v-slot:no-data>
            <span class="subheading font-weight-bold">Not available</span>
          </template>
        </v-data-table>

        <v-card v-if="getters_customers.length" v-intersect="intersected">
          <v-progress-linear
            :indeterminate="true"
            v-if="loadingScroll"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>

    <!-- View Customer -->
    <v-navigation-drawer
      overlay-color="black"
      v-model="openCustomer"
      fixed
      :permanent="openCustomer"
      right
      width="50%"
      class="shadow"
      clipped
    >
      <div class="mt-15 d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          @click="closeDrawer()"
          icon
          class="ma-2"
          to="/user_management/customerlist"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>

      <ViewCustomer v-if="openCustomer === true" />
    </v-navigation-drawer>

    <!--Edit Customer -->
    <v-navigation-drawer
      v-model="editCustomer"
      fixed
      :permanent="editCustomer"
      right
      width="70%"
      class="shadow"
      clipped
    >
      <div class="mt-15 d-flex justify-space-between">
        <v-btn
          class="ma-2"
          @click="
            editCustomer = !editCustomer;
            basket.pop();
          "
          v-if="basket.length > 1"
          icon
        >
          <v-icon>mdi-arrow-left-bold-circle</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" @click="closeDrawer()" icon>
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>

      <component :is="componentCurrent" v-if="editCustomer" />
    </v-navigation-drawer>

    <!-- Create New Customer -->
    <v-navigation-drawer
      clipped
      overlay-color="black"
      v-model="newCustomer"
      fixed
      :permanent="newCustomer"
      right
      width="70%"
      class="shadow"
    >
      <div class="mt-15 d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          @click="closeDrawer()"
          icon
          to="/user_management/customerlist"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>

      <NewCustomer v-if="newCustomer" />
    </v-navigation-drawer>

    <!-- View Customer Transaction -->
    <v-navigation-drawer
      clipped
      overlay-color="black"
      v-model="customerTransaction"
      fixed
      :permanent="customerTransaction"
      right
      width="50%"
      class="shadow"
    >
      <div class="mt-15 d-flex justify-space-between">
        <v-btn
          @click="
            customerTransaction = !customerTransaction;
            basket.pop();
          "
          class="ma-2"
          v-if="basket.length > 1"
          icon
        >
          <v-icon>mdi-arrow-left-bold-circle</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          @click="closeDrawer()"
          icon
          to="/user_management/customerlist"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>

      <ViewCustomerTransaction v-if="customerTransaction" />
    </v-navigation-drawer>
  </v-container>
</template>

<script>
  import PageHeader from "@/components/Slots/PageHeader";
  import ViewCustomer from "@/components/User/Customer/View/ViewCustomer";
  import ViewCustomerTransaction from "@/components/User/Customer/View/ViewCustomerTransaction";
  import Response from "@/components/ActionResponse/Response";
  import NewCustomer from "@/components/User/Customer/Create/NewCustomer";
  import { provide, reactive, toRefs } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";
  import debounce from "@/debounce/debounce";
  import emitter from "@/debounce/emitter";
  export default {
    components: {
      PageHeader,
      ViewCustomer,
      NewCustomer,
      Response,
      ViewCustomerTransaction,
    },
    props: ["id"],
    setup(props, context) {
      const customerTable = reactive({
        customerTransaction: false,
        componentCurrent: null,
        openCustomer: false,
        editCustomer: false,
        newCustomer: false,
        roleCustomer: false,
        isIntersecting: false,
        items: [],
        page: 1,
        isLoaded: true,
        headers: [
          { text: "CUSTOMER", value: "basic", sortable: true },
          { text: "CONTACT", value: "contact", sortable: true },
          { text: "ACTIONS", value: "actions", sortable: false, align: "right" },
        ],
        staffName: null,
        levelItem: "",
        deleteResponse: false,
        absolute: true,
        newFacultyText: "",
        basket: [
          {
            department_id: null,
            department_name: "",
            faculty_number: null,
          },
        ],
        loadingScroll: false,
        basketDrawer: [],
        currentId: null,
        currentAccNumber: null,
        currentAccType: null,
      });

      const { customerList } = useActions(["customerList"]);

      const { getters_customers, getters_customers_meta } = useGetters([
        "getters_customers",
        "getters_customers_meta",
      ]);

      const {
        page,
        isIntersecting,
        loadingScroll,
        isLoaded,
        items,
        openCustomer,
        basket,
        currentId,
        editCustomer,
        newCustomer,
        roleCustomer,
        //componentCurrent,
        staffName,
        customerTransaction,
        currentAccNumber,
        currentAccType,
      } = toRefs(customerTable);

      customerList(page.value)
        .then(() => {
          isLoaded.value = false;
          items.value = getters_customers.value;
          if (props.id) {
            switch (context.root.$route.name) {
              case "Customer":
                openCustomer.value = true;
                break;

              default:
                break;
            }
            currentId.value = props.id;
          }
        })
        .finally(() => {
          setTimeout(() => {
            switch (context.root.$route.name) {
              case "AddCustomer":
                newCustomer.value = true;
                break;

              default:
                break;
            }
          });
        });

      const intersected = (entries) => {
        isIntersecting.value = entries[0].isIntersecting;
        if (!isIntersecting.value) {
          loadingScroll.value = true;
          return;
        }
        if (
          getters_customers_meta.value.current_page >=
          getters_customers_meta.value.last_page
        ) {
          loadingScroll.value = false;
          return;
        }

        page.value++;
        customerList(page.value).then(() => {
          loadingScroll.value = false;
          items.value = [
            ...new Set([...getters_customers.value, ...items.value]),
          ];
        });
      };

      emitter.on("view-customer-transaction", (acc) => {
        customerTransaction.value = true;
        currentAccNumber.value = acc.number;
        currentAccType.value = acc.type;
        basket.value.push(customerTransaction.value);
      });

      const viewCustomerBtn = debounce((customer) => {
        openCustomer.value = true;
        currentId.value = customer.id;
        basket.value.push(openCustomer.value);
        context.root._router.replace({
          path: `/user_management/customerlist/:/customer/${currentId.value}`,
        });
      });

      const roleCustomerBtn = debounce((staff) => {
        roleCustomer.value = true;
        currentId.value = staff.id;
        staffName.value = staff.title_name;
        context.root._router.replace({
          path: `/user_management/stafflist/:/role/${currentId.value}`,
        });
      });

      const closeDrawer = () => {
        basket.value = [];
        openCustomer.value = false;
        editCustomer.value = false;
        newCustomer.value = false;
        roleCustomer.value = false;
        customerTransaction.value = false;
      };

      const addnewCustomer = () => {
        newCustomer.value = true;
        basket.value.push(newCustomer.value);
        context.root._router.replace({
          path: `/user_management/customerlist/:/addcustomer`,
        });
      };

      provide("customerId", currentId);
      provide("currentAccNumber", currentAccNumber);
      provide("currentAccType", currentAccType);
      provide("staffName", staffName);

      return {
        ...toRefs(customerTable),
        intersected,
        getters_customers,
        viewCustomerBtn,
        items,
        closeDrawer,
        addnewCustomer,
        roleCustomerBtn,
      };
    },
  };
</script>
<style scoped>
  .v-data-table >>> td {
    padding: 14px 16px !important;
  }
</style>
