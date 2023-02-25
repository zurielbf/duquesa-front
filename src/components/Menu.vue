<template>
  <div id="Menu">
    <v-navigation-drawer app v-model="drawer" color="#e58abe">
      <v-list-item class="mt-5">
        <v-list-item-content class="circle-logo rounded-circle">
          <v-img max-width="100%" src="@/assets/img/logo.png"></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-list class="mt-10">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon color="#FFFFFF">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              ><span class="bold txt-white">{{
                item.title
              }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="#2cb1d2" class="txt-white bold">
            Cerrar sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app elevation="0" color="#2cb1d2">
      <v-app-bar-nav-icon
        color="#FFFFFF"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title
        ><span class="d-block texto txt-white"
          >Bienvenido: Admin</span
        ></v-toolbar-title
      >
      <v-toolbar-title
        ><span class="d-block texto txt-white"
          >ID: 123456</span
        ></v-toolbar-title
      >
    </v-app-bar>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/components/Menu.scss";
</style>

<script>
export default {
  name: "Menu",

  data: () => ({
    drawer: true,
    items: [
      { title: "Ventas", icon: "mdi-finance", url: "/sales" },
      /* { title: 'Usuarios', icon: 'mdi-account-multiple', url: '/admin/users' }, */
      { title: "Servicios", icon: "mdi-toolbox-outline", url: "/services" },
      { title: "Reportes", icon: "mdi-chart-box-outline", url: "/reports" },
      {
        title: "Comisiones",
        icon: "mdi-percent-circle-outline",
        url: "/comisions",
      },
      /* { title: 'Ajustes', icon: 'mdi-cog', url: '/admin/settings' }, */
    ],
    //
  }),
};
</script>
