<template>
    <div >
        <form class="form-div">
            <div class="form-fields">
                <label for="dateDepart">Date de départ :</label>
                <input v-model="dateDeDepart" type="date" id="dateDepart" name="dateDepart" placeholder="Saisissez la date de départ" required>
            </div>
            <div class="form-fields">
                <label for="dateRetour">Date de retour :</label>
                <input v-model="dateDeRetour" type="date" id="dateRetour" name="dateRetour" placeholder="Saisissez la date de retour" required>
            </div>
            <input class="submit-button form-fields" type="submit" value="En route !" @click="redirectionToResultsPage">
        </form>
    </div>
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
    /*  bleu foncé : #004042
        bleu clair : #3198b9
        orange: #f25822
        orange clair : #f7953e
        jaune: #f3c309
        violet : #97aeda
    */
    .form-div{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        border-radius: 8px;
        padding: 15px;
        background-image: url('src/assets/van-jaune.jpg');
        background-position: bottom;
        height: 500px;
    }
    .form-fields {
        margin: 15px;
    }
    label{

        margin: 5px;
        font-weight: 700;
    }
    input{
        cursor: pointer;
    }
    .submit-button {
        width: 200px;
        padding: 10px;
        background-color: #3198b9;
        border-radius: 8px;
        border: 1px solid black;
        
    }
        .submit-button:hover {
            background-color: #004042;
            transition: ease-in-out 0.5s;
            cursor: pointer;
        }
</style>
