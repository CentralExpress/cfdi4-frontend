<template>
    <v-container>
        <v-dialog
            v-model="dialogAlta"
            max-width="500px"
        >
        <v-card>
            <v-card-title>
            Alta Cliente
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-form 
                ref="form"     
                v-model="valid"
                lazy-validation
                >
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-select
                                :items="listaSucursales"
                                v-model="propsCliente.sucursal"
                                label="Sucursales"
                                :rules="sucursalRules"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="propsCliente.codigo"
                            label="Código"
                            :rules="codigoRules"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                        <v-select
                            v-model="propsCliente.vendedor"
                            :items="vendedores"
                            label="Vendedor"
                            :rules="vendedorRules"
                        ></v-select>
                            
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="pink darken-1"
                text
                @click="closeAgregar"
            >
                Cancelar
            </v-btn>
            <v-btn
                :disabled="!valid"
                color="green darken-1"
                text
                @click="saveAgregar"
            >
                Agregar
            </v-btn>
            </v-card-actions>
        </v-card>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="#42b983"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
                Alta Cliente
            </v-btn>
        </template>
        </v-dialog>
        <v-snackbar
                v-model="snackbar"
                :timeout="1500"
            >   
                {{respuesta}}
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
    </v-container>
</template>

<script>

    import axios from 'axios'

    export default {
        name: "altaCliente",
        data () {
            return {
                valid: true,
                codigoRules: [
                    value => !!value || 'El código es requerido.',
                ],
                sucursalRules: [
                    value => !!value || 'La sucursal es requerida.',
                ],
                vendedorRules: [
                    value => !!value || 'El vendedor es requerido.',
                ],
                propsCliente: {
                    sucursal: '',
                    codigo: '',
                    vendedor: '',
                },
                errores:[],
                vendedores: [],
                dialogAlta: false,
                listaSucursales: [
                    { text: "MXL", value: "MXL" },
                    { text: "ENS", value: "ENS" },
                    { text: "LPZ", value: "LPZ" },
                    { text: "OBR", value: "OBR" },
                    { text: "HMO", value: "HMO" },
                    { text: "TIJ", value: "TIJ" },
                ],
                respuesta:[],
                snackbar: false,
            }
        },
        methods: {
            altaCliente() {
            axios.post('https://192.168.8.200:8000/alta_cliente', this.propsCliente)
                 .then((res) => {
                     console.log(res)
                     this.respuesta = res.data.respuesta
                     console.log(this.respuesta)
                     this.snackbar = true
                 })
                 .catch((error) => {
                  if(error){
                    this.errores.push(error)
/*                     alert("Todos los campos son requeridos")*/
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
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
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
            closeAgregar(){
                this.dialogAlta = false
                },
            saveAgregar () {
                //this.cedulas.push(this.propsCliente)
                if(this.$refs.form.validate()){
                    this.altaCliente()
                    this.closeAgregar()
                    this.reset()
                }
            },
            reset () {
                this.$refs.form.reset()
            },
            validate () {
                this.$refs.form.validate()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            async getVendedores(){
                try {
                    const response = await fetch('https://192.168.8.200:8000/get_vendedores')
                    const data = await response.json()
                    this.vendedores = data.data
                    /* console.log(data) */
                } catch (error) {
                    console.error(error)
                }  
            },
        },
        mounted(){
            this.getVendedores();
        }
    }
</script>