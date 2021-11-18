<template>
  <v-snackbar
    bottom
    absolute
    transition="slide-y-transition"
    elevation="1"
    :color="color"
    v-model="response"
    width="440"
  >
    <v-row align="center" justify="center">
      <v-col cols="2" class="d-flex justify-center px-0">
        <v-icon x-large> <slot name="icon"></slot> </v-icon>
      </v-col>
      <v-col>
        <div class="title">
          <strong> <slot name="header"></slot></strong>
        </div>
        <div class="body-2"><slot name="body"></slot></div>
        <div class="body-2"><slot name="body1"></slot></div>
      </v-col>
    </v-row>
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="response = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { defineComponent, inject, ref } from "@vue/composition-api";

export default defineComponent({
  setup() {
    let response = ref(true);
    const color = inject("color");

    return { response, color };
  },
});
</script>
