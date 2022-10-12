<template>
    <v-container>
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            max-width="350px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="abrir()"
                    >
                        mdi-eye-off
                    </v-icon>
                </template>
                <v-card>
                    <v-card-title class="text-h5">
                    OCULTAR CLIENTE
                    </v-card-title>
                    <v-card-text>
                        ¿Desea ocultar el cliente:
                        <v-container>
                            <v-form ref="form" :disabled="!valid">
                                <v-row>
                                    <v-col 
                                        cols="12"
                                    >
                                    <p class="font-weight-black">
                                        Sucursal: {{oculto.sucursal}}
                                        Código: {{oculto.codigo}}
                                    </p>
                                    <v-text-field
                                        label="Comentario"
                                        required
                                        v-model="propsCliente.comentario"
                                        :rules="comentarioRules"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click.stop="ocultarCliente(oculto); close(); reset(); validate()"
                    >
                        Sí
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row> 
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
    export default{
        name:"ocultarCliente",
        props: ['oculto'],
        data (){
            return {
                valid: true,
                comentarioRules: [
                    value => !!value || 'El comentario es requerido.',
                    value => (value || '').length <= 30 || 'El comentario debe ser menor de 30 caracteres',
                ],
                snackbar: false,
                timeout: 1500,
                respuesta:[],
                dialog: false,
                propsCliente: {
                    sucursal: '',
                    codigo: '',
                    comentario: '',
                },
                errores:[],
            }
        }, 
        methods: {
            async ocultarCliente(oculto){
                this.propsCliente.sucursal = oculto.sucursal
                this.propsCliente.codigo = oculto.codigo
                console.log(JSON.stringify(this.propsCliente))
                axios.post('https://localhost:8000/ocultar_cliente', this.propsCliente)
                 .then((res) => {
                     console.log(res)
                     this.snackbar = true
                     this.respuesta = res.data.respuesta
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
        } 
    }
</script>