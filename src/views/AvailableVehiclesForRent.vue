<template>
  <div class="">
    <h1>Page ou apparaissent les véhicules aux dates demandées</h1>
      <p>Nous avons X modèle de véhicule disponible sur vos dates :</p>
      <p> yolo : {{queri}}</p>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                availableVehicles: [],
                queri: ""
            }
        }, 
        methods: {
            async fetchAvailableVehicles() {

                console.log("début")
                const url = `https://localhost:7045/api/vanRental/GetAvailableVehicles?departureDate=${this.$route.query.depart}&returnDate=${this.$route.query.retour}`

                console.log("milieu")
                const response = await fetch(url);

                console.log('fetch : response', response)
                this.availableVehicles = await response.json()
                console.log("fin availableVehicles", this.availableVehicles)
            }
        },
        created() {
            this.fetchAvailableVehicles();
        },
         mounted() {
            console.log("availableVehicles in MOUNTED ::", this.availableVehicles)
        }
    }
</script>
<style>

</style>
