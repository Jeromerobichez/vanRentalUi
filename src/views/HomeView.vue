

<template>
  <main>
<h1>Bienvenue sur le site de vanRental !</h1>
      <section class="hero-section">
          <h2 class="hero-h2"> Partir à l'aventure !</h2>
      </section>
      <DateForm />
  </main>
</template>
<script>
    import DateForm from '@/components/DateForm.vue';
    export default {
        data() {
            return {
            }
           
        },
        components: {
            DateForm
        },
        methods: {
            } 
        }
 
</script>
<style>
    .hero-section{
        height: 250px;
        background-image: url('@/assets/california-hero.jpg');
        background-size: 100%; 
    }
    .hero-h2{
        position: relative;
        top: 25px;
        left: 10px;
        color: white;
    }
</style>