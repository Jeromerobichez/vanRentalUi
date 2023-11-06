<template>
    <div v-if="modelsData" v-for="model in modelsData" class="card-vehicle">
        <div class="card-vehcile-text">
            <h2>{{model.name}} </h2>
            <p> Nombre de place : {{model.pax}}</p>
            <p> Contenance du réservoir : {{model.gasTank}}</p>
            <p> Prix par jour : {{model.pricePerDay}}</p>
        </div>
        <div class="card-vehcile-div-image">
            <img class="card-vehcile-img" :src="model.pictureUrl" />
        </div>


    </div>
</template>
<script>
  
    export default {
        data() {
            return {
            }
        },
        props: {
            modelsData: Array
        }
       
    }
</script>
<style scoped>
</style>
