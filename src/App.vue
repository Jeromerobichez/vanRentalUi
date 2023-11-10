<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
   
      <ul>
          <li><RouterLink :to="{name: 'home'}">Retour Home</RouterLink></li>
          <li><RouterLink :to="{name: 'AvailableVehiclesForRent'}">Véhicules disponibles</RouterLink></li>
          <li><RouterLink :to="{name: 'VehiclesPresentation'}">Nos véhicules</RouterLink></li>
          <li><RouterLink :to="{name: 'AdministrationHome'}"> Administration</RouterLink></li>
      </ul>
  </header>

  <RouterView />
</template>

<style scoped>
    #app{
        display: block;

    }
    header {
      
    }
</style>
