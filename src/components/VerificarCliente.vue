<template>
    <v-container>
        <v-row justify="center">
            <v-dialog 
                v-model="dialog"
                max-width="350px"
            >
            <template  v-slot:activator="{ on, attrs }">
                <v-icon
                    class="mr-2"
                    v-on="on"
                    v-bind="attrs"
                    @click.stop="abrir()"
                >
                    mdi-check
                </v-icon>
            </template>
                    <v-card>
                        <v-card-title class="text-h5">
                        VERIFICAR CLIENTE
                        </v-card-title>
                        <v-card-text>{{respuesta}}</v-card-text>
                        <v-btn
                        color="pink"
                        text
                        @click="cerrar()"
                        >
                        Cerrar
                        </v-btn>
                    </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "verificarCliente",
        props: ['verificacion'],
        data () {
            return {
                dialog: false,
                propsCliente: {
                    sucursal: '',
                    codigo: '',
                },
                errores:[],
                respuesta:''
            }
        },
        methods: {
            async verificarCliente(verificacion){
                this.propsCliente.sucursal = verificacion.sucursal
                this.propsCliente.codigo = verificacion.codigo
                console.log(JSON.stringify(this.propsCliente))
                axios.post('https://192.168.8.200:8000/verificar_cliente', this.propsCliente)
                 .then((res) => {
                     console.log(res)
                     this.respuesta = res.data.resultado.toUpperCase()
                 })
                 .catch((error) => {
                  if(error){
                    this.errores.push(error)
                    this.dialogError = true
                    alert(`Error: ${JSON.stringify(error.response.data.details)}`)
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
                this.verificarCliente(this.verificacion);
            },
            cerrar(){
                this.dialog = false;
            }
        }
    }
</script>