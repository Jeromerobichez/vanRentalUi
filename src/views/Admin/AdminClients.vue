<template>
    <div class="">
        <h1>Adminsitration des CLIENTS</h1>
       <!--<table border="1">
            <tr>
                <th>id</th>
                <th>lastname</th>
                <th>firstname</th>
                <th>tel</th>
                <th>mail</th>
                <th>éditer</th>
                <th>supprimer</th>
            </tr>

            <tr v-for="(client, index) in clientsList">
                <td> {{client.id }} </td>
                <td> {{client.lastname }} </td>
                <td> {{client.firstname}} </td>
                <td> {{ client.tel}} </td>
                <td> {{client.mail }} </td>
                <td> <img @click="editClient(index)" height="20" src="@/assets/editer.png" /> </td>
                <td> <img height="20" src="@/assets/supprimer.png" /> </td>
            </tr>
        </table>-->
        <AdminTable :columns="clientsColumns" :items="clientsList" />
        <div v-if="isOverlayOpen" class="modal-overlay" @click="overlayClick"></div>
       <div v-if="isEditModalOpen" class="edit-modal">
           <EditForm :fields="clientFields" :formData="formData" :submitForm="submitForm"  />
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
                fields: {},
                formData: {},
                isEditModalOpen: false,
                isOverlayOpen: false,
                clientFields: {   
                    Id: { type: 'text', label: 'ID' },
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
                this.isOverlayOpen= false
            },
            async submitForm(dataToSend) {
                console.log("dataToSend in submitForm :: ", dataToSend)
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
            closeModal() {

                this.isEditModalOpen = false;
                this.isOverlayOpen = false;
                this.fectchAllClients();
            },
        },
        mounted() {
            this.fectchAllClients();
        },
    }
</script>
<style>
    .edit-modal {
        background-color: white;
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
