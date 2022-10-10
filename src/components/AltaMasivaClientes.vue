<template>
    <v-container>
        <v-dialog v-model="dialog" max-width="450px">
            <v-card>
                <v-container>
                    <input
                    type="file" 
                    ref="file" 
                    id="file" 
                    v-on:change="csvToJson()"
                    :rules="(value) => !value || value.type == 'text/csv' || 'Solo archivos CSV!!'"
                    >
                    <p class="content"></p>
                    <v-btn v-on:click="altaCliente(); cerrarForma()">Subir</v-btn>
                </v-container>
            </v-card>
            <template v-slot:activator="{ on, attrs }">
                <v-row>
                    <v-col>
                        <v-btn
                        color="#36966b"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                            Alta Masiva
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
        </v-dialog>
        <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
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
    import Papa from 'papaparse'

    export default {
        name:"altaMasivaClientes",
        data () {
            return {
                csvData:{},
                dialog: false,
                ffile: [],
                message: "",
                show: false,
                errores:[],
                propsClientes: {
                    data : ''
                },
                csv:null,
                snackbar:false,
                respuesta: [],
                timeout:1500
            }
        },
        methods: {
            csvToJson(){
                let csvFile =  this.$refs.file.files?.[0]
                if(csvFile == undefined){
                    alert("Selecciona un archivo")
                    this.csvData=[];
                    return;
                }
                let that = this
                Papa.parse(csvFile, {
                    complete(result){
                        that.csvData=result.data
                        console.log(JSON.stringify(that.csvData))
                    }
                })
            },
            altaCliente() {
            axios.post('https://192.168.8.200:8000/alta_cliente_masivo', this.csvData)
                 .then((res) => {
                    console.log("Tipo de Archivo=", this.csvData);
                     console.log(res)
                     this.snackbar = true
                     this.respuesta = res.data.respuesta
                 })
                 .catch((error) => {
                  if(error){
                    this.errores.push(error)
                    this.dialogError = true
                    alert(`Error: ${JSON.stringify(error.response.data)}`)
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
            abrirForma(){
                this.dialog = true;
            },
            cerrarForma(){
                this.dialog = false;
            },
        }
    }
</script>

<style>
    .alta {
        max-width: 350px;
    }
</style>