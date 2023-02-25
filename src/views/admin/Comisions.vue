<template>
  <div id="AdminReports" class="mx-5">
    <v-container fluid class="mt-10">
      <v-container fluid class="mt-10">
        <h1 class="mb-5">Resumen de comisiones</h1>
        <v-card width="100%">
          <div class="d-none">
            <h1
              class="d-none"
              v-for="comision in comision_list"
              :key="comision"
            >
              {{ comision.service_id }}
            </h1>
            <h1>{{ comision_list }}</h1>
          </div>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="startDate"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-if="comisions_list"
            :headers="headers"
            :items="comisions_list"
            :search="finishDate"
          >
          </v-data-table>
        </v-card>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AdminUsers",

  components: {},

  data: () => ({
    startDate: "",
    finishDate: "",
    comisions_list: [],
  }),
};
</script>
