
<template>
    <table border="1">
        <thead>
            <tr>
                <th v-for="(column, index) in columns" :key="index">
                    {{ column.field }}
                    <button @click="sortByColumn(column)">▲</button>
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
                <td> <img height="20" src="@/assets/supprimer.png" /> </td>
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
            }
        },
    };
</script>
