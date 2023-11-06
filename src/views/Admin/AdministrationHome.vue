<template>
    <div class="">
        <h1>Tableau de bord de la partie admin </h1>
        <ul>
            <li>
                <RouterLink :to="{name: 'AdminRentals'}"> Voir toutes les réservation</RouterLink>
            </li>
            <li>
                <RouterLink :to="{name: 'AdminVehicles'}"> Voir tous les véhicules</RouterLink>
            </li>
            <li>
                <RouterLink :to="{name: 'AdminClients'}"> Voir tous les clients</RouterLink>
            </li>
        </ul>
    </div>
</template>
<script>
    import { RouterLink, RouterView } from 'vue-router'
</script>
<style>

</style>
