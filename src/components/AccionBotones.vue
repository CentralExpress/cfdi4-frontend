<template>
    <v-container>
        <v-dialog 
            v-model="dialog"
            max-width="450px"
        >
            <v-card>
                <v-toolbar
                    class="mb-2"
                    color="#42b983"
                    dark
                    flat
                >
                    <v-toolbar-title>OPCIONES DEL SISTEMA</v-toolbar-title>
                </v-toolbar>
                <v-card-actions>   
                    <v-row class="pl-7">
                        <AltaCliente/>                              
                        <ResumenClientes/>
                        <VerificarTodos/>
                        <PdfsNuevos/>
                        <ProcesarPdfs/>
                        <ExportarCliente/>   
                        <VendedorClientes/>
                    </v-row>
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
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="#42b983"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    :elevation="0"
                >
                    <v-icon>
                        mdi-view-list
                    </v-icon>
                </v-btn>
            </template>
        </v-dialog>
    </v-container>
</template>

<script>
import AltaCliente from './AltaCliente.vue';
import VerificarTodos from './VerificarTodos.vue';
import PdfsNuevos from './PdfsNuevos.vue';
import ProcesarPdfs from './ProcesarPdfs.vue';
import ExportarCliente from './ExportarCliente.vue';
import ResumenClientes from './ResumenClientes.vue';
import VendedorClientes from './VendedorClientes.vue';

    export default {
        components: {
            VerificarTodos,
            PdfsNuevos,
            ProcesarPdfs,
            ExportarCliente,
            ResumenClientes,
            VendedorClientes,
            AltaCliente,
        },
         data () {
             return {
                dialog: false,
             }
         },
         methods: {
            close () {
                this.dialog = false
            }
         }
    }
</script>