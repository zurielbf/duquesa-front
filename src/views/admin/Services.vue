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
                    Categorias
                </v-tab>
                <v-tab>
                    Servicios
                </v-tab>
                <v-tab>
                    Adicionales
                </v-tab>
            </v-tabs>

            <!-- <v-container class="mt-10">
                <div style="background-color: blue;color: white;">
                    <h1 class="mb-15">services list {{services_list}}</h1>
                </div>
                <div style="background-color: purple; color: white;" class="mt-10">
                    <h1>request {{request}}</h1>
                </div>
            </v-container> -->
           <!--  <h1>{{editedServiceItem}}</h1>
            <h1>{{editedIndex}}</h1> -->

            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-container fluid>
                        <v-row class="justify-center">
                            <v-col cols="12" lg="12">
                                <v-container fluid>
                                    <h1 class="mb-5">Categorias</h1>
                                    <v-card class="pa-10 text-center">
                                        <v-data-table hide-default-footer :headers="categories_table_headers"
                                            :items="categories_list" class="elevation-0">

                                            <template v-slot:top>
                                                <v-toolbar flat>
                                                    <v-toolbar-title>Lista de categorias agregados</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    <v-dialog v-model="dialog" max-width="500px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs"
                                                                v-on="on">
                                                               Agregar nueva categoria
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title>
                                                                <span class="text-h5">{{ formTitle }}</span>
                                                            </v-card-title>

                                                            <v-card-text>
                                                                <v-container>
                                                                    <v-row>
                                                                        <v-col cols="12" sm="6" md="6">
                                                                            <v-text-field v-model="editedItem.name"
                                                                                label="Nombre"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" >
                                                                            <v-text-field
                                                                                v-model="editedItem.description"
                                                                                label="Descripción"></v-text-field>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card-text>

                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="close">
                                                                    Cancel
                                                                </v-btn>
                                                                <v-btn color="blue darken-1" text @click="saveService">
                                                                    Guardar
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                                        <v-card>
                                                            <v-card-title class="text-h5">Are you sure you want to
                                                                delete this item?</v-card-title>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="closeDelete">
                                                                    Cancel</v-btn>
                                                                <v-btn color="blue darken-1" text
                                                                    @click="deleteServiceConfirm">OK</v-btn>
                                                                <v-spacer></v-spacer>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-toolbar>
                                            </template>
                                            <template v-slot:item.actions="{ item }">
                                                <v-icon class="mr-2" @click="editService(item)">
                                                    mdi-pencil
                                                </v-icon>
                                                <v-icon @click="deleteService(item)">
                                                    mdi-delete
                                                </v-icon>
                                            </template>

                                        </v-data-table>
                                    </v-card>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-container fluid>
                                    <h1 class="mb-5">Servicios</h1>
                                    <v-card class="pa-10 text-center">
                                        <v-data-table hide-default-footer :headers="services_table_headers"
                                            :items="services_list" class="elevation-0">

                                            <template v-slot:top>
                                                <v-toolbar flat>
                                                    <v-toolbar-title>Lista de servicios agregados</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    <v-dialog v-model="dialog" max-width="500px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs"
                                                                v-on="on">
                                                               Agregar nuevo servicio
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title>
                                                                <span class="text-h5">{{ formTitle }}</span>
                                                            </v-card-title>

                                                            <v-card-text>
                                                                <v-container>
                                                                    <v-row>
                                                                        <v-col cols="12">
                                                                            <v-select v-model="editedServiceItem.category_id" :items="categories_list"
                                                                                item-text="name" item-value="category_id" label="Categoria"
                                                                                outlined>
                                                                            </v-select>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="6" md="6">
                                                                            <v-text-field v-model="editedServiceItem.name"
                                                                                label="Nombre"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="6" md="6">
                                                                            <v-text-field v-model="editedServiceItem.amount"
                                                                                label="Monto"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" >
                                                                            <v-text-field
                                                                                v-model="editedServiceItem.description"
                                                                                label="Descripción"></v-text-field>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card-text>

                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="close">
                                                                    Cancel
                                                                </v-btn>
                                                                <v-btn color="blue darken-1" text @click="saveService">
                                                                    Guardar
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                                        <v-card>
                                                            <v-card-title class="text-h5">Are you sure you want to
                                                                delete this item?</v-card-title>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="closeDelete">
                                                                    Cancel</v-btn>
                                                                <v-btn color="blue darken-1" text
                                                                    @click="deleteServiceConfirm">OK</v-btn>
                                                                <v-spacer></v-spacer>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-toolbar>
                                            </template>
                                            <template v-slot:item.actions="{ item }">
                                                <v-icon class="mr-2" @click="editService(item)">
                                                    mdi-pencil
                                                </v-icon>
                                                <v-icon @click="deleteService(item)">
                                                    mdi-delete
                                                </v-icon>
                                            </template>

                                        </v-data-table>
                                    </v-card>
                                </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-container fluid>
                                    <h1 class="mb-5">Adicionales</h1>
                                    <v-card class="pa-10 text-center">
                                        <v-data-table hide-default-footer :headers="additionals_table_headers"
                                            :items="additionals_list" class="elevation-0">

                                            <template v-slot:top>
                                                <v-toolbar flat>
                                                    <v-toolbar-title>Lista de adicionales agregados</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    <v-dialog v-model="dialog" max-width="500px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs"
                                                                v-on="on">
                                                               Agregar nuevo adicional
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title>
                                                                <span class="text-h5">{{ formTitle }}</span>
                                                            </v-card-title>

                                                            <v-card-text>
                                                                <v-container>
                                                                    <v-row>
                                                                        <v-col cols="12">
                                                                            <v-select v-model="editedServiceItem.category_id" :items="categories_list"
                                                                                item-text="name" item-value="category_id" label="Categoria"
                                                                                outlined>
                                                                            </v-select>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="6" md="6">
                                                                            <v-text-field v-model="editedServiceItem.name"
                                                                                label="Nombre"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="6" md="6">
                                                                            <v-text-field v-model="editedServiceItem.amount"
                                                                                label="Monto"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" >
                                                                            <v-text-field
                                                                                v-model="editedServiceItem.description"
                                                                                label="Descripción"></v-text-field>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card-text>

                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="close">
                                                                    Cancel
                                                                </v-btn>
                                                                <v-btn color="blue darken-1" text @click="saveService">
                                                                    Guardar
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                                        <v-card>
                                                            <v-card-title class="text-h5">Are you sure you want to
                                                                delete this item?</v-card-title>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="closeDelete">
                                                                    Cancel</v-btn>
                                                                <v-btn color="blue darken-1" text
                                                                    @click="deleteServiceConfirm">OK</v-btn>
                                                                <v-spacer></v-spacer>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-toolbar>
                                            </template>
                                            <template v-slot:item.actions="{ item }">
                                                <v-icon class="mr-2" @click="editService(item)">
                                                    mdi-pencil
                                                </v-icon>
                                                <v-icon @click="deleteService(item)">
                                                    mdi-delete
                                                </v-icon>
                                            </template>

                                        </v-data-table>
                                    </v-card>
                                </v-container>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AdminServices",

        components: {

        },

        data: () => ({
            categories_list: [],
            services_list: [],
            additionals_list: [],

            new_service: false,
            new_additional: false,
            show_additional_select: false,
            success_alert: false,
            warning_alert: false,
            error_alert: false,
            show_additional: false,
            category_id: null,
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
            new_service_data: {
                name: null,
                description: null,
                amount: null,
            },
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
            tab: null,
            confirm_dialog: false,
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            /*  */
            editedItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            defaultItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            /*  */
            editedCategoryItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            defaultCategoryItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            editedServiceItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            defaultServiceItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            editedAdditionalItem: {
                category_id: 0,
                name: '',
                description: '',
                amount: 0,
            },
            categories_table_headers: [{
                    text: 'Id categoria',
                    align: 'start',
                    value: 'category_id'
                },
                {
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Descripción',
                    value: 'description'
                },
                {
                    text: 'Fecha de registro',
                    value: 'registration_timestamp'
                },
                { 
                    text: 'Actions', 
                    value: 'actions', 
                    sortable: false 
                },
            ],
            services_table_headers: [{
                    text: 'Id servicio',
                    align: 'start',
                    value: 'service_id'
                },
                {
                    text: 'Categoria Servicio',
                    value: 'category_id'
                },
                {
                    text: 'Servicio',
                    value: 'name'
                },
                {
                    text: 'Descripción',
                    value: 'description'
                },
                {
                    text: 'Monto',
                    value: 'amount'
                },
                {
                    text: 'Fecha de registro',
                    value: 'registration_timestamp'
                },
                { 
                    text: 'Actions', 
                    value: 'actions', 
                    sortable: false 
                },
            ],
            additionals_table_headers: [{
                    text: 'Id adicional',
                    align: 'start',
                    value: 'additional_id'
                },
                {
                    text: 'Id Servicio',
                    value: 'service_id'
                },
                {
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Descripción',
                    value: 'description'
                },
                {
                    text: 'Monto',
                    value: 'amount'
                },
                {
                    text: 'Fecha de registro',
                    value: 'registration_timestamp'
                },
                { 
                    text: 'Actions', 
                    value: 'actions', 
                    sortable: false 
                }, 
            ],
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Nuevo servicio' : 'Editar servicio'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
        },

        methods: {
            closeConfirmDialog: () => {
                this.confirm_dialog = false
                this.reloadData()
            },
            reloadData: () => {
                this.getCategoriesList(),
                this.getServicesList(),
                this.getAdditionalList()
            },
            async getCategoriesList() {
                try {
                    let response = await axios.get("category/detail");
                    this.categories_list = response.data.data;
                    console.log("categories", this.categories_list)
                } catch (error) {
                    if (error.response) {
                            console.log("The request was made and the server responded with a status code",
                                error.response)
                        } else if (error.request) {
                            console.log("The request was made but no response was received");
                        } else {
                            console.log("Something happened in setting up the request that triggered an Error");
                            console.log(error);
                        }
                }
            },

            async getServicesList() {
                try {
                    let response = await axios.get("service/detail");
                    this.services_list = response.data.data;
                    console.log("servicios", this.services_list)
                } catch (error) {
                    if (error.response) {
                            console.log("The request was made and the server responded with a status code",
                                error.response)
                        } else if (error.request) {
                            console.log("The request was made but no response was received");
                        } else {
                            console.log("Something happened in setting up the request that triggered an Error");
                            console.log(error);
                        }
                }
            },

            async getAdditionalList() {
                try {
                    let response = await axios.get("additional/detail");
                    this.additionals_list = response.data.data;
                    console.log("additionals", this.additionals_list)
                } catch (error) {
                    if (error.response) {
                            console.log("The request was made and the server responded with a status code",
                                error.response)
                        } else if (error.request) {
                            console.log("The request was made but no response was received");
                        } else {
                            console.log("Something happened in setting up the request that triggered an Error");
                            console.log(error);
                        }
                }
            },

            editService: function (item) {
                this.editedIndex = this.services_list.indexOf(item)
                this.editedServiceItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteService(item) {
                this.editedIndex = this.services_list.indexOf(item)
                this.editedServiceItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteServiceConfirm() {
                this.services_list.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedServiceItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedServiceItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            async saveService() {
                if (this.editedIndex > -1) {
                    let edited_service_data = {
                        category_id: this.editedServiceItem.category_id,
                        name: this.editedServiceItem.name,
                        description: this.editedServiceItem.description,
                        amount: this.editedServiceItem.amount,
                    }
                    console.log("editdata", edited_service_data)
                    /* Object.assign(this.desserts[this.editedIndex], this.editedServiceItem) */
                    try {
                        let response = await axios.put("service/update/" + this.editedServiceItem.service_id, edited_service_data);
                        console.log(response)
                        this.getServicesList()
                    } catch (error){
                        console.log(error);
                    }
                } else {
                    let added_service_data = {
                        category_id: this.editedServiceItem.category_id,
                        name: this.editedServiceItem.name,
                        description: this.editedServiceItem.description,
                        amount: this.editedServiceItem.amount,
                    }
                    console.log("added data:", added_service_data)
                    /* Object.assign(this.desserts[this.editedIndex], this.editedServiceItem) */
                    try {
                        let response = await axios.post("service/new", added_service_data);
                        console.log(response)
                    } catch (error){
                        console.log(error);
                    }
                    console.log("else")
                }
                this.close()
            },

            deleteService: function () {

            },
            getServiceData: function () {
                this.additional_service_id = []
                axios.
                get(this.base_url + "service/detail/" + this.service_id)
                    .then((response) => {
                        this.selected_service_data = response.data.data;
                        /* console.log("selected service data", this.selected_service_data) */
                        this.getAdditionalServicesList()
                    })
                    .catch((error) => {
                        console.log(error.response);
                    })
            },
            /*  getAdditionalServicesList: function () {
                 axios.
                 get(this.base_url + "additional/detail_by_service_id/" + this.service_id)
                     .then(result => {
                         this.additional_services_list = result.data.data;
                         this.show_additional_select = true
                     })
                     .catch(error => {
                         this.show_additional_select = false
                         this.additional_services_list = []
                         console.log(error.response);
                     })
             }, */
            /* getAdditionalServiceData: function () {
                axios.
                get(this.base_url + "additional/detail/" + this.additional_service_id)
                    .then(result => {
                        this.selected_additional_data = result.data.data;
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
            }, */

            getSelectedAdditionalServicesData: function () {
                /*  if(this.additional_service_id != 0){ */
                for (let i = 0; i < this.additional_service_id.length; i++) {
                    console.log("no es igual a 0")
                    axios.
                    get(this.base_url + "additional/detail/" + this.additional_service_id[i])
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
                     get(this.base_url + "additional/detail/" + this.additional_service_id)
                         .then(result => {
                             this.selected_additional_data = result.data.data;
                         })
                         .catch(error => {
                             console.log(error.response);
                         })
                 } else if(this.additional_service_id.length > 1)  {
                     for (let i = 0; i < this.additional_service_id.length; i++) {
                         axios.
                         get(this.base_url + "additional/detail/" + this.additional_service_id[i])
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
                    get(this.base_url + "additional/detail/" + this.additional_service_id[i])
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
                post(this.base_url + "transaction/new", {
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
        },
        mounted() {},

        created() {
            this.getServicesList()
            this.getCategoriesList()
            this.getAdditionalList()
        }
    };
</script>