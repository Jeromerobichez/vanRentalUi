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
               
            <tr v-for="vehicle in vehiclesList">
                <td> {{vehicle.id }} </td>
                <td> {{vehicle.name }} </td>
                <td> {{vehicle.km}} </td>
                <td> {{ vehicle.color_name}} </td>
                <td> {{vehicle.automatic_gear }} </td>
                <td> {{vehicle.hasBeenSold }} </td>
                <td> {{vehicle.registration_date }} </td>
                <td> {{vehicle.comments }} </td>
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
                vehiclesList: []
            }
        },
        methods: {
          async fectchAllVehicles() {
                const url = 'https://localhost:7045/api/vehicles/GetAllVehicles'
                const allVehicles = await fetch(url)
                this.vehiclesList = await allVehicles.json()
            }
        },
        mounted() {
            this.fectchAllVehicles();
        }
    }
</script>
<style>

</style>
