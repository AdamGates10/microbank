<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <v-col align-self="center" class="text-center">
        <div class="pa-2">
          <div class="text-center mb-5 text-h2">No Page Found</div>
          <v-btn class="font-weight-bold" color="primary" to="/">
            Return to Home Page
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { defineComponent, ref } from "@vue/composition-api";

  export default defineComponent({
    setup() {
      const alignments = ref([""]);
      return {
        alignments,
      };
    },
  });
</script>




