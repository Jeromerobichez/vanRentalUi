<template>
    <div class="">
        <h1>Administration des VEHICULES</h1>
        <table border="1">
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
                <td> <img height="20" src="@/assets/supprimer.png" /> </td>


            </tr>
        </table>
        <div class="contact-modal" v-if="isModalOpen">
            <form  method="post">
                <label for="id">ID:</label>
                <input type="text" id="id" name="id" v-model="vehicle.Id"><br><br>

                <label for="name">Nom:</label>
                <input type="text" id="name" name="name"  v-model="vehicle.name"><br><br>

                <label for="km">Kilométrage:</label>
                <input type="text" id="km" name="km" v-model="vehicle.Km" ><br><br>

                <label for="color_name">Couleur:</label>
                <input type="text" id="color_name" name="color_name" v-model="vehicle.color_name"><br><br>

                <label for="automatic_gear">Boîte automatique:</label>
                <input type="checkbox" id="automatic_gear" name="automatic_gear" v-model="vehicle.AutomaticGear"><br><br>

                <label for="hasBeenSold">Vendu:</label>
                <input type="checkbox" id="hasBeenSold" name="hasBeenSold" v-model="vehicle.hasBeenSold"><br><br>

                <label for="registration_date">Date d'enregistrement:</label>
                <input type="text" id="registration_date" name="registration_date" v-model="vehicle.RegistrationDate"><br><br>

                <label for="comments">Commentaires:</label>
                <textarea  v-model="vehicle.Comments" id="comments" name="comments">{{vehicle.comments}}</textarea><br><br>

                <input  @click="submitForm" type="submit" value="Soumettre la modification du véhicule">
            </form>
        </div>
        <div class="modal-overlay"
             v-if="isModalOpen"
             @click="closeModal">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                vehiclesList: [],
                vehicle: {
                    Id: "",
                    name: "",
                    Km: "",
                    color_name: "",
                    AutomaticGear: "",
                    HasBeenSold: "",
                    RegistrationDate: "",
                    Comments: "",
                },
            isModalOpen: false
            }
        },
        methods: {
          async fectchAllVehicles() {
                const url = 'https://localhost:7045/api/vehicles/GetAllVehicles'
                const allVehicles = await fetch(url)
                this.vehiclesList = await allVehicles.json()
                console.log("this.vehiclesList :: ", this.vehiclesList)
            },
            handleEdit(index) {
                
                this.isModalOpen = true
  
                this.vehicle.Id = this.vehiclesList[index].id  
                this.vehicle.AutomaticGear = this.vehiclesList[index].automatic_gear
                this.vehicle.HasBeenSold = this.vehiclesList[index].hasBeenSold
                this.vehicle.RegistrationDate = this.vehiclesList[index].registration_date
                this.vehicle.Comments = this.vehiclesList[index].comments
                this.vehicle.ModelId = this.vehiclesList[index].model_id
                this.vehicle.ColorId = this.vehiclesList[index].color_id
            },
            closeModal() {
                this.isModalOpen = false
            },
            async submitForm(e) {
                e.preventDefault();
                const url = "https://localhost:7045/api/vehicles/UpdateVehicle"
             
                const dataToSend = {
                    Id: this.vehicle.Id,
                    RegistrationDate: this.vehicle.RegistrationDate,
                    Km: parseInt(this.vehicle.Km),
                    AutomaticGear: this.vehicle.AutomaticGear,
                    HasBeenSold: this.vehicle.HasBeenSold,
                    Comments: this.vehicle.Comments,
                    ModelId: this.vehicle.ModelId,
                    ColorId: this.vehicle.ColorId,
                }
          
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                if (response.ok) {

                    console.log("succès de la requète : ", response);
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            }
        },
        mounted() {
            this.fectchAllVehicles();
        }
    }
</script>
<style>
    .icone-editer{
        cursor: pointer;
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
