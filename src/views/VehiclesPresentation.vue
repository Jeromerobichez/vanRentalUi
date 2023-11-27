<template>
    <div class="container">
        <div class="modal-overlay"
             v-if="isModalOpen"
             @click="closeContactModal">
        </div>
        <div class="detail-modal" 
             v-if="isModalOpen">MODAL</div>
        <h1>Page de présenation des différents modèle de véhicules</h1>
        <!--<VehiclePresentationComponent v-if="modelsData" :modelData="modelsData" />-->
        <div v-if="modelsData" v-for="model in modelsData" class="card-vehicle-total" @click="openDetailModal">
            <h2 class="card-vehicle-h2-large">{{model.name}}</h2>
            <div class="card-vehicle">
                <div class="card-vehicle-text">
                    <h2 class="card-vehicle-h2-small">{{model.name}} </h2>
                    <p> Nombre de place : {{model.pax}}</p>
                    <p> Contenance du réservoir : {{model.gasTank}}</p>
                    <p> Prix par jour : {{model.pricePerDay}}</p>
                </div>
                <div class="card-vehicle-div-image">
                    <img class="card-vehicle-img" :src="model.pictureUrl" />
                </div>
            </div>


        </div>
    </div>

</template>
<script>
    import VehiclePresentationComponent from '@/components/VehiclePresentationComponent.vue'
    export default {
        data() {
            return {
                modelsData: [],
                isModalOpen: false,
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
            },
            openDetailModal() {
                this.isModalOpen = true
             
            },
            closeContactModal() {
                this.isModalOpen = false
              
            }
        },
        created() {
            this.fetchVehicles()
        }
    }
</script>
<style>
    * {
        font-family: "Calibri"
    }
    .detail-modal {

        background-color: chartreuse;
        border: 3px solid black;
        border-radius: 8px;
        z-index: 3;
        height: 75vh;
        width: 75vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card-vehicle-h2-large {
        display: none;
        background-color: #f7953e;
    }
    .card-vehicle-h2-small {

    }
    .card-vehicle-total {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        margin: 20px;
        width: 340px;
        flex-direction: column;
        border-radius: 8px;
        background-color: #3198b9;
        padding: 10px;
    }
    .card-vehicle {
        display: flex;
        justify-content: center;
        width: 300px;
        flex-direction: column;
        border-radius: 8px;
        background-color: #3198b9;
        padding: 10px;
    }
    .card-vehicle-text {
        background-color: white;
        padding: 10px;
        border-radius: 8px;
    }
    .card-vehicle-div-image {
        width: 300px;
    }
    .card-vehicle-img {
       object-fit: cover;
       width: 100%;
       height: 100%;
    }
    @media screen and (min-width: 541px){
        .card-vehicle-total{
            width: 500px;
            align-items: center;
          
        }
        .card-vehicle {
            width: 460px;
            flex-direction:row;
        }
        .card-vehicle-text{
            width: 70%;
        }
    }
    @media screen and (min-width: 993px) {
        .card-vehicle-h2-large {
            display: flex;
            text-align: center;
            padding: 10px 20px;
            border: 2px solid black;
            border-radius: 8px;
        }
        .card-vehicle-h2-small {
            display: none;
        }
    }
</style>
