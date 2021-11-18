<template>
  <v-container fluid>
    <v-card outlined min-width="500" class="mx-auto">
      <v-card-title primary-title class="primary--text text-uppercase">
        Review and Save New User
      </v-card-title>
      <v-divider></v-divider>
      <v-virtual-scroll
        :bench="benched"
        :items="name"
        height="390"
        item-height="50"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.page">
            <v-list-item-content class="body-1">
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn depressed small @click="viewSteppter(item.page)">
                View Details

                <v-icon color="primary" right> mdi-open-in-new </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
    <v-container fluid>
      <v-btn color="success" @click="send" class="font-weight-bold">
        Save User
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "@vue/composition-api";
  import PersonalDetails from "@/components/User/Customer/Create/PersonalDetails";
  import NextOfKin from "@/components/User/Customer/Create/NextOfKin";
  import AccountDetails from "@/components/User/Customer/Create/AccountDetails";
  import Files from "@/components/User/Customer/Create/Files";
  import Results from "@/components/User/Customer/Create/Results";
  export default defineComponent({
    components: {
      Files,
      PersonalDetails,
      AccountDetails,
      NextOfKin,
      Results,
    },
    setup(props, context) {
      const resultsCard = reactive({
        name: [
          { name: "Personal Details", page: 0 },
          { name: "Next Of Kin", page: 1 },
          { name: "Files", page: 2 },
          { name: "Account Details", page: 3 },
        ],
        benched: 1,
        tab: null,
      });

      const viewSteppter = (page) => context.emit("goto", page);

      const send = () => context.emit("send", true);

      return {
        ...toRefs(resultsCard),
        viewSteppter,
        send,
      };
    },
  });
</script>
