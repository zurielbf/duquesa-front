<template>
    <div id="AdminUsers" class="mx-5">
        <v-container fluid class="mt-10">
            <v-row>
            <h1 class="mb-5">Alta de empleado</h1>
            <v-card class="pa-10" width="100%">
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Nombre" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Apellidos" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Correo" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Telefono" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Role" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Password" outlined></v-text-field>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
        </v-container>

        <v-container fluid class="mt-10">
            <h1 class="mb-5">Usuarios registrados</h1>
                <v-card width="100%">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                            hide-details></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
                </v-card>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AdminUsers",

    components: {

    },

    data: () => ({
        search: '',
        headers: [
            {
                text: '#',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            { text: 'Nombre', value: 'name' },
            { text: 'Id empleado', value: 'id_empleado' },
            { text: 'Teléfono', value: 'telefono' },
            { text: 'Fecha de registro', value: 'fecha_registro' },
        ],
        desserts: [
            {
                id: 1,
                name: 'Juan',
                id_empleado: "1121332332",
                telefono: 818181818181,
                fecha_registro: "20/12/22",
            },
            {
                id: 2,
                name: 'Emiliano',
                id_empleado: "1121332332",
                telefono: 818181818181,
                fecha_registro: "20/12/22",
            },
            {
                id: 3,
                name: 'Jair',
                id_empleado: "1121332332",
                telefono: 818181818181,
                fecha_registro: "20/12/22",
            },
        ],
        //
    }),

    created() {
    
  }
};
</script>