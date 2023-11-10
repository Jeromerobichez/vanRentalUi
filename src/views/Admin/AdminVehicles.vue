<template>
    <div class="">
        <h1>Administration des VEHICULES</h1>
        <!--<table border="1">
        <tr>
            <th>id</th>
            <th>name</th>
            <th>km</th>
            <th>color_name</th>
            <th>automatic_gear</th>
            <th>hasBeenSold</th>
            <th>registration</th>
            <th>comments</th>
            <th>éditer</th>
            <th>supprimer</th>
        </tr>

        <tr v-for="(vehicle, index) in vehiclesList">
            <td> {{vehicle.id }} </td>
            <td> {{vehicle.name }} </td>
            <td> {{vehicle.km}} </td>
            <td> {{ vehicle.color_name}} </td>
            <td> {{vehicle.automatic_gear }} </td>
            <td> {{vehicle.hasBeenSold }} </td>
            <td> {{vehicle.registration_date }} </td>
            <td> {{vehicle.comments }} </td>
            <td> <img class="icone-editer" @click="handleEdit(index)" height="20" src="@/assets/editer.png" /> </td>
            <td> <img height="20" @click="handleDelete(vehicle.id)" src="@/assets/supprimer.png" /> </td>


        </tr>
    </table>-->

        <AdminTable :columns="vehiclesColumns" :items="vehiclesList" :openEditModal="editVehicle" :handleDelete="handleDelete" />

        <div v-if="isOverlayOpen" class="modal-overlay" @click="overlayClick"></div>
        <div v-if="isModalOpen" class="vehicle-modal">
            <EditForm :fields="vehicleFields" :formData="vehicle" :submitForm="submitForm" />
        </div>

        <!--<div class="contact-modal" v-if="isModalOpen">
        <form  method="post">
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" v-model="vehicle.id"><br><br>

            <label for="name">Nom:</label>
            <input type="text" id="name" name="name"  v-model="vehicle.name"><br><br>

            <label for="km">Kilométrage:</label>
            <input type="text" id="km" name="km" v-model="vehicle.km" ><br><br>

            <label for="color_name">Couleur:</label>
            <input type="text" id="color_name" name="color_name" v-model="vehicle.color_name"><br><br>

            <label for="automatic_gear">Boîte automatique:</label>
            <input type="checkbox" id="automatic_gear" name="automatic_gear" v-model="vehicle.automatic_gear"><br><br>

            <label for="hasBeenSold">Vendu:</label>
            <input type="checkbox" id="hasBeenSold" name="hasBeenSold" v-model="vehicle.hasBeenSold"><br><br>

            <label for="registration_date">Date d'enregistrement:</label>
            <input type="date" id="registration_date" name="registration_date" v-model="vehicle.registration_date"><br><br>

            <label for="comments">Commentaires:</label>
            <textarea  v-model="vehicle.comments" id="comments" name="comments">{{vehicle.comments}}</textarea><br><br>

            <input  @click="submitForm" type="submit" value="Soumettre la modification du véhicule">
        </form>
    </div>-->
        <div class="deleteModal" v-if="deleteModal">
            <h2> Vous etes sur le point de supprimer le véhicule dont l'id est {{deleteId}} </h2>
            <p> Etes vous sur ce choix ? </p>
            <button @click="suppression"> Confirmer la supprssion</button>
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
                deleteId: "",
                isModalOpen: false,
                deleteModal: false,
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
                
                this.isModalOpen = true
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
            handleDelete(id) {

                this.deleteId = id
                this.deleteModal = true;
                this.isOverlayOpen = true;
            },
            closeModal() {
                this.isModalOpen = false
                this.isOverlayOpen = false
                this.deleteModal = false;
            },
            overlayClick() {
                this.isModalOpen = false;
                this.isOverlayOpen = false;
                this.deleteModal= false;
            },
            async submitForm( dataToSend) {
               
                const url = "https://localhost:7045/api/vehicles/UpdateVehicle"
 
                dataToSend.Km = parseInt(dataToSend.Km)
  
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
            }
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
</style>
