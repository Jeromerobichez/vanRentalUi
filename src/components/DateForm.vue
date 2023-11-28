<template>
    <div class="form-div" >
        <h2> N'hésitez plus partez à l'aventure !</h2>
        <form >
            <div class="form-fields">
                <label for="dateDepart">Date de départ :</label>
                <input 
                       v-model="dateDeDepart"
                       type="date"
                       id="dateDepart"
                       name="dateDepart"
                       placeholder="Saisissez la date de départ"
                       required
                       class="date-input">
            </div>
            <div class="form-fields">
                <label for="dateRetour">Date de retour :</label>
                <input v-model="dateDeRetour"
                       type="date"
                       id="dateRetour"
                       name="dateRetour" placeholder="Saisissez la date de retour" required  class="date-input">
            </div>
            <p class="date-error" v-if="wrongDateDeRetour">
            Veuillez entrer une date de retour qui soit posterieure à la date de départ</p>
            <input :disabled="wrongDateDeRetour" class="submit-button form-fields" type="submit"
                   value="En route !" @click="redirectionToResultsPage">
        </form>
    </div>
</template>
<script>
 
    export default {
        data() {
            return {
               
            dateDeDepart: "",
            dateDeRetour: "",
            wrongDateDeRetour: false,

               
            }
        },
        methods: {
            redirectionToResultsPage(e) {
                e.preventDefault()
                if (this.wrongDateDeRetour == false) {
                    this.$router.push(`/vehicules-disponibles?depart=${this.dateDeDepart}&retour=${this.dateDeRetour}`)

                }
                else console.log("mauvaise date de retour")
            },
            checkIfReturnIsPostDeparture() {

                if (this.dateDeRetour !== "") {
                    if (this.dateDeRetour <= this.dateDeDepart) {
                        this.wrongDateDeRetour = true
                    }
                    else this.wrongDateDeRetour = false;
                }
            }
        },
        updated() {
            this.checkIfReturnIsPostDeparture();
            console.log("this.dateDeDepart : ", this.dateDeDepart)
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
    .form-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 15px 0 15px;
        background-color: #f7953e;
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
    .date-error {
        font-weight: 700;
        color: red;
    }
    .date-input{
        padding: 3px;

    }
</style>
