<script setup >

</script>

<template>
  <main>
<h1>Bienvenue sur le site de vanRental !</h1>
  </main>
</template>
<script>
    export default {
        data() {
            return {
                vehicleModels: []
            }
           
        },
        methods: {
            async fetchVehicles() {
                console.log('début')
                const url = 'https://localhost:7045/api/vanRental/GetAllModels'
                console.log('url')
                const response = await fetch(url);
                console.log('fetch')
                const models = response.json;
              
               console.log("models : ", models)

            } 
        },
      async  mounted() {
            this.fetchVehicles()
        }
    
    }
 
</script>