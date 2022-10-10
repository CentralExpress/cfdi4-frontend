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
                    @click.stop="abrir(); cerrar()"
                >
                    mdi-file-eye
                </v-icon>
            </template>
                    <v-card>
                        <v-card-title class="text-h5">
                            <!-- <vue-pdf-embed :src="pdfsrc"></vue-pdf-embed> -->
                            <!-- pdf :source="pdfsrc"></pdf> -->
                             <a v-on:click="cerrar()" :href="pdfsrc" target="_blank">Ver PDF</a> 
                            <v-btn
                            color="pink"
                            text
                            @click="cerrar()"
                            >
                            Cerrar
                            </v-btn>
                        </v-card-title>
                    </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    /* import VuePdfEmbed from 'vue-pdf-embed' */
    /* import pdf from 'vue-pdf' */

    export default {
        name: "verPdf",
        props: ['cedula'],
        components: {
            /* VuePdfEmbed */
            /* pdf */
        },
        data () {
            return {
                dialog: false,
                propsCliente: {
                    sucursal: '',
                    codigo: '',
                },
                errores:[],
                respuesta:'',
                pdfsrc: ''
            }
        },
        methods: {
            async verPdf(cedula){
                return axios.get(
                    'https://192.168.8.200:8000/cif/'+cedula.rfc)/* , 
                    `${process.env.VUE_APP_API_INTRANET}/pdf`, 
                    {
                    responseType: "blob"
                    }) */
                 .then((res) => {
                    console.log(res)
/*                     const blob = new Blob([res.data]);
                    const objectUrl = URL.createObjectURL(blob); */
                    this.pdfsrc = 'https://192.168.8.200:8000/cif/'+cedula.rfc
                    console.log(this.pdfsrc)
                    this.respuesta = res.data.toUpperCase()
                 })
                 .catch((error) => {
                  if(error){
                    this.errores.push(error)
                    this.dialogError = true
                    /* alert(`Error: ${JSON.stringify(error.response.data.details)}`) */
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
                this.verPdf(this.cedula);
            },
            cerrar(){
                this.dialog = false;
            },
            createDynamicURL()
            {
                //The variable to be returned
                var URL;

                URL+=this.pdfsrc;

                return URL;
            }

        }
    }
</script>