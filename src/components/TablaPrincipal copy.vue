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
                :headers="headersTabla"
                :items="clientesAbiertos"
                :search="search"
            >
<!--                <template v-slot:[`item.rfc`]='{ item }'>
                  <v-chip @click.stop="$set(dialog, item.codigo, true)">{{ item.rfc }}</v-chip>
                  <v-dialog v-model="dialog[item.codigo]" :key="item.codigo">
                      <v-card>
                        <v-card-title>
                          <v-row>
                            <v-col>
                                <v-data-table  
                                  :headers="headersTabla" 
                                  :items="item" 
                                  mobile-breakpoint="10000" 
                                  disable-sort 
                                  hide-default-footer
                                  />  
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
                          </v-row>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn color="primary" @click.stop="$set(dialog, item.codigo, false)">Cerrar</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog>
              </template>  -->
<!--                <template v-slot:[`item.codigo`]='{ item }'>
                </template> -->
              <template v-slot:top>
                <!-- <v-dialog v-model="dialog[item.codigo]" :key="item.codigo"> -->
                  <v-dialog v-model="dialogError">
                    <v-card>
                      <v-card-title>
                        Error
                      </v-card-title>
                      <v-card-text>
                        {{}}
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialog">
<!--                         <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="abrirInfoCliente(item)"
                            >
                            {{ item.codigo }}
                            </v-btn>
                        </template> -->

                    <v-card>
                      <v-card-title>
                        <v-row>
                          <v-col>
                              <!-- <v-data-table  
                                :headers="headersTabla" 
                                :items="clienteIndividual" 
                                mobile-breakpoint="10000" 
                                disable-sort 
                                hide-default-footer
                                />   -->
                          </v-col>
                          <v-col>
<!--                             <v-simple-table
                            :items="clienteItems"
                            >
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Titulo
                                    </th>
                                    <th class="text-left">
                                      Valor
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="dato in listaDatosClientes"
                                    :key="dato.text"
                                  >
                                    <td>{{ dato.text }}</td>
                                    <td>{{ item.value }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table> -->
                            <!-- <v-data-table 
                              :headers="listaDatosClientes" 
                              :items="clienteItems" 
                              mobile-breakpoint="10000" 
                              disable-sort 
                              hide-default-footer
                            >
                            <template v-slot:[`item.Razon_Social`]='{ item }'>
                              <v-snackbar
                                v-model="snackbar"
                                :timeout="timeout"
                              >
                                {{ text }}

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
                              {{ item.Razon_Social }}
                              <v-icon 
                                color="black"
                                v-on:click="snackbar = true; copyText(item.Razon_Social)"
                                >
                                mdi-content-copy {{ item.Razon_Social ? 'mdi-content-copy' : '' }}
                              </v-icon>
                            </template>
                            </v-data-table>   -->
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                      >
                        Cerrar
                      </v-btn>
  <!--                         <v-card-actions>
                          <v-btn color="primary" @click.stop="$set(dialog, item.codigo, false)">Cerrar</v-btn>
                      </v-card-actions> -->
                    </v-card>
                  </v-dialog>
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
                                  <v-btn icon elevation="1" @click="forceRerender()">  
                                      <v-icon>mdi-cached</v-icon>
                                  </v-btn>
                              </v-row>
                          </v-col> 
                          <v-col cols="3" class="right">
                            <v-dialog
                              v-model="dialogAlta"
                              max-width="500px"
                            >
                            <v-card>
                              <v-card-title>
                                Alta Cliente
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                      <v-text-field
                                        v-model="propsCliente.sucursal"
                                        label="Sucursal"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                      <v-text-field
                                        v-model="propsCliente.codigo"
                                        label="Código"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="4"
                                    >
                                    <v-select
                                      v-model="propsCliente.vendedor"
                                      :items="vendedores"
                                      label="Vendedor"
                                    ></v-select>
                                      
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="closeAgregar"
                                >
                                  Cancelar
                                </v-btn>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="saveAgregar"
                                >
                                  Agregar
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                              >
                              Nuevo Cliente
                            </v-btn>
                            </template>
                          </v-dialog>
                          <template>
                            <v-file-input
                              label="Subida de Archivos"
                              accept=".csv"
                              v-model="ffile"
                              @change="inputChanged"
                            ></v-file-input>
                            <v-btn v-on:click="altaClienteMasivo">
                              Alta Masiva
                            </v-btn>
                          </template>
                          </v-col>
                      </v-row>
                  </v-container>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  v-on:click="abrirInfoCliente(item)"
                >
                  mdi-eye
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-check
                </v-icon>
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
    import axios from 'axios'
    export default {
        name: "tablaSat",
      data () {
        return {
          ffile:[], message:"",show:false,
          errores:[],
          form: {
            sucursal: '',
            codigo: '',
            submitting: false,
            vendedor: '',
          },
          clientesAbiertos:[],
          vendedores:[],
          propsCliente: {
            sucursal: '',
            codigo: '',
            vendedor: '',
          },
          snackbar: false,
          text: 'Copiado en el portapapeles',
          timeout: 1500,
          selectedItem: 0,
          clienteIndividual:[],
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
          dialog: false, 
          dialogAlta: false,
          dialogError: false,
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
          cedulas: require('../assets/ejemplo.json'),
          itemsPerPage: 4,
          clienteItems: require('../assets/jex.json'),
        }
      },
      computed: {
        headersTabla() {
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
            { text: 'Errores', value: 'error', sortable: false},
            { text: 'Acciones', value: 'actions', sortable: false },
          ]
        },
      },
      methods: {
        inputChanged() 
        { console.log('file type=',this.ffile.type)
          if (this.ffile.type.match('application/vnd.ms-excel')){ 
                    console.log('csv matched');
                    this.show=false;
              }
            else{
              console.log('not matched')
              this.show=true;
              this.message="El archivo no está en formato csv" ;
              
            }              
        },
        altaClienteMasivo(){
          
        },
        altaCliente() {
            axios.post('https://localhost:8000/alta_cliente', this.propsCliente)
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
        async getClientesAbiertos(){
          try {
            const response = await fetch('https://localhost:8000/get_clientes_abiertos')
            const data = await response.json()
            this.clientesAbiertos = data.data
            /* console.log(data) */
          } catch (error) {
              console.error(error)
          }  
        },
        async getVendedores(){
          try {
            const response = await fetch('https://localhost:8000/get_vendedores')
            const data = await response.json()
            this.vendedores = data.data
            /* console.log(data) */
          } catch (error) {
              console.error(error)
          }  
        },
/*         getVendedores(){
            axios
            .get('https://localhost:8000/get_vendedores',
            {
              headers: { 
                'Access-Control-Allow-Origin': 'https://localhost:8000',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
            })
            .then(response => (this.vendedores = response.data))
            .catch(error => console.log(error)) */
/*               let headers = new Headers();

              headers.append('Content-Type', 'application/json');
              headers.append('Accept', 'application/json');

              headers.append('Access-Control-Allow-Origin', 'https://localhost:8000/get_vendedores');
              headers.append('Access-Control-Allow-Credentials', 'true');

              headers.append('GET', 'POST', 'OPTIONS');


              fetch('https://localhost:8000/get_vendedores', {
                  mode: 'cors',
                  credentials: 'include',
                  method: 'GET',
                  headers: headers
              })
              .then(response => response.json())
              .then( json => {
                this.vendedores = json.data
                console.log(this.vendedores)
              })
              .catch(error => console.log('Authorization failed: ' + error.message)); 
        },*/
        closeAgregar(){
          this.dialogAlta = false
        },
        saveAgregar () {
          //this.cedulas.push(this.propsCliente)
          if(this.altaCliente()){
            this.dialogAlta =  false
          }

        },
        copyText(item){
          console.log(item)
          navigator.clipboard.writeText(item);
          console.log(item + " Hola")
          
        },
        abrirInfoCliente (item) {
            /* console.log(JSON.stringify(item) + " " + this.dialog) */
            /* this.editedIndex = this.cedulas.indexOf(item.rfc) */
            /* this.propsCliente = Object.assign({}, item.rfc)  */
            this.dialog = true
            this.clienteIndividual = item;
/*             console.log(this.clienteIndividual) */
        },
        close () {
            this.dialog = false
/*             console.log(this.dialog) */
            /* this.$nextTick(() => {
            this.propsCliente = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }) */
        },
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
        this.getVendedores()
        this.getClientesAbiertos()
      },
    }
  </script>