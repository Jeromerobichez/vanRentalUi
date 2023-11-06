<template>
    <div class="">
        <h1>Page ou apparaissent les véhicules aux dates demandées</h1>
        <p>Nous avons X modèle de véhicule disponible sur vos dates :</p>
        <!--<VehiclePresentationComponent v-if="modelsData" modelData="availableVehicles.modelsAvailable" />-->
        <div v-if="availableVehicles" v-for="model in availableVehicles.modelsAvailable" class="card-vehicle">
            <div class="card-vehcile-text">
                <h2>{{model.name}} </h2>
                <p> Nombre de place : {{model.pax}}</p>
                <p> Contenance du réservoir : {{model.gas_tank}}</p>
                <p> Prix par jour : {{model.price_per_day}}</p>
            </div>
            <div class="card-vehcile-div-image">
                <img class="card-vehcile-img" :src="model.picture_url" />
            </div>


        </div>


    </div>
</template>
<script>
    import VehiclePresentationComponent from '@/components/VehiclePresentationComponent.vue'
    export default {
        data() {
            return {
                availableVehicles: [],
                availableModelsVan: []
         
            }
        }, 
        components: {
            VehiclePresentationComponent
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
                
                //const myArray = await this.getAvailableModels(this.availableVehicles)
                //console.log("myArray :", myArray)
                //const models = await this.fecthModels(myArray)
                //console.log("models", models)

            //async getAvailableModels(availableVehicles) {
            //    let availableModels = new Set();
            //    let avaiblableModelsArray = []

            //    availableModels = availableVehicles.forEach((vehicle) => {
            //        availableModels.add(vehicle.model_id)

            //        avaiblableModelsArray = Array.from(availableModels)
            //        return avaiblableModelsArray

            //    })
            //},
            //async fecthModels(arrayOfModelIds) {
            //    const apiUrl = 'https://localhost:7045/api/vanRental/GetModelsById'; // Remplacez par l'URL de votre API
            //    const urlFinal = `${apiUrl}?ids=${arrayOfModelIds.join(',')}`;
            //    const response = await fetch(urlFinal);
            //    console.log("response : ", response)
            //    let results = await response.json()

            //}
               
               
               
               
              
            
            
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
