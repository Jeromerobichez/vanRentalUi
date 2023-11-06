<template>
  <div class="container">
    <h1>Page de présenation des différents modèle de véhicules</h1>
      <div v-if="modelsData" v-for="model in modelsData" class="card-vehicle">
          <h2>{{model.name}} </h2> 
          <p> Nombre de place : {{model.pax}}</p>
          <p> Contenance du réservoir : {{model.gasTank}}</p>
          <p> Prix par jour : {{model.pricePerDay}}</p>
          <span> Salut</span>
      </div>
  </div>

</template>
<script>
    export default {
        data() {
            return {
                modelsData: []
            };
        },
        methods: {
            async fetchVehicles() {
                console.log('début')
                const url = 'https://localhost:7045/api/vanRental/GetAllModels'
                console.log('url')
                const response = await fetch(url);
                console.log('fetch')
                this.modelsData = await response.json();
                

            } 
        },
        created() {
            this.fetchVehicles()
        }
    }
</script>
<style>

</style>
