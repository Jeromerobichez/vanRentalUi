<template>
    <div class="">
        <h1>Adminsitration des RESERVATIONS</h1>
        <button class="create-button" @click="handleCreate"> Créer une nouvelle location </button>
        <AdminTable :columns="rentalsColumns" :items="rentalsList" :openEditModal="editRental" :handleDelete="handleDelete" />
        <div v-if="isOverlayOpen" class="modal-overlay" @click="closeModal"></div>
        <div class="createModal" v-if="createModalIsOpen">
            <EditForm :fields="createRentalFields" :formData="newRental" :submitForm="postNewRental" dataType="de la Réservation" />
        </div>
        <div v-if="isEditModalOpen" class="edit-modal">
            <EditForm :fields="rentalFields" :formData="formData" :submitForm="submitForm" dataType="Client" />
        </div>
        <div class="deleteModal" v-if="deleteModal">
            <h2> Vous etes sur le point de supprimer la réservation dont l'id est : {{idToDelete}} </h2>
            <p> Etes vous sur ce choix ? </p>
            <button @click="deleteConfirmation(idToDelete)"> Confirmer la suppression</button>
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
                deleteModal: false,
                isEditModalOpen: false,
                createModalIsOpen: false,
                newRental: {},
                idToDelete: "",
                rentalFields: {
                    Id: { type: 'text', label: 'ID de la réservation' },
                    DepartureDate: { type: 'text', label: 'date de départ' },
                    ReturnDate: { type: 'text', label: 'date de retour' },
                    ClientId: { type: 'number', label: 'id client' },
                    VehicleId: { type: 'number', label: 'id du véhicule' },
                },
                createRentalFields: {
                 
                    DepartureDate: { type: 'date', label: 'date de départ' },
                    ReturnDate: { type: 'date', label: 'date de retour' },
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

                // J'ajoute une clé "id" à chaque objet du tableau pour l'utiliser lors de la suppression  (handleDelete prend "id" et pas "rental_id" en argument)
                this.rentalsList.forEach(e => e.id = e.rental_id)

            },
            openModal() {
                this.isEditModalOpen = true;
                this.isOverlayOpen = true;
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
            handleCreate() {
                console.log('click')
                this.createModalIsOpen = true;
                this.isOverlayOpen = true;


            },
            async postNewRental(newRental) {
                const url = 'https://localhost:7045/api/rentals/PostNewRental'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newRental)
                })
                console.log("response : ", response)
                if (response.ok) {
                    console.log("nouvelle réservation crée avec succès !")
                    this.closeModal();
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
            closeModal() {
                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.createModalIsOpen = false;
                this.deleteModal= false,
                this.fectchAllRentals();
            },
            handleDelete(id) {

                console.log("deleted id : ", id)
                this.idToDelete = id
                this.deleteModal = true;
                this.isOverlayOpen = true;
            },
            async deleteConfirmation(id) {

                const url = `https://localhost:7045/api/rentals/DeleteARental?id=${id}`
                    const response = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    console.log("response : ", response)
                    if (response.ok) {
                        console.log(" réservation supprimée avec succès !")
                        this.closeModal();
                    } else {

                        console.error('Échec de la requête : ' + response.status);
                    }
            }
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
        background-color: #2f803f;
        padding: 20px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
    }
</style>
