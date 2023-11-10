<template>
    <div class="container">
        <h1>Page de présenation des différents modèle de véhicules</h1>
        <!--<VehiclePresentationComponent v-if="modelsData" :modelData="modelsData" />--> 
        <div v-if="modelsData" v-for="model in modelsData" class="card-vehicle">
            <div class="card-vehcile-text">
                <h2>{{model.name}} </h2>
                <p> Nombre de place : {{model.pax}}</p>
                <p> Contenance du réservoir : {{model.gasTank}}</p>
                <p> Prix par jour : {{model.pricePerDay}}</p>
            </div>
            <div class="card-vehcile-div-image">
                <img class="card-vehcile-img" :src="model.pictureUrl" />
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
        justify-content: space-around;
    }
    .card-vehicle {
        border: 1px solid black;
        margin: 20px;
    }
    .card-vehcile-img{
        max-height: 200px;
    }
</style>
