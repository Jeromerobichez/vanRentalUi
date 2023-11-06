<template>
  <div class="container">
    <h1>Page de présenation des différents modèle de véhicules</h1>

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
                const models = await response.json();

                console.log("models : ", models)

            } 
        },
        mounted() {
            this.fetchVehicles()
        }
    }
</script>
<style>

</style>
