<template>
  <v-container fluid>
    <PageHeader>
      <span slot="header" class="font-weight-bold">STAFF </span> LIST
    </PageHeader>

    <v-row>
      <v-col>
        <v-btn
          class="ma-2 font-weight-bold"
          @click="addStaffBtn"
          color="primary"
        >
          CREATE NEW STAFF
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
          <template v-slot:no-data>
            <span class="subheading font-weight-bold">Not available</span>
          </template>
          <template #item.contact="{ item }">
            {{ item.mobile_number_1 }}
            <span v-if="item.mobile_number_2">
              {{ item.mobile_number_2 }}
            </span>
          </template>
        </v-data-table>

        <v-card v-if="getters_staff.length" v-intersect="intersected">
          <v-progress-linear
            :indeterminate="true"
            v-if="loadingScroll"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create New Staff -->
    <v-navigation-drawer
      clipped
      overlay-color="black"
      v-model="addStaff"
      fixed
      :permanent="addStaff"
      right
      width="40%"
      class="shadow"
    >
      <div class="mt-15 d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          @click="addStaff = !addStaff"
          icon
          to="/user_management/stafflist"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>

      <AddStaff v-if="addStaff" />
    </v-navigation-drawer>
  </v-container>
</template>

<script>
  import PageHeader from "@/components/Slots/PageHeader";
  import AddStaff from "@/components/User/Staff/Create/AddStaff";
  import { reactive, toRefs } from "@vue/composition-api";
  import { useActions, useGetters } from "vuex-composition-helpers";
  export default {
    components: {
      PageHeader,
      AddStaff,
    },
    setup(props, context) {
      const staffTable = reactive({
        openStaff: false,
        addStaff: false,
        isIntersecting: false,
        items: [],
        isLoaded: true,
        headers: [
          { text: "STAFF", value: "name", sortable: true },
          { text: "EMAIL", value: "email", sortable: true },
          { text: "MOBILE NUMBER(S)", value: "contact", sortable: true },
        ],
        page: 1,
        loadingScroll: false,
      });

      const { staffList } = useActions(["staffList"]);

      const { getters_staff, getters_staff_meta } = useGetters([
        "getters_staff",
        "getters_staff_meta",
      ]);

      const {
        page,
        isIntersecting,
        loadingScroll,
        isLoaded,
        items,
        addStaff,
        openStaff,
      } = toRefs(staffTable);

      staffList(page.value)
        .then(() => {
          isLoaded.value = false;
          items.value = getters_staff.value;
          switch (context.root.$route.name) {
            case "AddStaff":
              openStaff.value = true;
              break;

            default:
              break;
          }
        })
        .finally(() => {
          setTimeout(() => {
            switch (context.root.$route.name) {
              case "AddStaff":
                addStaff.value = true;
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
          getters_staff_meta.value.current_page >=
          getters_staff_meta.value.last_page
        ) {
          loadingScroll.value = false;
          return;
        }

        page.value++;
        staffList(page.value).then(() => {
          loadingScroll.value = false;
          items.value = [...new Set([...getters_staff.value, ...items.value])];
        });
      };

      const addStaffBtn = () => {
        addStaff.value = true;
        context.root._router.replace({
          path: `/user_management/stafflist/:/addstaff`,
        });
      };

      return {
        ...toRefs(staffTable),
        intersected,
        getters_staff,
        items,
        addStaffBtn,
      };
    },
  };
</script>
<style scoped>
  .v-data-table >>> td {
    padding: 14px 16px !important;
  }
</style>
