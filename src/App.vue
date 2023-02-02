<template>
  <v-app>
    <v-main>
      <Loading></Loading>
      <!-- login -->
      <v-container fill-height class="" v-if="login == false">
      <v-row class="justify-center">
        <v-card class="text-center pa-10" width="500px" v-if="loginanimation == false">
          <v-img class="mx-auto" max-width="300" src="@/assets/img/logo.png"></v-img>
          <h4 class="my-5">Introduce tus credenciales</h4>
          <v-form v-model="loginform">
            <v-container>
              <v-text-field type="email" label="Correo" outlined></v-text-field>
              <v-text-field type="password" label="Contraseña" outlined></v-text-field>
              <v-btn depressed color="primary" v-on:click="loginUser()">
                Iniciar sesión
              </v-btn>
            </v-container>
          </v-form>
        </v-card>
        <v-card class="text-center pa-10" width="500px" v-if="loginanimation == true">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-card>
      </v-row>
    </v-container>
      <!-- login -->
      <Menu v-if="login == true"></Menu>
        <router-view v-if="login == true" />
      <Footer v-if="login == true"></Footer>
    </v-main>
  </v-app>
</template>

<script>
  import Menu from '@/components/Menu.vue'
  import Footer from '@/components/Footer.vue'
  import Loading from '@/components/Loading.vue'

  export default {
    name: "App",

    components: {
    Menu,
    Footer,
    Loading
},

    data: () => ({
      loginanimation: false,
      loginform: false,
      login: true,
      username: "Jair",
      id_empleado: "12121212",
      //
    }),

    methods: {
      loginUser: function(){
        this.loginanimation = true,
        setTimeout(() => (
          this.login = true,
          this.$router.push({path: '/sales'})
          ), 1500)
      /* this.$router.push({name: 'login', params: { login: true }}) */
    }
    }
  };
</script>