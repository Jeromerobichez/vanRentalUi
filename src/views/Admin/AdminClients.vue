<template>
    <div class="">
        <h1>Adminsitration des CLIENTS</h1>
       <table border="1">
            <tr>
                <th>id</th>
                <th>lastname</th>
                <th>firstname</th>
                <th>tel</th>
                <th>mail</th>
                <th>éditer</th>
                <th>supprimer</th>
            </tr>

            <tr v-for="client in clientsList">
                <td> {{client.id }} </td>
                <td> {{client.lastname }} </td>
                <td> {{client.firstname}} </td>
                <td> {{ client.tel}} </td>
                <td> {{client.mail }} </td>
                <td> <img height="20" src="@/assets/editer.png" /> </td>
                <td> <img height="20" src="@/assets/supprimer.png" /> </td>


            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
               clientsList: []
            }
        },
        methods: {
            async fectchAllClients() {
                const url = 'https://localhost:7045/api/clients/GetAllClients'
                const allClients = await fetch(url)
                this.clientsList = await allClients.json()
            }
        },
        mounted() {
            this.fectchAllClients();
        }
    }
</script>
<style>

</style>
