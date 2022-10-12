<template>
    <v-container>
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            max-width="350px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        small
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="abrir()"
                    >
                        mdi-pencil
                    </v-icon>
                </template>
                <v-card>
                    <v-card-title class="text-h5">
                    ¿Cambiar comentario?
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col 
                                    cols="12"
                                >
                                Sucursal: {{comento.sucursal}}
                                Código: {{comento.codigo}}
                                <v-text-field
                                    label="Comentario*"
                                    required
                                    v-model="propsCliente.contenido"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*Obligatorio</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="close()"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click.stop="cambiarComentario(comento);close()"
                    >
                        Continuar
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default{
        name:"ocultarCliente",
        props: ['comento'],
        data (){
            return {
                dialog: false,
                propsCliente: {
                    sucursal: '',
                    codigo: '',
                    contenido: this.comento.comentario,
                },
                errores:[],
            }
        }, 
        methods: {
            async cambiarComentario(comento){
                this.propsCliente.sucursal = comento.sucursal
                this.propsCliente.codigo = comento.codigo
                console.log(JSON.stringify(this.propsCliente))
                axios.put('https://localhost:8000/cambiar_comentario', this.propsCliente)
                 .then((res) => {
                     console.log(res)
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
            abrir(){
                this.dialog = true;
            },
            close(){
                this.dialog = false;
            }
        } 
    }
</script>