<template>
    <div class="container">
        <h1>Page de présenation des différents modèle de véhicules</h1>
        <!--<VehiclePresentationComponent v-if="modelsData" :modelData="modelsData" />--> 
        <div v-if="modelsData" v-for="model in modelsData" class="card-vehicle">
            <div class="card-vehicle-text">
                <h2>{{model.name}} </h2>
                <p> Nombre de place : {{model.pax}}</p>
                <p> Contenance du réservoir : {{model.gasTank}}</p>
                <p> Prix par jour : {{model.pricePerDay}}</p>
            </div>
            <div class="card-vehicle-div-image">
                <img class="card-vehicle-img" :src="model.pictureUrl" />
            </div>


        </div>
    </div>

</template>
<script>
    import VehiclePresentationComponent from '@/components/VehiclePresentationComponent.vue'
    export default {
        data() {
            return {
                modelsData: []
            };
        },
        components: {
VehiclePresentationComponent
        },
        methods: {
            async fetchVehicles() {
                console.log('début')
                const url = 'https://localhost:7045/api/models/GetAllModels'
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
    .card-vehicle {
        display: flex;
        justify-content: space-between;
        border: 1px solid black;
        margin: 20px;
        width: 300px;
        flex-direction: column;
    }
    .card-vehicle-div-image {
        width: 300px;
    }
    .card-vehicle-img {
       object-fit: cover;
       width: 100%;
       height: 100%;
    }
</style>
