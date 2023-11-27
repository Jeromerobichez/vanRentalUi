<template>
    <div class="">
        <h1>Tableau de bord de la partie admin </h1>
        <ul>
            <li class="admin-li">
                <RouterLink class="admin-li" :to="{name: 'AdminRentals'}"> Voir toutes les réservation</RouterLink>
            </li>
            <li class="admin-li">
                <RouterLink class="admin-li" :to="{name: 'AdminVehicles'}"> Voir tous les véhicules</RouterLink>
            </li>
            <li class="admin-li">
                <RouterLink class="admin-li" :to="{name: 'AdminClients'}"> Voir tous les clients</RouterLink>
            </li>
        </ul>
    </div>
</template>
<script>
    import { RouterLink, RouterView } from 'vue-router'
</script>
<style>
    .admin-li{
        color: black;
    }
</style>
