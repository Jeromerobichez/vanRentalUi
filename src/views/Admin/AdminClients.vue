<template>
    <div class="">
        <h1>Adminsitration des CLIENTS</h1>
        <button class="create-button" @click="handleCreate"> Créer un nouveau client </button>
        <AdminTable :columns="clientsColumns" :items="clientsList" :openEditModal="editClient" :handleDelete="handleDelete" />

        <div v-if="isOverlayOpen" class="modal-overlay" @click="closeModal"></div>
        <div v-if="isEditModalOpen" class="edit-modal">
            <EditForm :fields="clientFields" :formData="formData" :submitForm="submitForm" />
        </div>
        <div class="deleteModal" v-if="deleteModal">
            <h2> Vous etes sur le point de supprimer le client dont l'id est : {{idToDelete}} </h2>
            <p> Etes vous sur ce choix ? </p>
            <button @click="deleteConfirmation(idToDelete)"> Confirmer la suppression</button>
        </div>
        <div class="createModal" v-if="createModalIsOpen">
            <EditForm :fields="createClientFields" :formData="newClient" :submitForm="postNewClient" dataType="du client" />
        </div>
    </div>
</template>
<script>
    import EditForm from '@/components/EditForm.vue'
    import AdminTable from '@/components/AdminTable.vue'
    export default {
        data() {
            return {
                clientsList: [],
                clientsColumns: [],
                idToDelete: "",
                deleteModal: false,
                createModalIsOpen: false,
                fields: {},
                formData: {},
                newClient: {},
                isEditModalOpen: false,
                isOverlayOpen: false,
                clientFields: {   
                    Id: { type: 'hidden', label: 'ID' },
                    Lastname: { type: 'text', label: 'Nom' },
                    Firstname: { type: 'text', label: 'Prénom' },
                    Tel: { type: 'text', label: 'telephone' },
                    Mail: { type: 'email', label: 'email' },
                },
                createClientFields: {
                    Lastname: { type: 'text', label: 'Nom' },
                    Firstname: { type: 'text', label: 'Prénom' },
                    Tel: { type: 'text', label: 'telephone' },
                    Mail: { type: 'email', label: 'email' },
                },
            }
        },
        components: {
            EditForm,
            AdminTable
        },
        methods: {
            async fectchAllClients() {
                const url = 'https://localhost:7045/api/clients/GetAllClients'
                const allClients = await fetch(url)
                this.clientsList = await allClients.json()

                this.clientsColumns = Object.keys(this.clientsList[0])


            },
            handleDelete(id) {

                console.log("deleted id : ", id)
                this.idToDelete = id
                this.deleteModal = true;
                this.isOverlayOpen = true;
            },
            handleCreate() {
                console.log('click')
                this.createModalIsOpen = true;
                this.isOverlayOpen = true;
                

            },
            async editClient(index) {
                this.formData.Id = this.clientsList[index].id
                this.formData.Lastname = this.clientsList[index].lastname
                this.formData.Firstname = this.clientsList[index].firstname
                this.formData.Tel = this.clientsList[index].tel
                this.formData.Mail = this.clientsList[index].mail

                this.isEditModalOpen = true;
                this.isOverlayOpen = true;
            },
            overlayClick() {
                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.deleteModal = false;
            },
            async submitForm(dataToSend) {
                const url = 'https://localhost:7045/api/clients/UpdateAClient'
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                if (response.ok) {
                    this.closeModal()
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
            async postNewClient(newClient) {
                const url = 'https://localhost:7045/api/clients/PostNewClient'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newClient)
                })
                console.log("response : ", response)
                if (response.ok) {
                    console.log("nouveau client crée avec succès !")
                    this.closeModal();
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            },
            closeModal() {

                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.deleteModal = false;
                this.createModalIsOpen = false;
                this.fectchAllClients();
            },
            async deleteConfirmation(id) {
                const url = `https://localhost:7045/api/clients/DeleteAClient?id=${id}`
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                console.log("response : ", response)
                if (response.ok) {
                    console.log(" client supprimé avec succès !")
                    this.closeModal();
                } else {

                    console.error('Échec de la requête : ' + response.status);
                }
            }
        },
        mounted() {
            this.fectchAllClients();
        },
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
