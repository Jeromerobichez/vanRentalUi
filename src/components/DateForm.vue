<template>
    <form>
    <label for="dateDepart">Date de départ :</label>
    <input v-model="searchInputs.depart" type="date" id="dateDepart" name="dateDepart" placeholder="Saisissez la date de départ" required>

    <label for="dateRetour">Date de retour :</label>
    <input  v-model="searchInputs.retour" type="date" id="dateRetour" name="dateRetour" placeholder="Saisissez la date de retour" required>

    <input type="submit" value="Envoyer">
</form>
</template>
<script>
  
    export default {
        data() {
            return {
                searchInputs: {
                    depart: "",
                    retour: ""
                }    
            }
        },
        updated() {
            console.log("searchInputs : ", this.searchInputs)
        }
    }
</script>
<style scoped>
</style>
