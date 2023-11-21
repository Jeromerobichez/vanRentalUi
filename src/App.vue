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

        <ul>
            <li><RouterLink :to="{name: 'home'}">Retour Home</RouterLink></li>
            <li><RouterLink :to="{name: 'AvailableVehiclesForRent'}">Véhicules disponibles</RouterLink></li>
            <li><RouterLink :to="{name: 'VehiclesPresentation'}">Nos véhicules</RouterLink></li>
            <li v-if="user"><RouterLink :to="{name: 'AdministrationHome'}"> Administration</RouterLink></li>


        </ul>
    </header>

    <RouterView />
    <VanFooter />
</template>

<style scoped>
    #app {
        display: block;
    }
    header {
      
    }
</style>
