<template>
    <div class="">
        <h1>Page ou apparaissent les véhicules aux dates demandées</h1>
        <p>
            Nous avons {{availableVehicles.modelsAvailable.length}} modèle(s) de véhicule disponible du <strong>{{dateDepart}}</strong> au <strong>{{dateRetour}}</strong>
        </p>
        <!--<VehiclePresentationComponent v-if="modelsData" modelData="availableVehicles.modelsAvailable" />-->
        <div v-if="availableVehicles" v-for="model in availableVehicles.modelsAvailable" class="card-vehicle">
            <div class="card-vehcile-text">
                <h2>{{model.name
            }} </h2>
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
                availableModelsVan: [],
                dateDepart: "",
                dateRetour: ""
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
                this.dateDepart = new Date(this.$route.query.depart).toLocaleDateString('fr')
                this.dateRetour = new Date(this.$route.query.retour).toLocaleDateString('fr')
               
            }
        },
        created() {
            this.fetchAvailableVehicles();
        }
    }
</script>
<style>

</style>
