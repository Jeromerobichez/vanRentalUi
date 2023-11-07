<template>
    <div class="modal-overlay"
         v-if="myModalIsOpen"
         @click="closeMyModal">
    </div>
    <div class="card-vehicle" @click="openMyModal">
        <div class="card-vehcile-text">

            <h2>{{modelData.name}} </h2>
            <p> Nombre de place : {{modelData.pax}}</p>
            <p> Contenance du réservoir : {{modelData.gas_tank}}</p>
            <p> Prix par jour : {{modelData.price_per_day}}</p>
            <p> Prix total pour cette période : {{modelData.rentalPrice}}</p>
        </div>
        <div class="card-vehcile-div-image">
            <img class="card-vehcile-img" :src="modelData.picture_url" />
        </div>
    </div>
    <div class="contact-modal" v-if="myModalIsOpen">
        <form method="post">
            <label for="dateDepart">Date de départ :</label>
            <input type="date" id="dateDepart" name="dateDepart" v-model="requestRental.dateDepart" required><br><br>

            <label for="dateRetour">Date de retour :</label>
            <input type="date" id="dateRetour" name="dateRetour" :value="this.$route.query.retour" required><br><br>

            <label for="modeleVehicule">Modèle de véhicule :</label>
            <input type="text" id="modeleVehicule" name="modeleVehicule" v-model="requestRental.modeleVehicule" required><br><br>

            <input type="hidden" id="modelId" name="modelId" v-model="requestRental.id">

            <label for="message">Message :</label>
            <textarea v-model="requestRental.message" id="message" name="message" rows="10" cols="20"></textarea><br><br>

            <input type="submit" value="Envoyer">
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                myModalIsOpen: false,
                requestRental: {
                    dateDepart: this.$route.query.depart,
                    dateRetour: this.$route.query.retour,
                    modeleVehicule: this.modelData.name,
                    id: this.modelData.id,
                    message: ''
                }
            }
        },
        props: {
            modelData: Object
          
        },
        methods: {
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
            },
            openMyModal() {
                this.myModalIsOpen = true
            },
            closeMyModal() {
                this.myModalIsOpen = false
            }
        },
        mounted() {
            console.log("modelData : ", this.modelData)
        },
        updated() {
            console.log("REQUEST : ", this.requestRental)
        }
    }
</script>
<style scoped>
    .card-vehcile-img {
        max-height: 200px;
    }
    .contact-modal {
        background-color: red;
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
</style>
