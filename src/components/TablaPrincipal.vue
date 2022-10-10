<template>
    <!-- <v-container> -->
        <v-card>
            <v-card-title>
                Actualización SAT 4.0
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                />
                <v-spacer/>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                />
            </v-card-title>
            <v-data-table
                :headers="headersTabla"
                :items="clientesAbiertos"
                :search="search"
            >
                <template v-slot:top>                  
                    <v-container fluid>
                        <v-row>
                            <v-col cols="2">
                                <v-row class="pa-6">
                                    <v-select
                                            :items="listaSucursales"
                                            v-model="filtrarPorSucursalValue"
                                            label="Sucursales"
                                        ></v-select>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-row class="pa-6">
                                    <v-select
                                            :items="listaCif"
                                            v-model="filtrarPorCifValue"
                                            label="CIF"
                                        ></v-select>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-row class="pa-6">
                                    <v-select
                                            :items="listaVerificados"
                                            v-model="filtrarPorVerificacionValue"
                                            label="Verificado"
                                        ></v-select>
                                </v-row>
                            </v-col>
                            <!-- <v-col>
                                <v-row>
                                    <v-btn icon elevation="1" @click="forceRerender()">  
                                        <v-icon>mdi-cached</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-col>  -->
                        </v-row>
                    </v-container>
                </template>
                
                <template v-slot:[`item.actions`]="{ item }">
                    <v-row> 
                        <v-container>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div 
                                        :elevation="0"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <h1 v-if="item.cif">
                                            <VerPdf :cedula="item"/>
                                        </h1> 
                                    </div>
                                </template>
                                <span>Ver PDF</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div 
                                        :elevation="0"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <VerificarCliente :verificacion="item"/>
                                    </div>
                                </template>
                                <span>Verificar Cliente</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div 
                                        :elevation="0"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <InfoCliente :clienton="item"/>
                                    </div>
                                </template>
                                <span>Información del Cliente</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div 
                                        :elevation="0"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <OcultarCliente :oculto="item"/>
                                    </div>
                                </template>
                                <span>Ocultar cliente</span>
                            </v-tooltip>
                        </v-container>
                    </v-row>
                </template>
              
                <template v-slot:[`item.comentario`]='{ item }'>
                    {{item.comentario}}
                    <h1 v-if="item.comentario">
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div 
                                        :elevation="0"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <EditarComentario :comento="item"/>
                                    </div>
                            </template>
                            <span>Editar Comentario</span>
                        </v-tooltip>
                    </h1> 
                </template>

              <template v-slot:[`item.verificado`]='{ item }'>
                  <v-icon :color="getColor(item.verificado)">{{ item.verificado? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
              </template> 
              <template v-slot:[`item.cif`]='{ item }'>
                  <v-icon :color="getColor(item.cif)">{{ item.cif? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
              </template> 
              <template v-slot:[`item.error`]='{ item }'>
                  <v-icon color="orange">mdi-circle-alert {{ item.error? 'mdi-alert-circle' : '' }}</v-icon>
              </template> 
            </v-data-table>
        </v-card>
    <!-- </v-container> -->
  </template>
  
  <script>
import InfoCliente from './InfoCliente.vue';
import OcultarCliente from './OcultarCliente.vue';
import VerificarCliente from './VerificarCliente.vue';
import EditarComentario from './EditarComentario.vue';
import VerPdf from './VerPdf.vue';

    export default {
    name: "tablaSat",
    data() {
        return {
            collapseOnScroll: true,
            clientesAbiertos: [],
            listaDatosClientes: [
                { text: "Razón Social", value: "Razon_Social" },
                { text: "RFC", value: "RFC" },
                { text: "Emisión", value: "Emision" },
                { text: "Regimen Capital", value: "Regimen_Capital" },
                { text: "Fecha de Inicio de Operaciones", value: "Fecha_inicio_de_operaciones" },
                { text: "Status en el padrón", value: "Status_en_el_padron" },
                { text: "Fecha de ultimo cambio de estado", value: "Fecha_de_ultimo_cambio_de_estado" },
                { text: "Emision dt", value: "Emision_dt" },
                { text: "Codigo Postal", value: "Codigo_Postal" },
                { text: "Nombre de Vialidad", value: "Nombre_de_Vialidad" },
                { text: "Numero Exterior", value: "Numero_Exterior" },
                { text: "Numero Interior", value: "Numero_Interior" },
                { text: "Nombre de la Colonia", value: "Nombre_de_la_Colonia" },
                { text: "Nombre de la Localidad", value: "Nombre_de_la_Localidad" },
                { text: "Entre Calle", value: "Entre_Calle" },
                { text: "Y Calle", value: "Y_Calle" },
                { text: "Nombre del Municipio o Demarcacion Territorial", value: "Nombre_del_Municipio_o_Demarcacion_Territorial" },
                { text: "Nombre de la Entidad Federativa", value: "Nombre_de_la_Entidad_Federativa" },
                { text: "Correo Electronico", value: "Correo_Electronico" },
                { text: "Tel Fijo Lada", value: "Tel_Fijo_Lada" },
                { text: "Numero Fijo", value: "Numero_Fijo" },
                { text: "regimen", value: "regimen" },
                { text: "Emision dt", value: "Emision_dt" },
            ],
            componentKey: 0,
            listaSucursales: [
                { text: "Todos", value: null },
                { text: "Mexicali", value: "MXL" },
                { text: "Ensenada", value: "ENS" },
                { text: "La Paz", value: "LPZ" },
                { text: "Obregón", value: "OBR" },
                { text: "Hermosillo", value: "HMO" },
                { text: "Tijuana", value: "TIJ" },
            ],
            listaVerificados: [
                { text: "Todos", value: null },
                { text: "Verificado", value: "true" },
                { text: "No Verificado", value: "false" },
            ],
            listaCif: [
                { text: "Todos", value: null },
                { text: "Tiene CIF", value: "true" },
                { text: "No tiene CIF", value: "false" },
            ],
            filtrarPorCifValue: null,
            filtrarPorSucursalValue: null,
            filtrarPorVerificacionValue: null,
            search: "",
            cedulas: require("../assets/ejemplo.json"),
            clienteItems: require("../assets/jex.json"),
        };
    },
    computed: {
        headersTabla() {
            return [
                {
                    text: "Sucursal",
                    value: "sucursal",
                    align: "start",
                    filter: this.filtrarPorSucursal,
                },
                {
                    text: "Código",
                    value: "codigo",
                },
                { text: "RFC", value: "rfc" },
                { text: "Razón Social", value: "razon_social" },
                {
                    text: "CIF",
                    value: "cif",
                    filter: this.filtrarPorCif,
                },
                {
                    text: "Verificado",
                    value: "verificado",
                    filter: this.filtrarPorVerificacion,
                },
                { text: "Discrepancias", value: "discrepancias" },
                { text: "Comentarios", value: "comentario" },
                { text: "Errores", value: "error", sortable: false },
                { text: "Acciones", value: "actions", sortable: false },
            ];
        },
    },
    methods: {
        getSelectedItem(itemon) {
            //do code here
            console.log(itemon)
        },
        async getClientesAbiertos() {
            try {
                const response = await fetch("https://192.168.8.200:8000/get_clientes_abiertos");
                const data = await response.json();
                this.clientesAbiertos = data.data;
                /* console.log(data) */
            }
            catch (error) {
                console.error(error);
            }
        },
        copyText(item) {
            console.log(item);
            navigator.clipboard.writeText(item);
            console.log(item + " Hola");
        },
        forceRerender() {
            this.componentKey += 1;
        },
        filtrarPorCif(value) {
            if (!this.filtrarPorCifValue) {
                return true;
            }
            const obj = JSON.stringify(value);
            return obj.toString().toLowerCase().includes(this.filtrarPorCifValue.toLowerCase());
        },
        filtrarPorVerificacion(value) {
            if (!this.filtrarPorVerificacionValue) {
                return true;
            }
            const obj = JSON.stringify(value);
            return obj.toString().toLowerCase().includes(this.filtrarPorVerificacionValue.toLowerCase());
        },
        filtrarPorSucursal(value) {
            if (!this.filtrarPorSucursalValue) {
                return true;
            }
            return value.toLowerCase().includes(this.filtrarPorSucursalValue.toLowerCase());
        },
        getColor(resultado) {
            if (resultado === true)
                return "green";
            else if (resultado === false)
                return "red";
        },
    },
    mounted() {
        this.getClientesAbiertos();
    },
    components: {
    InfoCliente,
    OcultarCliente,
    VerificarCliente,
    EditarComentario,
    VerPdf,
}
}
  </script>