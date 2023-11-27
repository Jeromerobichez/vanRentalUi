
<template>
    <table border="1">
        <thead>
            <tr>
                <th v-for="(column, index) in columns" :key="index">
                    {{ column }}
                </th>
                <th>éditer</th>
                <th>supprimer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
                <td v-for="(column, index) in columns" :key="index">
                    {{ item[column] }}
                </td>
                <td> <img @click="openEditModal(index)" height="20" src="@/assets/editer.png" /> </td>
                <td> <img @click="handleDelete(item.id)" height="20" src="@/assets/supprimer.png" /> </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: {
            columns: {
                type: Array,
                required: true,
            },
            items: {
                type: Array,
                required: true,
            },
            openEditModal: {
                type: Function,
                required: true,
            },
            handleDelete: {
                type: Function,
                required: false,
            }
        },
        mounted() {
            console.log("items : ", this.$props.items)
        }
    };
</script>
<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px; 
    }

    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9; 
    }
</style>
