<template>
  <v-app color="grey lighten-4">
    <div>
      <v-scroll-y-transition mode="out-in" origin>
        <Navbar v-if="user" :user="user" />
      </v-scroll-y-transition>
    </div>
    <v-main>
      <v-scroll-x-transition mode="out-in" origin>
        <router-view :key="$route.params.slug" />
      </v-scroll-x-transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";
  import { useGetters } from "vuex-composition-helpers";
  import { watch } from "@vue/composition-api";

  export default {
    name: "App",
    components: {
      Navbar,
      Footer,
    },
    setup(props, ctx) {
      const { authenticated, user } = useGetters(["authenticated", "user"]);

      watch(
        () => ctx.root.$route,
        () => {
          document.title = ctx.root.$route.meta.title || "";
          if (!user) {
            ctx.root.$router.replace({
              name: "Login",
            });
          }
        }
      );

      return {
        user,
        authenticated,
      };
    },
  };
</script>
<style scoped>
  #app {
    background-color: #f5f5f5;
  }
</style>
<style>
  ::-webkit-scrollbar {
    width: 0.25rem;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent !important;
  }
  ::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 100px !important;
    -webkit-border-radius: 100px !important;
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(148, 148, 148);
  }

  .shadow {
    margin-top: 12px;
    box-shadow: rgba(0, 0, 0, 0.66) 0px 25.6px 40px 0px,
      rgba(0, 0, 0, 0.54) 0px 4.8px 14.4px 0px;
  }
</style>
