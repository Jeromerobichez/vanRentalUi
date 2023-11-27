<template>
    <div class="modal-overlay"
         v-if="myModalIsOpen"
         @click="closeMyModal">
    </div>

    <h2 class="card-vehicle-h2-large">{{modelData.name}}</h2>
    <div class="card-vehicle" @click="openMyModal">

        
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
    <div class="contact-modal" v-if="myModalIsOpen">
       
        <form class="form-container" method="post">
            <div class="column-container">
                <div class="column-label">
                    <label for="dateDepart">Date de départ :</label>
                    <label for="dateRetour">Date de retour :</label>
                    <label for="modeleVehicule">Modèle de véhicule :</label>
                    <label for="ClientName"> Votre nom : </label>
                    <label for="ClientEmail"> Votre email : </label>
                    <label for="ClientTel"> Votre téléphone : </label>
                    <label for="message">Message :</label>
                </div>
                <div class="column-inputs">
                    <input type="date" id="dateDepart" name="dateDepart" v-model="requestRental.DepartureDateRequested" required>
                    <input type="date" id="dateRetour" name="dateRetour" v-model="requestRental.ReturnDateRequested" required>
                    <input type="text" id="modeleVehicule" name="modeleVehicule" v-model="requestRental.ModelVehicleRequested" required>
                    <input type="text" id="clientName" name="clientName" v-model="requestRental.ClientName" required />
                    <input type="text" id="ClientEmail" name="ClientEmail" v-model="requestRental.ClientEmail" required />
                    <input type="text" id="ClientTel" name="ClientTel" v-model="requestRental.ClientTel" />
                    <textarea v-model="requestRental.MessageRequest" id="message-contact" name="message" rows="10" cols="20"></textarea>
                </div>
            </div>
          
            <div class="fields">
              
             
            </div>
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
                    ClientName: this.modelData.ClientName,
                    ClientEmail: this.modelData.ClientEmail,
                    ClientTel: this.modelData.ClientTel,
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
    }
</script>
<style scoped>
    .column-container{
        display: flex;
        gap: 40px;
    }
    .column-label{
        display: flex;
        flex-direction: column;
        width: 200px !important;
    }
    .column-inputs{
        width: 150px;
    }
    .fields {
        display: flex;
    }
    .form-container {
        display: flex;
        flex-direction: column;
    }
    .card-vehcile-img {
        max-height: 200px;
    }
    .contact-modal {
        background-color: #3198b9;
        height: 75vh;
        width: 75vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid black;
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
    input{
        width: 200px;
       margin-bottom: 10px;
    }
    label{
        margin-bottom: 10px;
    }
    textarea {
        width: 200px;
    }
</style>
