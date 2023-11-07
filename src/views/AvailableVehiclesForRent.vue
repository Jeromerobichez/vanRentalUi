<template>
    <div class="">
        <h1>Page ou apparaissent les véhicules aux dates demandées</h1>
        <p>
            Nous avons {{availableVehicles.modelsAvailable.length}} modèle(s) de véhicule disponible du <strong>{{dateDepart}}</strong> au <strong>{{dateRetour}}</strong>
        </p>
        <!--<VehiclePresentationComponent v-if="modelsData" modelData="availableVehicles.modelsAvailable" />-->
        <div class="contact-modal" v-if="isModalOpen">
            <form method="post">
                <label for="dateDepart">Date de départ :</label>
                <input type="date" id="dateDepart" name="dateDepart" :value="this.$route.query.depart" required><br><br>

                <label for="dateRetour">Date de retour :</label>
                <input type="date" id="dateRetour" name="dateRetour" :value="this.$route.query.retour" required><br><br>

                <label for="modeleVehicule">Modèle de véhicule :</label>
                <input type="text" id="modeleVehicule" name="modeleVehicule" :value="selectedModelName" required><br><br>

                <input type="hidden" id="modelId" name="modelId" :value="selectedModelId">

                <label for="message">Message :</label>
                <textarea id="message" name="message" rows="4" required></textarea><br><br>

                <input type="submit" value="Envoyer">
            </form>
        </div>

        <div class="modal-overlay"
             v-if="isModalOpen"
             @click="closeContactModal">
        </div>

        <div class="card-vehicle"
             v-if="availableVehicles"
             v-for="model in availableVehicles.modelsAvailable"
             
             @click="openContactModal(model.id, model.name)"
           >
            <div class="card-vehcile-text">
                <h2>{{model.name }} </h2>
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
                dateRetour: "",
                isModalOpen: false,
                selectedModelId: "",
                selectedModelName: ""
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
    .contact-modal {
        background-color: white;
        height: 75vh;
        width: 75vh;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
    }
    .modal-overlay{
        position: absolute;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 2;
        background-color: rgba(0,0,0,0.8);
    }
</style>
