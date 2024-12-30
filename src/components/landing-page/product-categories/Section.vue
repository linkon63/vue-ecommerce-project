<script setup>
import { reactive } from 'vue';
import Category from './category.vue';
const state = reactive({
    categories: [
        { id: 1, name: 'Women' },
        { id: 3, name: 'Man' },
        { id: 5, name: 'Baby' },
        { id: 6, name: 'Electronics' }
    ]
});
</script>

<template>
    <section class="container mx-auto px-6">
        <section class="sm:pb-10 border-b-2 pb-4">
            <span v-for="category in state.categories" :key="`${category}-key`">
                <Category :name="category.name" :total-vacancy="category.totalVacancy" />
            </span>
        </section>
    </section>
</template>
