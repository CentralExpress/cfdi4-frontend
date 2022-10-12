<template>
    <v-container
    >   
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                    
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="abrirInfoCliente(clienton)"
                >
                    mdi-table-headers-eye
                </v-icon>
            </template>
            <v-card>
            <v-card-title>
                INFORMACIÓN DEL CLIENTE
            </v-card-title>
            <v-row>
                <v-col>
                    <v-container>
                        <v-card>
                            <v-card-title>
                                Datos generales
                            </v-card-title>
                            <v-data-table
                                :headers="headersTabla"
                                :items="items"
                                mobile-breakpoint="10000"
                                hide-default-footer
                            />
                        </v-card>
                    </v-container>
                </v-col>
                <v-col>
                    <v-container>
                        <v-card>
                            <v-card-title>
                                Datos de la cédula
                            </v-card-title>
                            <v-data-table 
                                :headers="listaDatosClientes" 
                                :items="clienteCifs" 
                                mobile-breakpoint="10000" 
                                disable-sort 
                                hide-default-footer
                            >
                                <template v-slot:[`item.razon_social`]='{ item }'>
                                    {{item.razon_social}}
                                    <h1 v-if="item.razon_social">
                                        <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.razon_social)"
                                    >mdi-content-copy</v-icon>
                                    </h1>
                                </template>
                                <template v-slot:[`item.rfc`]='{ item }'>
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
                                    {{item.rfc}}
                                    <h1 v-if="item.rfc">
                                        <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.rfc)"
                                        >
                                        mdi-content-copy {{ item.rfc ? 'mdi-content-copy' : '' }}
                                    </v-icon>
                                        </h1>
                                </template>
                                <template v-slot:[`item.curp`]='{ item }'>
                                    {{item.curp}}
                                    <h1 v-if="item.curp">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.curp)"
                                    >mdi-content-copy</v-icon>
                                    </h1>
                                </template>
                                <template v-slot:[`item.Apellido`]='{ item }'>
                                    {{item.Apellido}}
                                    <h1 v-if="item.Apellido">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.Apellido)"
                                    >mdi-content-copy</v-icon>
                                    </h1>
                                </template>
                                <template v-slot:[`item.emision`]='{ item }'>
                                    {{item.emision}}
                                    <h1 v-if="item.rfc">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.emision)"
                                    >mdi-content-copy</v-icon>
                                    </h1>
                                </template>
                                <template v-slot:[`item.nombre`]='{ item }'>
                                    {{item.nombre}}
                                    <h1 v-if="item.nombre">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.nombre)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.primer_apellido`]='{ item }'>
                                    {{item.primer_apellido}}
                                    <h1 v-if="item.primer_apellido">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.primer_apellido)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.segundo_apellido`]='{ item }'>
                                    {{item.segundo_apellido}}
                                    <h1 v-if="item.segundo_apellido">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.segundo_apellido)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.fecha_inicio_de_operaciones`]='{ item }'>
                                    {{item.fecha_inicio_de_operaciones}}
                                    <h1 v-if="item.fecha_inicio_de_operaciones">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.fecha_inicio_de_operaciones)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.status_en_el_padron`]='{ item }'>
                                    {{item.status_en_el_padron}}
                                    <h1 v-if="item.status_en_el_padron">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.status_en_el_padron)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.fecha_de_ultimo_cambio_de_estado`]='{ item }'>
                                    {{item.fecha_de_ultimo_cambio_de_estado}}
                                    <h1 v-if="item.fecha_de_ultimo_cambio_de_estado">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.fecha_de_ultimo_cambio_de_estado)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.codigo_postal`]='{ item }'>
                                    {{item.codigo_postal}}
                                    <h1 v-if="item.codigo_postal">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.codigo_postal)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.tipo_de_vialidad`]='{ item }'>
                                    {{item.tipo_de_vialidad}}
                                    <h1 v-if="item.tipo_de_vialidad">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.tipo_de_vialidad)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.calle`]='{ item }'>
                                    {{item.calle}}
                                    <h1 v-if="item.calle">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.calle)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.numero_exterior`]='{ item }'>
                                    {{item.numero_exterior}}
                                    <h1 v-if="item.numero_exterior">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.numero_exterior)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.numero_interior`]='{ item }'>
                                    {{item.numero_interior}}
                                    <h1 v-if="item.numero_interior">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.numero_interior)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.colonia`]='{ item }'>
                                    {{item.colonia}}
                                    <h1 v-if="item.colonia">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.colonia)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.localidad`]='{ item }'>
                                    {{item.localidad}}
                                    <h1 v-if="item.localidad">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.localidad)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.entre_calle`]='{ item }'>
                                    {{item.entre_calle}}
                                    <h1 v-if="item.entre_calle">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.entre_calle)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.y_calle`]='{ item }'>
                                    {{item.y_calle}}
                                    <h1 v-if="item.y_calle">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.y_calle)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.municipio`]='{ item }'>
                                    {{item.municipio}}
                                    <h1 v-if="item.municipio">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.municipio)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.entidad_federativa`]='{ item }'>
                                    {{item.entidad_federativa}}
                                    <h1 v-if="item.entidad_federativa">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.entidad_federativa)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.correo_electronico`]='{ item }'>
                                    {{item.correo_electronico}}
                                    <h1 v-if="item.correo_electronico">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.correo_electronico)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.tel_fijo_lada`]='{ item }'>
                                    {{item.tel_fijo_lada}}
                                    <h1 v-if="item.tel_fijo_lada">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.tel_fijo_lada)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.numero_fijo`]='{ item }'>
                                    {{item.numero_fijo}}
                                    <h1 v-if="item.numero_fijo">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.numero_fijo)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.tel_movil_lada`]='{ item }'>
                                    {{item.tel_movil_lada}}
                                    <h1 v-if="item.tel_movil_lada">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.tel_movil_lada)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.numero_movil`]='{ item }'>
                                    {{item.numero_movil}}
                                    <h1 v-if="item.numero_movil">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.numero_movil)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                                <template v-slot:[`item.regimen`]='{ item }'>
                                    {{item.regimen}}
                                    <h1 v-if="item.regimen">
                                    <v-icon 
                                        color="black"
                                        v-on:click="copyText(item.regimen)"
                                    >mdi-content-copy</v-icon></h1>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-container>
                </v-col> 
            </v-row>
            <v-btn
                color="blue darken-1"
                text
                v-on:click="close()"
            >
            Cerrar
            </v-btn>
            <!--                         <v-card-actions>
                <v-btn color="primary" @click.stop="$set(dialog, item.codigo, false)">Cerrar</v-btn>
            </v-card-actions> -->
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

    export default {
        name: "infoCliente",
        props: ['clienton'],
        data () {
            return {
                clienteCifs:[],
                items: [],
                itemons:[],
                dialog: false,
                text: "Texto copiado en el portapapeles",
                timeout: 1500,
                snackbar: false,
                itemsPerPage:1,
                clienteItems: [],
                listaDatosClientes: [
                    {text: "Razón Social", value: "razon_social"},
                    {text: "CURP", value: "curp"},
                    {text: "Apellido", value: "Apellido"},
                    {text: "Nombre", value: "nombre"},
                    {text: "Primer Apellido", value: "primer_apellido"},
                    {text: "Segundo Apellido", value: "segundo_apellido"},
                    {text: "RFC", value: "rfc"},
                    {text: "Emisión", value: "emision"},
                    {text: "Regimen Capital", value: "regimen_capital"},
                    {text: "Fecha de Inicio de Operaciones", value: "fecha_inicio_de_operaciones"},
                    {text: "Status en el padrón", value: "status_en_el_padron"},
                    {text: "Fecha de ultimo cambio de estado", value: "fecha_de_ultimo_cambio_de_estado"},
                    {text: "Emision dt", value: "emision_dt"},
                    {text: "Codigo Postal", value: "codigo_postal"},
                    {text: "Calle", value: "calle"},
                    {text: "Tipo de Vialidad", value: "tipo_de_vialidad"},
                    {text: "Numero Exterior", value: "numero_exterior"},
                    {text: "Numero Interior", value: "numero_interior"},
                    {text: "Nombre de la Colonia", value: "colonia"},
                    {text: "Nombre de la Localidad", value: "localidad"},
                    {text: "Entre Calle", value: "entre_calle"},
                    {text: "Y Calle", value: "y_calle"},
                    {text: "Nombre del Municipio o Demarcacion Territorial", value: "nombre_del_municipio_o_demarcacion_territorial"},
                    {text: "Nombre de la Entidad Federativa", value: "entidad_federativa"},
                    {text: "Correo Electronico", value: "correo_electronico"},
                    {text: "Tel Fijo Lada", value: "tel_fijo_lada"},
                    {text: "Numero Fijo", value: "numero_fijo"},
                    {text: "Lada de Teléfono Móvil", value: "tel_movil_lada"},
                    {text: "Numero Móvil", value: "numero_movil"},
                    {text: "regimen", value: "regimen"},
                ],
            }
        },
        methods: {
            async getCliente() {
                try {
                    const response = 
                    await fetch("https://localhost:8000/get_cliente?sucursal="
                    +this.clienton.sucursal
                    +"&codigo="
                    +this.clienton.codigo);
                    const data = await response.json();
                    this.clienteItems = data; 
                }
                catch (error) {
                    console.error(error);
                }
            },
            async getClienteCif(){
                try {
                    const response = 
                    await fetch("https://localhost:8000/get_cif?rfc="
                    +this.clienton.rfc);
                    const data = await response.json();
                    this.clienteCifs = [ ];
                    this.clienteCifs.push(data);
                    console.log(JSON.stringify(this.clienteCifs))  
                }
                catch (error) {
                    console.error(error);
                }
            },
            abrirInfoCliente(clienton) {
                this.dialog = true;
                this.getCliente();
                this.getClienteCif();
                 this.items = [ ]
                 this.items.push(clienton)
            },
            close() {
                this.dialog = false;
            },
            copyText(propiedad) {
                navigator.clipboard.writeText(propiedad)
                .then(() => {
                    alert("successfully copied");
                })
                .catch(() => {
                    alert("something went wrong");
                });
            },
            onCopy(e) {
                alert('You just copied: ' + e.text)
            },
            onError(e) {
                alert('Failed to copy texts' + e)
            }
        },
        computed: {
            headersTabla() {
            return [
                { 
                text: 'Sucursal', 
                value: 'sucursal', 
                sortable: false,
                align: 'start',
                },
                { 
                text: 'Código', 
                value: 'codigo',
                sortable: false
                },
                { text: 'RFC', value: 'rfc', sortable: false },
                { text: 'Razón Social', value: 'razon_social', sortable: false },
                { 
                text: 'CIF', 
                value: 'cif',
                sortable: false
                },
                { 
                text: 'Verificado', 
                value: 'verificado',
                sortable: false
                },
                { text: 'Discrepancias', value: 'discrepancias', sortable: false },
                { text: 'Comentarios', value: 'comentario', sortable: false },
                { text: 'Errores', value: 'error', sortable: false},
            ]
            },
        }
    }
</script>