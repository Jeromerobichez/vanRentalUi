<template>
    <div class="">
        <h1>Page ou apparaissent les véhicules aux dates demandées</h1>
        <p>Nous avons X modèle de véhicule disponible sur vos dates :</p>
        <!--<VehiclePresentationComponent v-if="modelsData" modelData="availableVehicles.modelsAvailable" />-->
        <div v-if="availableVehicles" v-for="model in availableVehicles.modelsAvailable" class="card-vehicle">
            <div class="card-vehcile-text">
                <h2>{{model.name}} </h2>
                <p> Nombre de places : {{model.pax}}</p>
                <p> Contenance du réservoir : {{model.gas_tank}}</p>
                <p> Prix par jour : {{model.price_per_day}}</p>
                <p> Prix total pour cette période : {{model.rentalPrice}}</p>
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
                const url = `https://localhost:7045/api/vanRental/GetAvailableVehicles?departureDate=${this.$route.query.depart}&returnDate=${this.$route.query.retour}`
                const response = await fetch(url);
                this.availableVehicles = await response.json()
                console.log("this.availableVehicles : ", this.availableVehicles)
            }
        },
        created() {
            this.fetchAvailableVehicles();
        }
    }
</script>
<style>

</style>
