<script setup>
import HeroSection from '@/components/landing-page/hero/Section.vue';
import ProductCategories from '@/components/landing-page/product-categories/Section.vue';
import Products from '@/components/landing-page/product/Section.vue';
import Header from '@/components/shared/Header.vue';
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <HeroSection />
            <section class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 lg:static">
                <ProductCategories />
                <Products />
            </section>
        </div>
    </div>
</template>
