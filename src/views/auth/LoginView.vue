<template>
  <div id="LoginView">
    <v-container fill-height class="">
      <v-row class="justify-center">
        <v-card class="text-center pa-10" width="500px">
          <v-img class="mx-auto" max-width="300" src="@/assets/img/logo.png"></v-img>
          <h4 class="my-5">Introduce tus credenciales</h4>
          <v-form v-model="login">
            <v-container>
              <v-text-field label="Correo" outlined></v-text-field>
              <v-text-field label="Contraseña" outlined></v-text-field>
              <v-btn depressed color="primary" v-on:click="loginUser()">
                Iniciar sesión
              </v-btn>
            </v-container>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
  @import "@/assets/scss/auth/Login.scss";
  </style>

<script>
export default {
  name: "LoginView",

  data: () => ({
    login: false,
    valid: true,
    //
  }),

  methods: {
    loginUser: function(){
      this.$router.push({path: '/sales'})
      /* this.$router.push({name: 'login', params: { login: true }}) */
    }
  },
};
</script>
