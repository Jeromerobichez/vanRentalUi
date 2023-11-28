<template>
    <div class="van-footer">
        <div class="connection-btn"
             @click="openConnexionModal"></div>
    </div>
    <div v-if="isConnexionModalOpen"
         class="connexion-modal-container">
        <LoginComponent />
    </div>
    <div class="modal-overlay"
         v-if="isConnexionModalOpen"
         @click="closeConnexionModal">
    </div>
</template>
<script>
    import LoginComponent from '@/components/LoginComponent.vue';
    export default {
        data() {
            return {
                isConnexionModalOpen: false
            }
        },
        components: {
            LoginComponent
        },
        methods: {
            openConnexionModal() {
                this.isConnexionModalOpen = true;
            },
            closeConnexionModal() {
                this.isConnexionModalOpen = false;
                this.$router.go()
            }
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
    .van-footer {
        height: 100px;
        background-color: #004042;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .connection-btn {
        height: 15px;
        width: 15px;
        background-color: #97aeda;
        margin: 10px;
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 2;
        background-color: rgba(0,0,0,0.8);
        overflow: hidden;
    }
    .connexion-modal-container {
        background-color: #97aeda;
        height: 75vh;
        width: 75vh;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border: 2px solid black;
        border-radius: 8px;
    }
    @media screen and (max-width: 540px) {
        .connexion-modal-container {
            width: 80%;
        }
    }
    
</style>
