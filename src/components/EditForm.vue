
<template>
    <form @submit.prevent="submitForm(formData)">
        <label v-for="(field, fieldName) in fields" :key="fieldName" :for="fieldName">
            {{ field.label }}:
            <template v-if="field.type === 'checkbox'">
                <input type="checkbox" :id="fieldName" :name="fieldName" v-model="formData[fieldName]">
            </template>
            <template v-else-if="field.type === 'textarea'">
                <textarea :id="fieldName" :name="fieldName" v-model="formData[fieldName]"></textarea>
            </template>
            <template v-else-if="field.type === 'date'">
                <input type="date" :id="fieldName" :name="fieldName" v-model="formData[fieldName]">
            </template>
            <template v-else-if="field.type === 'number'">
                <input type="number" :id="fieldName" :name="fieldName" v-model="formData[fieldName]">
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
            }
        },
    };
</script>
