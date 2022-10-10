<template>
    <v-container>
        <v-dialog
            v-model="dialog"
            max-width="350px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        dark
                        color="#36966b"
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="abrir()"
                    >
                        EXPORTAR CLIENTES
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5">
                    EXPORTAR CLIENTES
                    </v-card-title>
                    <v-card-text>
                        ¿Desea exportar todos los clientes?
                    </v-card-text>
<!--                     <v-data-table>
                        
                    </v-data-table> -->
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
                            @click.stop="close()"
                        >
                            Sí
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                dialog: false,
            }
        },
        methods: {
            abrir () {
                this.dialog = true
            },
            close () {
                this.dialog = false
            }
        }
    }
</script>