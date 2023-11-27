<template>
    <div class="">
        <h1>Administration des VEHICULES</h1>

        <button class="create-button" @click="handleCreate"> Créer un nouveau véhicule </button>
        <AdminTable :columns="vehiclesColumns" :items="vehiclesList" :openEditModal="editVehicle" :handleDelete="handleDelete" />

        <div v-if="isOverlayOpen" class="modal-overlay" @click="closeModal"></div>
        <div class="createModal" v-if="createModalIsOpen">
            <EditForm :fields="createVehicleFields" :formData="newVehicle" :submitForm="postNewVehicle" dataType="du véhicule" />
        </div>
        <div v-if="isEditModalOpen" class="vehicle-modal">
            <EditForm :fields="vehicleFields" :formData="vehicle" :submitForm="updateVehicle" dataType="Véhicule" />
        </div>


        <div class="deleteModal" v-if="deleteModal">
            <h2> Vous etes sur le point de supprimer le véhicule dont l'id est {{idToDelete}} </h2>
            <p> Etes vous sur ce choix ? </p>
            <button class="delete-button" @click="deleteConfirmation()"> Confirmer la supprssion</button>
        </div>
        <!--<div class="modal-overlay"
         v-if="isOverlayOpen"
         @click="closeModal">
    </div>-->
    </div>
</template>
<script>
    import EditForm from '@/components/EditForm.vue'
    import AdminTable from '@/components/AdminTable.vue'
    export default {
        data() {
            return {
                vehiclesList: [],
                vehiclesColumns: [],
                vehicle: {
                },
                formData: {},
                idToDelete: "",
                isEditModalOpen: false,
                createModalIsOpen: false,
                deleteModal: false,
                newVehicle: {}, // objet vide dans lequel on va stocker les informations du nouveau véhicule à créer
                isOverlayOpen: false,
                vehicleFields: {
                    Id: { type: 'number', label: 'Id' },
                    RegistrationDate: { type: 'date', label: 'Date d\'immatriculation' },
                    Km: { type: 'text', label: 'Kilométrage :' },
                    AutomaticGear: { type: 'checkbox', label: 'Boite de vitesse automatique ' },
                    HasBeenSold: { type: 'checkbox', label: 'Vendu ? :' },
                    Comments: { type: 'textarea', label: 'Commentaires : ' },
                    ModelId: { type: 'hidden', label: 'ModelId' },
                    ColorId: { type: 'hidden', label: 'ColorId' },
                },
                createVehicleFields: {
                   
                    RegistrationDate: { type: 'date', label: 'Date d\'immatriculation' },
                    Km: { type: 'text', label: 'Kilométrage :' },
                    AutomaticGear: { type: 'checkbox', label: 'Boite de vitesse automatique ' },
                    HasBeenSold: { type: 'checkbox', label: 'Vendu ? :' },
                    Comments: { type: 'textarea', label: 'Commentaires : ' },
                    ModelId: { type: 'hidden', label: 'ModelId' },
                    ColorId: { type: 'hidden', label: 'ColorId' },
                },
            }
        },
        components: {
            EditForm,
            AdminTable
        },
        methods: {
          async fectchAllVehicles() {
                const url = 'https://localhost:7045/api/vehicles/GetAllVehicles'
                const allVehicles = await fetch(url)
                this.vehiclesList = await allVehicles.json()
                this.vehiclesColumns = [
                    "id",
                    "km",
                    "registration_date",
                    "automatic_gear",
                    "color_name",
                    'comments',
                    "hasBeenSold",
                    "name",

 ]
            },
            editVehicle(index) {
                
                this.isEditModalOpen = true
                this.isOverlayOpen = true
  
                this.vehicle = {
                    Id: this.vehiclesList[index].id,
                    RegistrationDate: this.vehiclesList[index].registration_date.split('T')[0],
                    Km: parseInt(this.vehiclesList[index].km),
                    AutomaticGear: this.vehiclesList[index].automatic_gear,
                    HasBeenSold: this.vehiclesList[index].hasBeenSold,
                    Comments: this.vehiclesList[index].comments,
                    ModelId: this.vehiclesList[index].model_id,
                    ColorId: this.vehiclesList[index].color_id,
                }
             
            },
            handleCreate() {
                console.log('click')
                this.createModalIsOpen = true;
                this.isOverlayOpen = true;


            },
            handleDelete(id) {

                this.idToDelete = id
                this.deleteModal = true;
                this.isOverlayOpen = true;
            },
            overlayClick() {
                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.deleteModal= false;
            },
            async updateVehicle(dataToSend) {
               
                const url = "https://localhost:7045/api/vehicles/UpdateVehicle"
 
                dataToSend.Km = parseInt(dataToSend.Km)
                dataToSend.ColorId = parseInt(dataToSend.ColorId)
                dataToSend.ModelId = parseInt(dataToSend.ModelId)
  
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                if (response.ok) {

                    console.log("succès de la requète : ", response);
                    this.closeModal()
                    this.fectchAllVehicles()
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
            async postNewVehicle(newVehicle) {
                newVehicle.Km =  parseInt(newVehicle.Km);
                newVehicle.ModelId =  parseInt(newVehicle.ModelId)
                newVehicle.ColorId = parseInt(newVehicle.ColorId)

                const url = 'https://localhost:7045/api/vehicles/PostNewVehicle'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newVehicle)
                })
                console.log("response : ", response)
                if (response.ok) {
                    console.log("nouveau véhicule crée avec succès !")
                    this.closeModal();
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
             async deleteConfirmation(id) {
                const url = `https://localhost:7045/api/vehicles/DeleteAVehicle?id=${id}`
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                console.log("response : ", response)
                if (response.ok) {
                    console.log(" Véhicule supprimé avec succès !")
                    this.closeModal();
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
            closeModal() {
                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.createModalIsOpen = false;
                this.deleteModal = false,
                    this.fectchAllVehicles()
            },
        },
         created() {
             this.fectchAllVehicles();
        }
    }
</script>
<style>
    .icone-editer{
        cursor: pointer;
    }
    .vehicle-modal {
        background-color: green;
        height: 75vh;
        width: 75vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
        padding: 20px;
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
    .deleteModal {
        background-color: #f3c309;
        border: 1px solid black;
        padding: 20px;
        border-radius: 8px;
        height: 50vh;
        width: 50vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
    }
    .create-button {
        background-color: #2f803f;
        padding: 20px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .delete-button {
        width: 200px;
        background-color: #f25822;
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>
