<template>
    <v-container>
            <v-dialog
            v-model="dialog"
            max-width="350px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        dark
                        color="#297050"
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="abrir()"
                    >
                        VERIFICAR TODOS
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5">
                    VERIFICAR TODOS
                    </v-card-title>
                    <v-card-text>
                        ¿Deseas verificar todos los clientes?
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="pink darken-1"
                            text
                            @click="dialog = false"
                        >
                            No
                        </v-btn>
                        <v-btn
                            color="green darken-1"
                            text
                            @click.stop="verificarTodos();close()"
                        >
                            Sí
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
            >   
                <!-- CIF No Encontradas:
                {{respuesta}}
                Discrepancias Encontradas: -->
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
    export default{
        name:"ocultarCliente",
        props: ['oculto'],
        data (){
            return {
                dialog: false,
                snackbar: false,
                propsCliente: {
                    sucursal: '',
                    codigo: '',
                    comentario: '',
                },
                errores:[],
                respuesta:[],
                timeout: 2000,
            }
        }, 
        methods: {
            async verificarTodos(){
                axios.get('https://192.168.8.200:8000/verificar_todos')
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
            },
            close(){
                this.dialog = false;
            }
        } 
    }
</script>