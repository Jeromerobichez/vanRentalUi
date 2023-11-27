<template>
    <div class="container">
        <h1>Voici les véhicules correspondant à votre recherche : </h1>
        <p v-if="availableVehicles.modelsAvailable">
            Nous avons {{availableVehicles.modelsAvailable.length}} modèle(s) de véhicule disponible du <strong>{{dateDepart}}</strong> au <strong>{{dateRetour}}</strong>
        </p>
        <div  class="card-vehicle-total" v-for="model in availableVehicles.modelsAvailable">
            <VehiclePresentationComponent v-if="availableVehicles.modelsAvailable" :modelData="model" />
        </div>

        <div class="modal-overlay"
             v-if="isModalOpen"
             @click="closeContactModal">
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
                dateDepart: this.$route.query.depart,
                dateRetour: "",
                isModalOpen: false,
                selectedModelId: "",
                selectedModelName: "",
                    request : {
                        dateDepart: this.$route.query.depart,
                        dateRetour: this.$route.query.retour,
                        modeleVehicule: '',
                        id: '',
                        message: ''
                    }
            }
        }, 
        components: {
            VehiclePresentationComponent
        },
        methods: {
            async fetchAvailableVehicles() {
                const url = `https://localhost:7045/api/vehicles/GetAvailableVehicles?departureDate=${this.$route.query.depart}&returnDate=${this.$route.query.retour}`
                const response = await fetch(url);
                this.availableVehicles = await response.json()
                console.log("this.availableVehicles : ", this.availableVehicles)
                this.dateDepart = new Date(this.$route.query.depart).toLocaleDateString('fr')
                this.dateRetour = new Date(this.$route.query.retour).toLocaleDateString('fr')
                
               
            },
            openContactModal(id, modelName) {
                this.isModalOpen = true;
                this.selectedModelId = id
                this.selectedModelName = modelName
                console.log("e.target : ", id)
               
            },
            closeContactModal() {
                this.isModalOpen = false;
                this.selectedModel = "";
                console.log("this.isModalOpen : ", this.isModalOpen)
            }
        },
        created() {
            this.fetchAvailableVehicles();
        }
       
    }
</script>
<style>
    .container {
        display: flex;
        justify-content: center;
        padding: 20px;
    }
    .contact-modal {
        background-color: white;
        height: 75vh;
        width: 75vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 2;
        background-color: rgba(0,0,0,0.8);
        overflow: hidden;
    }
    #message{
        width: 60%;
    }
</style>
