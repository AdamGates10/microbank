<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card elevation="2" tile>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                color="primary"
                class="mr-4 font-weight-bold"
                @click="addTransaction"
              >
                New transaction
              </v-btn>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                class="mr-4"
                @click="next"
              >
                <v-icon> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="580">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="getEvents"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title
                    v-html="`${selectedEvent.name}`"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-simple-table v-if="selectedEvent.details">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>{{ selectedEvent.account_name }}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Debit</th>
                        <td>
                          {{
                            `GH₵ ${parseFloat(
                              selectedEvent.details.debit
                            ).toFixed(2)}`
                          }}
                        </td>
                      </tr>
                      <tr>
                        <th>Credit</th>
                        <td>
                          {{
                            `GH₵ ${parseFloat(
                              selectedEvent.details.credit
                            ).toFixed(2)}`
                          }}
                        </td>
                      </tr>
                      <tr>
                        <th>Balance</th>
                        <td>
                          {{
                            `GH₵ ${parseFloat(
                              selectedEvent.details.balance
                            ).toFixed(2)}`
                          }}
                        </td>
                      </tr>

                      <tr>
                        <th>Date</th>
                        <td>
                          {{
                            moment(
                              selectedEvent.details.debit.created_at
                            ).format("MMMM Do YYYY, h:mm:ss a")
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="error" text @click="selectedOpen = false">
                    <b>Close</b>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>

    <v-navigation-drawer
      overlay-color="black"
      v-model="openTransaction"
      fixed
      :permanent="openTransaction"
      right
      width="40%"
      class="shadow"
      clipped
    >
      <div class="mt-15 d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          @click="openTransaction = !openTransaction"
          icon
          class="ma-2"
          to="/transaction_management/record"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>

      <!-- Record Transaction Here -->
      <Record v-if="openTransaction" />
    </v-navigation-drawer>
  </v-container>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "@vue/composition-api";
  import moment from "moment";
  import Record from "@/components/Transaction/Record";
  import { useActions, useGetters } from "vuex-composition-helpers";
  import emitter from "@/debounce/emitter";
  export default defineComponent({
    components: { Record },
    setup(props, context) {
      const { monthlyTransaction } = useActions(["monthlyTransaction"]);

      const { getters_monthly_transactions, getters_transaction } = useGetters([
        "getters_monthly_transactions",
        "getters_transaction",
      ]);

      const calendar = reactive({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: "month",
        typeToLabel: {
          month: "Month",
          week: "Week",
          day: "Day",
          "4day": "4 Days",
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        openTransaction: false,
        mode: "stack",
        modes: ["stack", "column"],
        items: [],
      });

      let {
        events,
        focus,
        selectedEvent,
        selectedElement,
        selectedOpen,
        type,
        openTransaction,
        items,
      } = toRefs(calendar);

      const getEventColor = (event) => {
        return event.color;
      };

      const setToday = () => {
        focus.value = "";
      };

      const prev = () => {
        context.refs.calendar.prev();
      };

      const next = () => {
        context.refs.calendar.next();
      };

      const showEvent = ({ nativeEvent, event }) => {
        const open = () => {
          selectedEvent.value = event;
          selectedElement.value = nativeEvent.target;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => (selectedOpen.value = true))
          );
        };

        if (selectedOpen.value) {
          selectedOpen.value = false;
          requestAnimationFrame(() => requestAnimationFrame(() => open()));
        } else {
          open();
        }

        nativeEvent.stopPropagation();
      };

      const addTransaction = () => {
        openTransaction.value = true;
        context.root._router.replace({
          path: `/transaction_management/record/:/addtransaction`,
        });
      };

      const viewDay = ({ date }) => {
        focus.value = date;
        type.value = "day";
      };

      const getEvents = ({ start, end }) => {
        monthlyTransaction({
          start: new Date(`${start.date}T00:00:00`),
          end: new Date(`${end.date}T23:59:59`),
        }).then(() => {
          items.value = [];
          getters_monthly_transactions.value.forEach((event) => {
            items.value.push({
              name: ` ${event.account_number.toString()} `,
              start: moment(event.created_at).format("YYYY-MM-DD hh:mm"),
              end: moment(event.created_at).format("YYYY-MM-DD hh:mm"),
              color: event.credit > 0 ? "primary" : "error",
              details: event,
              account_name: `${event.customer.other_names}  ${event.customer.last_name}`,
              timed: true,
            });
          });

          switch (context.root.$route.name) {
            case "AddTransaction":
              openTransaction.value = true;
              break;
          }

          events.value = items;
        });
      };

      emitter.on("savedTransaction", (bool) => {
        if (bool) {
          items.value.push({
            name: ` ${getters_transaction.value.account_number.toString()} `,
            start: moment(getters_transaction.value.created_at).format(
              "YYYY-MM-DD hh:mm"
            ),
            end: moment(getters_transaction.value.created_at).format(
              "YYYY-MM-DD hh:mm"
            ),
            color: getters_transaction.value.credit > 0 ? "primary" : "error",
            details: getters_transaction.value,
            account_name: `${getters_transaction.value.customer.other_names}  ${getters_transaction.value.customer.last_name}`,
            timed: true,
          });
        }
      });

      return {
        ...toRefs(calendar),
        viewDay,
        showEvent,
        setToday,
        prev,
        next,
        getEventColor,
        getEvents,
        addTransaction,
      };
    },
  });
</script>
