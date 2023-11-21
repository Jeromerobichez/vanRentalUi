
<template>
    <form  @submit.prevent="submitForm(formData)">
        <div class="edit-form">
            <label v-for="(field, fieldName) in fields" :key="fieldName" :for="fieldName">
                {{ field.label }}:
                <template v-if="fieldName === 'Id'">
                    <input disabled type="number" :id="fieldName" :name="fieldName" v-model="formData[fieldName]">
                </template>
                <template v-else-if="field.type === 'checkbox'">
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
        </div>
        <input class="submit-edit" type="submit" :value="`Soumettre la modification ${dataType}`">
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
            dataType: {
                type: String,
                Required: true
            }
        },
        mounted() {
            console.log("fiedls ::", this.fields)
        }
    };
</script>
<style>
    .edit-form {
        display: grid;
        grid-template-columns: 1fr 1fr ;
        grid-gap: 10px;
    }
    label {
        text-align: right; 
        padding-right: 10px; 
    }
    .submit-edit {
        padding: 10px;
        background-color: #2f803f;
        border-radius: 8px;
        border: 1px solid white;
        color: white;
    }
</style>