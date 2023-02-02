<template>
    <div id="AdminReports" class="mx-5">
        <v-container fluid class="mt-10">
            <v-container fluid class="mt-10">
                <h1 class="mb-5">Resumen completo</h1>
                <v-card width="100%">
                    <div class="d-none">
                        <h1 class="d-none" v-for="transaction in transaction_list">{{transaction.service_id}}</h1>
                        <h1 >{{transaction_list}}</h1>
                    </div>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                            hide-details></v-text-field>
                    </v-card-title>
                    <v-data-table v-if="transaction_list" :headers="headers" :items="transaction_list" :search="search">
                    </v-data-table>
                </v-card>
            </v-container>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AdminReports",

    components: {

    },

    data: () => ({
        base_url: "http://localhost:8080/dev/",
        search: null,
        transaction_list: [],
        services_list: [],
        services_id: [],
        api_headers: [{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }],
        items: [],
        headers: [
            { text: '#', align: 'start', sortable: true, value: 'transaction_id' },
            { text: 'ID user', value: 'user_id' },
            { text: 'Service', value: 'service_id' },
            { text: 'Additional service', value: 'additional_id' },
            { text: 'Additional Amount', value: 'additional_amount' },
            { text: 'Total Amount', value: 'total_amount' },
            { text: 'Registration date', value: 'registration_timestamp' },
        ],
        tab: null,
        monto_total: [{
            text: 'Total',
            align: 'end',
            value: 'monto',
        }],

        total: [{
            monto: "Total: $" + 2000
        }],

        data_name: [{
            text: 'Total',
            align: 'start',
            sortable: true,
            value: 'name',
        },
        {
            text: 'Monto',
            sortable: true,
            value: 'monto'
        },
        ],
        services: [{
            name: 'Servicio 1',
            monto: "$" + 1000,
        },
        {
            name: 'Servicio 2',
            monto: "$" + 2000,
        },
        {
            name: 'Servicio 3',
            monto: "$" + 3000,
        },
        ]
        //
    }),
    methods: {
        getServicesList: function () {
            axios.
                get(this.base_url + "transaction/detail")
                    .then(result => {
                        this.transaction_list = result.data.data;
                        let services_list = this.transaction_list
                        console.log("servicios_list", services_list);

                        let count = this.services_list.length
                        let service_id = []

                        for (let i = 0; i < count; i++) {
                            service_id = this.services_list[i]
                            console.log("service", service_id[i])
                        }

                        /* this.services_id = this.transaction_list.service_id */
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
        },
        getServiceName: function () {
            axios.
                get(this.base_url + "service/" + this.service_list)
                    .then(result => {
                        this.service_name
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
        },
        getAdditionalServicesList: function () {
            axios.
                get(this.base_url + "additional/", {
                    headers: {

                    }
                })
                .then(result => {
                    this.additional_services_list = result.data.data;
                    console.log("servicios adicionales", this.additional_services_list);
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    },
    mounted() {
    },
    created() {
        this.getServicesList()
        this.getAdditionalServicesList()
    }
};
</script>