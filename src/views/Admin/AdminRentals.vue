<template>
    <div class="">
        <h1>Adminsitration des RESERVATIONS</h1>
        <table border="1">
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
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               rentalsList: []
            }
        },
        methods: {
            async fectchAllRentals() {
                const url = 'https://localhost:7045/api/rentals/GetAllRentals'
                const allRentals = await fetch(url)
                this.rentalsList = await allRentals.json();

            }
        },
        mounted() {
            this.fectchAllRentals();
        }
    }
</script>
<style>

</style>
