<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="miniVariant = !miniVariant"
          ><v-list-item-action>
            <v-icon
              >mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon
            > </v-list-item-action
          ><v-list-item-content
            ><v-list-item-title v-text="minimize"/></v-list-item-content
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <v-snackbar v-model="snackbar" text-center
          >{{ checkMSG() }}
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import // mapState,
// mapActions,
// mapGetters,
"vuex";
export default {
  name: "default",
  data() {
    return {
      snackbar: false,
      message: null,
      clipped: false,
      drawer: false,
      fixed: true,
      minimize: "Minimize",
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-account-plus",
          title: "Register",
          to: "/register"
        },
        {
          icon: "mdi-login-variant",
          title: "Log in",
          to: "/login"
        },
        {
          icon: "mdi-shopping",
          title: "Products",
          to: "/products"
        },
        {
          icon: "mdi-shopping",
          title: "Your cart",
          to: "/shoppingCart"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Marco's Store "
    };
  },
  methods: {
    checkMSG() {
      let message = this.$store.state.modules.messages.__ob__.value.messages;
      return (this.message = message);
    }
  },
  computed: {
    messageChk() {
      return this.$store.state.modules.messages.__ob__.value.messages
        ? this.checkMSG()
        : "";
    }
  },
  watch: {
    message() {
      return (this.snackbar = true);
    }
  }
};
</script>
