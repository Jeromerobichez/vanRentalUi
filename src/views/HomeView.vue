

<template>
  <main>
<h1>Bienvenue sur le site de vanRental </h1>
      <section class="hero-section">
          <h2 class="hero-h2"> Partir à l'aventure !</h2>
      </section>
      <DateForm />
      <LoginComponent />
  </main>
</template>
<script>
    import DateForm from '@/components/DateForm.vue';
    import LoginComponent from '@/components/LoginComponent.vue';
    export default {
        data() {
            return {
            }
           
        },
        components: {
            DateForm,
            LoginComponent,
        },
        methods: {
            } 
        }
 
</script>
<style>
    h1{
        padding: 20px;
        text-align: center;
    }
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