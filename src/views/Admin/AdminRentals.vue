<template>
    <div class="">
        <h1>Adminsitration des RESERVATIONS</h1>
        <!--<table border="1">
        <tr>
            <th>id</th>
            <th>departure_date</th>
            <th>return_date</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>model</th>
            <th>éditer</th>
            <th>supprimer</th>
        </tr>

        <tr v-for="rental in rentalsList">
            <td> {{rental.rental_id }} </td>
            <td> {{rental.departure_date }} </td>
            <td> {{rental.return_date}} </td>
            <td> {{rental.firstname}} </td>
            <td> {{rental.lastname}} </td>
            <td> {{rental.name }} </td>
            <td> <img height="20" src="@/assets/editer.png" /> </td>
            <td> <img height="20" src="@/assets/supprimer.png" /> </td>


        </tr>
    </table>-->
        <AdminTable :columns="rentalsColumns" :items="rentalsList" :openEditModal="editRental" />
        <div v-if="isOverlayOpen" class="modal-overlay" @click="overlayClick"></div>
        <div class="createModal" v-if="createModalIsOpen">
            <EditForm :fields="createClientFields" :formData="newClient" :submitForm="postNewClient" dataType="Client" />
        </div>
        <div v-if="isEditModalOpen" class="edit-modal">
            <EditForm :fields="rentalFields" :formData="formData" :submitForm="submitForm" dataType="Client"  />
        </div>
        <div class="deleteModal" v-if="deleteModal">
            <h2> Vous etes sur le point de supprimer le client dont l'id est : {{idToDelete}} </h2>
            <p> Etes vous sur ce choix ? </p>
            <button @click="confirmSuppression"> Confirmer la suppression</button>
        </div>
    </div>
</template>

<script>
    import EditForm from '@/components/EditForm.vue'
    import AdminTable from '@/components/AdminTable.vue'
    export default {
        data() {
            return {
                rentalsList: [],
                rentalsColumns: ["rental_id","client_id", "departure_date", "return_date", "firstname", "lastname", "vehicle_id","name"],
                isModalOpen: false,
                isOverlayOpen: false,
                formData: {},
                isEditModalOpen: false,
                rentalFields: {
                    Id: { type: 'text', label: 'ID de la réservation' },
                    DepartureDate: { type: 'text', label: 'date de départ' },
                    ReturnDate: { type: 'text', label: 'date de retour' },
                    ClientId: { type: 'number', label: 'id client' },
                    VehicleId: { type: 'number', label: 'id du véhicule' },
                },
            }
        },
        components: {
            EditForm, 
            AdminTable,
        },
        methods: {
            async fectchAllRentals() {
                const url = 'https://localhost:7045/api/rentals/GetAllRentals'
                const allRentals = await fetch(url)
                this.rentalsList = await allRentals.json();
                console.log(" rentalsList => ", this.rentalsList)

            },
            openModal() {
                this.isEditModalOpen = true;
                this.isOverlayOpen = true;
            },
            overlayClick() {
                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.deleteModal = false;
            },
            async editRental(index) {
                this.formData.Id = parseInt(this.rentalsList[index].rental_id)
                this.formData.DepartureDate = this.rentalsList[index].departure_date
                this.formData.ReturnDate = this.rentalsList[index].return_date
                this.formData.ClientId = parseInt(this.rentalsList[index].client_id)
                this.formData.VehicleId = parseInt(this.rentalsList[index].vehicle_id)

                this.isEditModalOpen = true;
                this.isOverlayOpen = true;
            },
            async submitForm(dataToSend) {
                const url = 'https://localhost:7045/api/rentals/UpdateARental'
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                if (response.ok) {
                    this.closeModal();
                   
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
            closeModal() {
                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.fectchAllRentals();
            },
        },
        mounted() {
            this.fectchAllRentals();
          
        }
    }
</script>
<style>
    .edit-modal {
        background-color: pink;
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

    .createModal {
        background-color: chartreuse;
        height: 75vh;
        width: 75vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
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

    .create-button {
        background-color: green;
        padding: 20px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
    }
</style>
