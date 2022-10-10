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
                    CLIENTES DEL VENDEDOR
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    CLIENTES DEL VENDEDOR
                </v-card-title>
                <v-form
                    ref="form"     
                    v-model="valid"
                    lazy-validation
                >
                <v-container
                >
                    <v-select
                        id="myText"
                        :items="vendedores"
                        label="Vendedores"
                        :rules="vendedorRules"
                        v-model="vendedor"
                        v-on:change="validate"
                    > 
                    </v-select>
                </v-container>
                    
                </v-form>
                <v-card-actions>
                    <v-data-table
                        :headers="headers()"
                        :items="clientes"
                    >     
                    <template v-slot:top>
                         <h1 v-if="clientesString"> 
                            <v-icon 
                                color="black"
                                v-on:click="copyText(JSON.stringify(clientesString))"
                            >
                                mdi-content-copy
                            </v-icon>
                        </h1> 
                    </template>
                    </v-data-table>
                </v-card-actions>
                <br>
                <v-row>
                    <v-btn
                        color="pink darken-1"
                        text
                        @click="close"
                    >
                        Cerrar
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                headers() {
                    return [
                        {
                            text: "Razón Social",
                            value: "razon_social",
                            align: "start",
                        },
                    ]
                },
                clientes:[],
                clientesString:'',
                errores:[],
                vendedor:'',
                valid: true,
                vendedorRules: [
                    value => !!value || 'El vendedor es requerido.',
                ],
                vendedores:[],
                respuesta:[],
                dialog: false,
                itemsPerPage:6,
            }
        },
        methods: {
            async getClientes(){
                axios.get('https://192.168.8.200:8000/clientes/' + this.vendedor)
                .then((res) => {
                    /* console.log(res) */
                    this.clientes=res.data.data.clientes
                    /* console.log(res.data.data.clientes) */
                    this.clientesString = ' '
                    this.clientes.forEach(cliente => {
                        console.log(cliente.razon_social + "\n")
                        this.clientesString += cliente.razon_social + ","
                    });
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
            async getVendedores(){
                try {
                    const response = await fetch('https://192.168.8.200:8000/get_vendedores')
                    const data = await response.json()
                    this.vendedores = data.data
                    /* console.log(this.vendedores) */
                } catch (error) {
                    console.error(error)
                }  
            },
            abrir(){
                this.dialog = true;
                this.getVendedores()
            },
            close(){
                this.dialog = false;
            },
            validate () {
                if(this.$refs.form.validate()){
                    this.getClientes()
                }
            },
            onCopy(e) {
                alert('You just copied: ' + e.text)
            },
            onError(e) {
                alert('Failed to copy texts' + e)
            },
            copyTextFromElement(elementID) {
                let element = document.getElementById(elementID); //select the element
                let elementText = element.textContent; //get the text content from the element
                this.copyText(elementText); //use the copyText function below
            },
            copyText(text) {
                navigator.clipboard.writeText(text)
                .then(() => {
                    alert("successfully copied");
                })
                .catch(() => {
                    alert("something went wrong");
                });
            }
        },
    }
</script>