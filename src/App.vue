<script >
    import { RouterLink, RouterView } from 'vue-router'
    import { supabase } from '@/supabase'
    export default {
        data() {
            return {
                user: ""
            }
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
</template>

<style scoped>
    #app {
        display: block;
    }
    header {
      
    }
</style>
