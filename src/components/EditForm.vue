<!-- EditForm.vue -->

<template>
    <form @submit.prevent="submission(formData)">
        <label v-for="(field, fieldName) in fields" :key="fieldName" :for="fieldName">
            {{ field.label }}:
            <template v-if="field.type === 'checkbox'">
                <input type="checkbox" :id="fieldName" :name="fieldName" v-model="formData[fieldName]">
            </template>
            <template v-else-if="field.type === 'textarea'">
                <textarea :id="fieldName" :name="fieldName" v-model="formData[fieldName]"></textarea>
            </template>
            <template v-else>
                <input type="{{ field.type }}" :id="fieldName" :name="fieldName" v-model="formData[fieldName]">
            </template>
            <br><br>
        </label>

        <input type="submit" value="Soumettre la modification du véhicule">
    </form>
</template>

<script>
    export default {
        props: {
            fields: {
                type: Object,
                required: true,
            },
            formData: {
                type: Object,
                required: true,
            },
            submitForm: {
                type: Function,
                required: true,
            },
            //closeModal: {
            //    type: Function,
            //    required: true,
            //}
        },
        methods: {
            submission(formData) {
                this.$props.submitForm(formData);
              /*  this.$props.closeModal();*/
            }
        },
        mounted() {
       /*     console.log("formData : ", this.$props.formData)*/
            console.log("fields in Edit form : ", this.$props.submitForm)
        }
    };
</script>
