<template>
    <v-container>
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        dark
                        color="#36966b"
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="abrir()"
                    >
                        RESUMEN
                    </v-btn>
                </template>
            <v-card>
                <v-card-title>
                    RESUMEN
                </v-card-title>
                <v-card-actions>
                    <v-data-iterator
                        :items="respuesta.data"
                        :items-per-page.sync="itemsPerPage"
                        hide-default-footer
                        >
                        <template v-slot:default="props">
                            <v-row>
                            <v-col
                                v-for="item in props.items"
                                :key="item.alcance"
                                cols="12"
                                sm="6"
                                md="4"
                                lg="3"
                            >
                                <v-card>
                                <v-card-title class="subheading font-weight-bold">
                                    {{ item.alcance }}
                                </v-card-title>

                                <v-divider></v-divider>

                                <v-list dense>
                                    <v-list-item>
                                    <v-list-item-content>Clientes:</v-list-item-content>
                                    <v-list-item-content class="align-end">
                                        {{ item.data.clientes }}
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                    <v-list-item-content>CIF:</v-list-item-content>
                                    <v-list-item-content class="align-end">
                                        {{ item.data.cif }}
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                    <v-list-item-content>Discrepacias:</v-list-item-content>
                                    <v-list-item-content class="align-end">
                                        {{ item.data.discrepancias }}
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                    <v-list-item-content>Porcentaje CIF:</v-list-item-content>
                                    <v-list-item-content class="align-end">
                                        {{ (item.data.porcentaje_cif*100).toFixed(2) }}%
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                    <v-list-item-content>Porcentaje de Discrepancias:</v-list-item-content>
                                    <v-list-item-content class="align-end">
                                        {{ (100*item.data.porcentaje_discrepancias).toFixed(2) }}%
                                    </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                </v-card>
                            </v-col>
                            </v-row>
                        </template>
                        </v-data-iterator>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                respuesta:[],
                dialog: false,
                itemsPerPage:6,
            }
        },
        methods: {
            async getResumen(){
                axios.get('https://localhost:8000/resumen')
                .then((res) => {
                    console.log(res)
                    this.snackbar = true
                    this.respuesta = res.data
                })
                .catch((error) => {
                if(error){
                this.errores.push(error)
                this.dialogError = true
                alert(`Error: ${JSON.stringify(error.response.data.detail)}`)
                }
                this.serverError = true;
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLhttpsRequest in the browser and an instance of
                // https.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
                }).finally(() => {
                    //Perform action in always
                });
            },
            abrir(){
                this.dialog = true;
                this.getResumen()
            },
            close(){
                this.dialog = false;
            },
            parsePorcentaje(){
                var x = parseFloat(this.respuesta.data.porcentaje_cif);
                if (isNaN(x) || x < 0 || x > 100) {
                    return x
                }
            }
        },
    }
</script>