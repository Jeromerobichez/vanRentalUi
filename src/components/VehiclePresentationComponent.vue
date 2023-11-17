<template>
    <div class="modal-overlay"
         v-if="myModalIsOpen"
         @click="closeMyModal">
    </div>

    <h2 class="card-vehicle-h2-large">{{modelData.name}}</h2>
    <div class="card-vehicle" @click="openMyModal">

        <div class="">
            <div class="card-vehcile-text">

                <h2 class="card-vehicle-h2-small">{{modelData.name}} </h2>
                <p> Nombre de place : {{modelData.pax}}</p>
                <p> Contenance du réservoir : {{modelData.gas_tank}}</p>
                <p> Prix par jour : {{modelData.price_per_day}}</p>
                <p> Prix total pour cette période : {{modelData.rentalPrice}}</p>
            </div>
            <div class="card-vehcile-div-image">
                <img class="card-vehcile-img" :src="modelData.picture_url" />
            </div>
        </div>
    </div>
    <div class="contact-modal" v-if="myModalIsOpen">
        <form method="post">
            <label for="dateDepart">Date de départ :</label>
            <input type="date" id="dateDepart" name="dateDepart" v-model="requestRental.DepartureDateRequested" required><br><br>

            <label for="dateRetour">Date de retour :</label>
            <input type="date" id="dateRetour" name="dateRetour" v-model="requestRental.ReturnDateRequested" required><br><br>

            <label for="modeleVehicule">Modèle de véhicule :</label>
            <input type="text" id="modeleVehicule" name="modeleVehicule" v-model="requestRental.ModelVehicleRequested" required><br><br>

            <input type="hidden" id="modelId" name="modelId" v-model="requestRental.ModelId">

            <label for="message">Message :</label>
            <textarea v-model="requestRental.MessageRequest" id="message" name="message" rows="10" cols="20"></textarea><br><br>

            <input @click="sendRequestRental" type="submit" value="Envoyer">
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                myModalIsOpen: false,
                requestRental: {
                    DepartureDateRequested: this.$route.query.depart,
                    ReturnDateRequested: this.$route.query.retour,
                    ModelVehicleRequested: this.modelData.name,
                    ModelId: this.modelData.id,
                    MessageRequest: ''
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
            },
            async sendRequestRental(e) {
                e.preventDefault();
                try {
                    const response = await fetch('https://localhost:7045/api/request/SendRentalRequest', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.requestRental)
                    });

                    if (response.ok) {

                        console.log("succès de la requète : ", response); 
                    } else {

                        console.error('Échec de la requête : ' + response.status);
                    }
                }
                    catch (error) {
                        console.error('Échec de la requête : ' + error);
                }
                this.myModalIsOpen = false;

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
