<template>
    <form>
    <label for="dateDepart">Date de départ :</label>
    <input v-model="dateDeDepart" type="date" id="dateDepart" name="dateDepart" placeholder="Saisissez la date de départ" required>

    <label for="dateRetour">Date de retour :</label>
    <input  v-model="dateDeRetour" type="date" id="dateRetour" name="dateRetour" placeholder="Saisissez la date de retour" required>

    <input type="submit" value="En route !" @click="redirectionToResultsPage">
</form>
</template>
<script>
  
    export default {
        data() {
            return {
               
                    dateDeDepart: "",
                    dateDeRetour: ""

               
            }
        },
        methods: {
            redirectionToResultsPage() {
                this.$router.push(`/vehicules-disponibles?depart=${this.dateDeDepart}&retour=${this.dateDeRetour}`)
            }
        },
        updated() {
         
        }
    }
</script>
<style scoped>
</style>
