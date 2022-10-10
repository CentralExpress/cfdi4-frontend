<template>
  <v-app>
    <v-app-bar
      app
      color="#42b983"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="HCV Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
          <span class="pageName" color="#42b983">CENTRAL EXPRESS</span>
      </div>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div 
            :elevation="0"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <AccionBotones/>
          </div>
        </template>
        <span>Opciones</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <div 
                :elevation="0"
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-btn
                router="/home"
                target="_blank"
                text
              >
                <!-- <span class="mr-2" mobile-breakpoint="100px">Actualizar</span> -->
                <v-icon v-on:click="forceRerender()">mdi-refresh</v-icon>
              </v-btn>
            </div>
        </template>
        <span>Actualizar</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <TablaPrincipal :key="componentKey"/>
    </v-main>
  </v-app>
</template>

<script>
import TablaPrincipal from './components/TablaPrincipal.vue';
import AccionBotones from './components/AccionBotones.vue';

export default {
  name: 'App',
  components: {
    TablaPrincipal,
    AccionBotones
},

  data: () => ({
    componentKey: 0,
    //
  }),
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  }
};
</script>

<style>
  .pageName{
    font-size: larger;
    font-family: Roboto;
  }
</style>