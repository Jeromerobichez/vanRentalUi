<script >
    import { RouterLink, RouterView } from 'vue-router'
    import { supabase } from '@/supabase'
    import VanFooter from '@/components/VanFooter.vue'
    export default {
        data() {
            return {
                user: ""
            }
        },
        components: {
            VanFooter
        },
        async created() {
            const { data: { user } } = await supabase.auth.getUser()
            this.user=user
        }
    }
</script>

<template>
    <header>

        <ul class="navbar">
            <li><RouterLink :to="{name: 'home'}">Retour Home</RouterLink></li>
            <li><RouterLink :to="{name: 'AvailableVehiclesForRent'}">Véhicules disponibles</RouterLink></li>
            <li><RouterLink :to="{name: 'VehiclesPresentation'}">Nos véhicules</RouterLink></li>
            <li v-if="user"><RouterLink :to="{name: 'AdministrationHome'}"> Administration</RouterLink></li>


        </ul>
    </header>
    <container class="container-general">
        <RouterView />
    </container>
   
    <VanFooter />
</template>
<style>
    .container-general{
       display: flex;
       justify-content: center;
       padding: 20px;
    }
    header {
        position: relative;
    }
    a:hover {
        background-color: none !important;
    }
        li {
        list-style: none;
        padding: 5px;
        color: white;

    }
    li a {
        color: white;

    }
        li a:hover {
            color: #f25822;
         
        }

    .navbar {
        display: flex;
        background-color: #004042;
        width: 100%;
        height: 50px;
        align-items: center;
        position: sticky;
    }
</style>

