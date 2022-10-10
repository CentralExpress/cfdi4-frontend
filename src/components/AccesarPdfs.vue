<template>
    <v-container>
        <v-card>
            <v-row justify="center">
                <v-col
                v-for="(docs, i) in info"
                :key="i"
                cols="10"
                >
                    <v-card>
                    <v-row>
                        <v-col
                        cols="10"
                        >
                        <v-icon large>mdi-file-document-outline</v-icon> {{ docs.name }}
                        </v-col>
                        <v-col
                        cols="2"
                        >
                        <v-row><a :href="docs.file" download><v-icon color="green" large>mdi-download</v-icon></a></v-row>
                        </v-col>
                    </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
        return {
            info: null,
        }
        },
        mounted () {
        axios
            .get('https://localhost:8080/actualizacionsatfe/src/assets/logo.png')
            .then(response => {this.info = response.data.data 
                console.log(this.info)})
            .catch(error => console.log(error))
        },
    }
</script>