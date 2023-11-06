<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
   
      <ul>
          <li><RouterLink :to="{name: 'home'}"> Retour Home </RouterLink></li>
          <li><RouterLink :to="{name: 'about'}"> A propos </RouterLink></li>
      </ul>
  </header>

  <RouterView />
</template>

<style scoped>
    #app{
        display: block;

    }
    header {
      
    }
</style>
