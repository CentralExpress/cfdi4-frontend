<template>
  <v-container>
      <v-card>
          <v-card-title>
              Actualización SAT 4.0
              <v-spacer></v-spacer>
              <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              ></v-text-field>
          </v-card-title>
          <v-data-table
              v-model="selected"
              :headers="headers"
              :items="items"
              :search="search"
          >
            <template v-slot:[`item.rfc`]='{ item }'>
                <v-chip @click.stop="$set(dialog, item.rfc, true)" @click="props.expanded = !props.expanded">{{ item.rfc }}</v-chip>
                <v-dialog v-model="dialog[item.rfc]" :key="item.rfc">
                    <v-card>
                      <v-card-title>
                        <v-row>
                          <v-col>
                            <template v-slot:expand="props">
                              <v-data-table 
                                v-model="selected" 
                                :headers="headers" 
                                :items="props.items[0]" 
                                mobile-breakpoint="10000" 
                                disable-sort 
                                hide-default-footer
                                />  
                            </template>
                          </v-col>
                          <v-col>
                            <v-data-table 
                              :headers="listaDatosClientes" 
                              :items="clienteItems" 
                              mobile-breakpoint="10000" 
                              disable-sort 
                              hide-default-footer
                              />  
                          </v-col>
                          {{ selected }}
                        </v-row>
                      </v-card-title>
                      <v-card-actions>
                          <v-btn color="primary" @click.stop="$set(dialog, item.rfc, false)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
            <template v-slot:top>
                <v-container fluid>
                    <v-row>
                        <v-col cols="4">
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
                        <v-col>
                            <v-row>
                                <v-btn icon elevation="2" @click="forceRerender()">  
                                    <v-icon>mdi-cached</v-icon>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
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
  </v-container>
</template>

<script>
  /* import pdf from "vue-pdf"; */
  export default {
/*         components: {
          pdf
      }, */
      name: "tablaSat",
    data () {
      return {
        selected:[],
        selectedItem: 0,
        listaDatosClientes: [
          {text: "Razón Social", value: "Razon_Social"},
          {text: "RFC", value: "RFC"},
          {text: "Emisión", value: "Emision"},
          {text: "Regimen Capital", value: "Regimen_Capital"},
          {text: "Fecha de Inicio de Operaciones", value: "Fecha_inicio_de_operaciones"},
          {text: "Status en el padrón", value: "Status_en_el_padron"},
          {text: "Fecha de ultimo cambio de estado", value: "Fecha_de_ultimo_cambio_de_estado"},
          {text: "Emision dt", value: "Emision_dt"},
          {text: "Codigo Postal", value: "Codigo_Postal"},
          {text: "Nombre de Vialidad", value: "Nombre_de_Vialidad"},
          {text: "Numero Exterior", value: "Numero_Exterior"},
          {text: "Numero Interior", value: "Numero_Interior"},
          {text: "Nombre de la Colonia", value: "Nombre_de_la_Colonia"},
          {text: "Nombre de la Localidad", value: "Nombre_de_la_Localidad"},
          {text: "Entre Calle", value: "Entre_Calle"},
          {text: "Y Calle", value: "Y_Calle"},
          {text: "Nombre del Municipio o Demarcacion Territorial", value: "Nombre_del_Municipio_o_Demarcacion_Territorial"},
          {text: "Nombre de la Entidad Federativa", value: "Nombre_de_la_Entidad_Federativa"},
          {text: "Correo Electronico", value: "Correo_Electronico"},
          {text: "Tel Fijo Lada", value: "Tel_Fijo_Lada"},
          {text: "Numero Fijo", value: "Numero_Fijo"},
          {text: "regimen", value: "regimen"},
          {text: "Emision dt", value: "Emision_dt"},
        ],
          dialog: {},
          componentKey: 0,
        listaSucursales: [
          {text: "Todos", value: null},
          {text: "Mexicali", value: "MXL"},
          {text: "Ensenada", value: "ENS"},
          {text: "La Paz", value: "LPZ"},
          {text: "Obregón", value: "OBR"},
          {text: "Hermosillo", value: "HMO"},
          {text: "Tijuana", value: "TIJ"},
        ],
        listaVerificados: [
          {text: "Todos", value: null},
          {text: "Verificado", value: 'true'},
          {text: "No Verificado", value: 'false'},
        ],
        listaCif: [
          {text: "Todos", value: null},
          {text: "Tiene CIF", value: 'true'},
          {text: "No tiene CIF", value: 'false'},
        ],
        filtrarPorCifValue: null,
        filtrarPorSucursalValue: null,
        filtrarPorVerificacionValue: null,
        search: '',
        items: require('../assets/ejemplo.json'),
        itemsPerPage: 4,
        clienteItems: require('../assets/jex.json'),
      }
    },
    computed: {
      headers() {
        return [
          { 
            text: 'Sucursal', 
            value: 'sucursal', 
            align: 'start',
            filter: this.filtrarPorSucursal,
          },
          { 
            text: 'Código', 
            value: 'codigo',
          },
          { text: 'RFC', value: 'rfc' },
          { text: 'Razón Social', value: 'razon_social' },
          { 
            text: 'CIF', 
            value: 'cif',
            filter: this.filtrarPorCif,
          },
          { 
            text: 'Verificado', 
            value: 'verificado',
            filter: this.filtrarPorVerificacion,
          },
          { text: 'Discrepancias', value: 'discrepancias' },
          { text: 'Comentarios', value: 'comentario' },
          { text: 'Errores', value: 'error' },
        ]
      },
    },
    methods: {
/*       encontrarClienteUnico(valor){
        if(valor.rfc = "CEC9109187V2")
        return this.item.rfc === valor.rfc
      }, */
      forceRerender() {
          this.componentKey += 1;
      },
       filtrarPorCif(value){
        if(!this.filtrarPorCifValue){
          return true;
        } 
        const obj = JSON.stringify(value);
        return obj.toString().toLowerCase().includes(this.filtrarPorCifValue.toLowerCase());
      }, 
      filtrarPorVerificacion(value){
        if(!this.filtrarPorVerificacionValue){
          return true;
        }
          const obj = JSON.stringify(value);
        return obj.toString().toLowerCase().includes(this.filtrarPorVerificacionValue.toLowerCase());
      },
      filtrarPorSucursal(value){
        if (!this.filtrarPorSucursalValue) {
          return true;
        }
        return value.toLowerCase().includes(this.filtrarPorSucursalValue.toLowerCase());
      },
      getColor (resultado) {
        if (resultado === true) return 'green'
        else if (resultado === false) return 'red'
      },
      async getItems (){
        try {
          //console.log("Hola")
          /* alert(JSON.stringify(this.items)) */
        } catch (error) {
          console.error(error)
        }
      }
    },
    mounted() {
      this.getItems()
    },
  }
</script>