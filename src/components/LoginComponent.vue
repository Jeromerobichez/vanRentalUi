<script setup>
    import { ref } from 'vue'
    import { supabase } from '../supabase'

    const loading = ref(false)
    const email = ref('')
    const password = ref('')

    const handleLogin = async () => {
        try {
            loading.value = true
            const { error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            })
            if (error) throw error
            alert('Vous êtes à présent connecté sur \'espace admin !')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <form class="row flex-center flex" @submit.prevent="handleLogin">
        <div class="col-6 form-widget">
            <h1 class="header-login">formulaire de connexion espace admin</h1>
            <p class="description">Entrez votre email et votre mot de passe</p>
            <div>
                <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
            </div>
            <div>
                <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
            </div>
            <div>

                <input type="submit"
                       class="button block"
                       :value="loading ? 'Loading' : 'se connecter'"
                       :disabled="loading" />
            </div>
        </div>
    </form>
</template>
<style>
    @media screen and (max-width: 540px) {
        .header-login {
            font-size: 20px;
        }
    }
</style>