<template>
    <v-container>
            <v-dialog 
                v-model="dialog"
                max-width="450px"
            >
            <template  v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    color="#297050"
                    class="mr-2"
                    v-on="on"
                    v-bind="attrs"
                    @click.stop="abrir()"
                >
                    PDFs NUEVOS
                </v-btn>
            </template>
                    <v-card>
                        <v-card-title class="text-h5">
                            PDFS NUEVOS
                        </v-card-title>
                        <v-card-text>
                            {{respuesta}}
                        </v-card-text>
                        <v-btn
                            color="pink"
                            text
                            @click="cerrar()"
                            >
                            Cerrar
                        </v-btn>
                    </v-card>
            </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "pdfsNuevos",
        data () {
            return {
                dialog: false,
                errores:[],
                respuesta:{},
                dialogError:false
            }
        },
        methods: {
            async getPdfs(){
                axios.get('https://192.168.8.200:8000/pdfs_nuevos')
                 .then((res) => {
                     console.log(res)
                     this.respuesta = res.data
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
                this.getPdfs(this.verificacion);
            },
            cerrar(){
                this.dialog = false;
            }
        }
    }
</script>