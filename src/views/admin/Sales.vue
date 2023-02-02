<template>
    <div id="AdminSales" class="mx-5">
        <v-alert v-for="alert in alerts" width="400" dismissible :type="alert.type" :value="alert.state">
            {{alert.text}}
        </v-alert>

        <!-- <v-alert width="400" dismissible :type="alert_type" :value="alert_state">
            {{alert_message}}
        </v-alert>

        <v-alert width="400" dismissible :type="alert_type" :value="alert_state">
            {{alert_message}}
        </v-alert> -->

        <v-container fluid class="mt-10">
            <v-tabs class="mb-10" v-model="tab">
                <v-tab>
                    Servicios
                </v-tab>
            </v-tabs>



            <v-container class="mt-10">
                <div style="background-color: blue;color: white;">
                    <h1 class="mb-15">selected services {{selected_services}}</h1>
                    <h1 class="mb-15">checkbox adicional {{additional_service_id}}</h1>

                    <h1 class="mb-15">adicionales seleccionados {{ selected_additional_data }}</h1>
                    <h1 class="mb-15">lista de servicios disponibles {{ additional_services_list }}</h1>
                </div>
                <div style="background-color: purple; color: white;" class="mt-10">
                    <h1>array transaction {{transaction_data}}</h1>
                    <v-btn v-on:click="sendFormSale()" class="mt-5 mb-10" color="red">Send data</v-btn>
                </div>
            </v-container>

            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" lg="6">
                                <v-container fluid>
                                    <h1 class="mb-5">Nueva venta de servicios</h1>
                                    <v-card class="pa-10">
                                        <v-form>
                                            <v-container>
                                                <v-row class="text-center">
                                                    <v-col cols="12">
                                                        <v-text-field v-model="transaction_data.user_id"
                                                            label="ID de empleado" outlined></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" v-if="services_list">
                                                        <v-select v-model="service_id" :items="services_list"
                                                            item-text="name" item-value="service_id" label="Servicios"
                                                            outlined v-on:input="getServiceData()" clearable>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" v-if="show_additional_select">
                                                        <v-select v-model="additional_service_id"
                                                            :items="additional_services_list" item-text="name"
                                                            item-value="additional_id" label="Servicios adicionales"
                                                            outlined multiple clearable>
                                                        </v-select>

                                                    </v-col>
                                                    <v-col class="text-center" cols="12">
                                                        <v-btn depressed color="primary"
                                                            v-on:click="(addSelectedServices(),resetFields())">
                                                            Agregar Servicios
                                                        </v-btn>
                                                        <v-btn depressed color="primary"
                                                            v-on:click="selected_services = []">
                                                            Eliminar Servicios
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-form>
                                    </v-card>

                                </v-container>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-container fluid>
                                    <h1 class="mb-5">Detalle</h1>
                                    <v-card class="pa-10 text-center">
                                        <v-data-table hide-default-footer :headers="services_added"
                                            :items="selected_services" class="elevation-0">
                                        </v-data-table>

                                        <v-btn depressed color="primary" v-on:click="sendFormSale()">
                                            Agregar
                                        </v-btn>
                                    </v-card>

                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AdminSales",

        components: {

        },

        data: () => ({
            testing: false,
            show_additional_select: false,
            success_alert: false,
            warning_alert: false,
            error_alert: false,
            services_list: [],
            show_additional: false,
            service_id: null,
            additional_service_id: null,
            additional_services_list: [],
            api_headers: [{
                'Access-Control-Allow-Origin': '*',
                'Acce›ss-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }],

            valid: true,
            nameRules: [
                v => !!v || 'El nombre es requerido',
            ],
            apellidoRules: [
                v => !!v || 'Los apellidos son requeridos',
            ],
            afiliadoRules: [
                v => !!v || 'El afiliado es requerido',
            ],
            transaction_data: [{
                    user_id: 1,
                    service_id: null,
                    additional_id: [],
                    service_amount: null,
                    additional_amount: [],
                    total_amount: null,
                }
                /* user_id: 1,
                service_id: 1,
                additional_id: [1],
                service_amount: 100,
                additional_amount: [300],
                total_amount: 400, */
            ],

            alerts: [{
                    text: 'succ',
                    state: false,
                    type: 'success'
                },
                {
                    text: 'warning',
                    state: false,
                    type: 'warning',
                },
                {
                    text: 'error',
                    state: false,
                    type: 'error',
                },
            ],

            addedservice: null,
            tab: null,

            selected_service_data: [],
            selected_additional_data: [],
            additional_data: [],
            selected_services: [],
            selected_additional_services: [],
            services_added: [
                /* { text: 'Id servicio', align: 'start', value: 'service_id' }, */
                {
                    text: 'Servicio',
                    value: 'service_name'
                },
                {
                    text: 'Monto',
                    value: 'service_amount'
                },
                {
                    text: 'Adicionales',
                    value: 'additional_services_name'
                },
                {
                    text: 'Monto adicionales',
                    value: 'additional_services_amount'
                }
            ],
        }),
        methods: {
            getServicesList: function () {
                axios.
                get("service/detail")
                    .then(result => {
                        this.services_list = result.data.data;
                        /* console.log("lista servicios", this.services_list); */
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
            },
            getServiceData: function () {
                this.additional_service_id = []
                axios.
                get("service/detail/" + this.service_id)
                    .then((response) => {
                        this.selected_service_data = response.data.data;
                        /* console.log("selected service data", this.selected_service_data) */
                        this.getAdditionalServicesList()
                    })
                    .catch((error) => {
                        console.log(error.response);
                    })
            },
            getAdditionalServicesList: function () {
                axios.
                get("additional/detail_by_service_id/" + this.service_id)
                    .then(result => {
                        this.additional_services_list = result.data.data;
                        this.show_additional_select = true
                    })
                    .catch(error => {
                        this.show_additional_select = false
                        this.additional_services_list = []
                        console.log(error.response);
                    })
            },
            getAdditionalServiceData: function () {
                axios.
                get("additional/detail/" + this.additional_service_id)
                    .then(result => {
                        this.selected_additional_data = result.data.data;
                    })
                    .catch(error => {
                        console.log(error.response);
                    })

                /*  if (this.additional_service_id.length == 1) {
                     axios.
                     get("additional/detail/" + this.additional_service_id)
                         .then(result => {
                             this.selected_additional_data = result.data.data;
                         })
                         .catch(error => {
                             console.log(error.response);
                         })
                 } else if(this.additional_service_id.length > 1)  {
                     for (let i = 0; i < this.additional_service_id.length; i++) {
                         axios.
                         get("additional/detail/" + this.additional_service_id[i])
                         .then(result => {
                             let additional_data = result.data.data;
                             this.selected_additional_data.additional_id.push(additional_data.additional_id[i])
                             console.log("add data",this.selected_additional_data)
                         })
                         .catch(error => {
                             console.log(error.response);
                         })
                     }
                 } */
            },

            getSelectedAdditionalServicesData: function () {
                /*  if(this.additional_service_id != 0){ */
                for (let i = 0; i < this.additional_service_id.length; i++) {
                    console.log("no es igual a 0")
                    axios.
                    get("additional/detail/" + this.additional_service_id[i])
                        .then((response) => {
                            let additional_data = []
                            additional_data = response.data.data;
                            console.log("request additional data", additional_data)
                        })
                        .catch((error) => {
                            console.log(error.response);
                        })
                }
                /*  } else if(this.additional_service_id == 0) { */
                for (let i = 0; i == this.additional_service_id.length; i++) {
                    console.log("si es igual a 0")
                    this.selected_additional_data.splice(this.selected_additional_data.indexOf(i, 1))
                }
                /*  } */


                /*  this.selected_additional_data.push({
                     additional_id: .additional_id,
                     amount: additional_data.amount,
                     name: additional_data.name,
                 }); */
                /* else if (this.additional_service_id.length == 0) {
                    for (let i = 0; i < this.additional_service_id.length; i++) {
                        console.log("sadasdasdasd")
                        this.selected_additional_data.splice(this.selected_additional_data.indexOf(i, 1))
                    }
                } */
                console.log("adiitional id", this.additional_service_id)

                /*  if (this.additional_service_id.length == 1) {
                     axios.
                     get("additional/detail/" + this.additional_service_id)
                         .then(result => {
                             this.selected_additional_data = result.data.data;
                         })
                         .catch(error => {
                             console.log(error.response);
                         })
                 } else if(this.additional_service_id.length > 1)  {
                     for (let i = 0; i < this.additional_service_id.length; i++) {
                         axios.
                         get("additional/detail/" + this.additional_service_id[i])
                         .then(result => {
                             let additional_data = result.data.data;
                             this.selected_additional_data.additional_id.push(additional_data.additional_id[i])
                             console.log("add data",this.selected_additional_data)
                         })
                         .catch(error => {
                             console.log(error.response);
                         })
                     } 
                 }*/
            },
            addSelectedServices: function () {
                for (let i = 0; i < this.additional_service_id.length; i++) {
                    console.log("no es igual a 0")

                    axios.
                    get("additional/detail/" + this.additional_service_id[i])
                        .then((response) => {
                            let additional_data = []
                            additional_data = response.data.data;

                            this.selected_additional_data.push({
                                additional_id: additional_data.additional_id,
                                amount: additional_data.amount,
                                name: additional_data.name,
                            });
                        })
                        .catch((error) => {
                            console.log(error.response);
                        })
                }
                console.log("additomnal data asigned", this.selected_additional_data)

                if (this.selected_additional_data != null) {
                    this.selected_additional_data.forEach(adicional => {
                        this.selected_additional_services.push({
                            additional_id: adicional.additional_id,
                            additional_name: adicional.name,
                            additional_amount: adicional.amount,
                        });
                        console.log("adi", this.selected_additional_services)
                    })
                }

                let id_servicios_adicionales = []
                let name_servicios_adicionales = []
                let amount_servicios_adicionales = []

                this.selected_additional_services.forEach(adicional => {
                    id_servicios_adicionales.push(adicional.additional_id)
                    name_servicios_adicionales.push(adicional.additional_name)
                    amount_servicios_adicionales.push(adicional.additional_amount)
                    console.log("adicionales serv", this.selected_additional_services)
                })


                this.selected_services.push({
                    /* service_id: this.selected_service_data.service_id, */
                    service_name: this.selected_service_data.name,
                    service_amount: this.selected_service_data.amount,
                    /* additional_services_id: id_servicios_adicionales, */
                    additional_services_name: name_servicios_adicionales,
                    additional_services_amount: amount_servicios_adicionales,
                    total_amount: this.selected_service_data.amount + this.selected_additional_data
                        .amount
                });
                this.selected_additional_services = []
                console.log("servicios seleccionados", this.selected_services);

                /* this.selected_additional_services.forEach(id_adicional => {
                    this.transaction_data.additional_id.push(id_adicional.additional_id)
                }) */


                /* this.transaction_data.service_id = this.selected_service_data.service_id
                this.transaction_data.additional_id.push(this.selected_additional_data.additional_id)
                this.transaction_data.service_amount = this.selected_service_data.amount
                this.transaction_data.additional_amount.push(this.selected_additional_data.amount)
                this.transaction_data.total_amount = this.selected_service_data.amount + this.selected_additional_data.amount 
                console.log("transaction data", this.transaction_data)
                */

                console.log("servicios seleccionados", this.selected_services);
                /* 
                console.log("transaction data", this.transaction_data) */
                /* this.resetFields() */
                /* this.service_id = null
                this.additional_service_id = null
                this.selected_service_data = [] */
            },

            resetFields: function () {
                this.service_id = null
                this.additional_service_id = null
                this.selected_service_data = []
                this.selected_additional_data = []
            },

            addTransactionService: function () {
                this.selected_service_data.push({
                    service_id: selected_service_data.service_id,
                    service_name: selected_service_data.name,
                    service_amount: selected_service_data.amount
                })
                /* console.log("selected services", this.selected_service_data) */
            },
            sendFormSale: function () {
                axios.
                post("transaction/new", {
                        /* test */
                        /* user_id: 1,
                        service_id: 1,
                        additional_id: [1],
                        service_amount: 100,
                        additional_amount: [300],
                        total_amount: 400, */

                        user_id: this.transaction_data.user_id,
                        service_id: this.transaction_data.service_id,
                        additional_id: this.transaction_data.additional_id,
                        service_amount: this.transaction_data.service_amount,
                        additional_amount: this.transaction_data.additional_amount,
                        total_amount: this.transaction_data.total_amount,
                    })
                    .then((response) => {
                        this.alerts[0].state = true
                        console.log("respuesta", response.data);
                    })
                    .catch((error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            this.alerts[2].state = true
                            this.alerts[2].text = error.response.statusText
                            console.log("The request was made and the server responded with a status code",
                                error.response)
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log("The request was made but no response was received");
                            this.alerts[2].state = true
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Something happened in setting up the request that triggered an Error");
                            this.alerts[2].state = true
                        }
                    });
            },
            getAdditionalServicesData: function () {
                axios.
                get("additional/detail/" + this.service_id)
                    .then((response) => {
                        this.selected_additional_data = result.data.data;
                    })
                    .catch((error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            this.error_alert = true
                            console.log("The request was made and the server responded with a status code",
                                error.response)
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log("The request was made but no response was received");
                            this.error_alert = true
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Something happened in setting up the request that triggered an Error");
                            this.error_alert = true
                        }
                    })
            },
        },
        mounted() {},
        created() {
            this.getServicesList()
        }
    };
</script>