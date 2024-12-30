<script setup>
import { useRouter } from 'vue-router';
import { useState } from '../../composables/store.js';
const { state } = useState();
const router = useRouter();
const addToCart = (product) => {
    if (state.atToCart.length !== 0) {

        const findProductsFromAtToCart = state.atToCart.find((pd) => pd.id === product.id);
        if (findProductsFromAtToCart === undefined) {
            state.atToCart = [...state.atToCart, product];
        }
    } else {
        state.atToCart = [...state.atToCart, product];
    }
    router.push('/add-to-cart');
};
</script>
<template>
    <div
        id="hero"
        class="pt-6 px-6 lg:px-20 overflow-hidden grid grid-cols-2 h-[100vh] gap-8"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-6 md:mx-20 mt-0 md:mt-6 flex items-center">
            <div>
                <h1 class="text-6xl font-bold text-gray-900 leading-tight transition ease-linear duration-500 hover:scale-105">
                    <span class="font-light block">Welcome to e-Shop – Quality Products at Your Fingertips!</span>
                </h1>
                <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">{{ state.buyNowProduct?.name }}</p>
                <p class="font-normal text-2xl leading-normal md:mt-1 text-gray-700">{{ state.buyNowProduct?.price }} BDT</p>
                <p class="font-normal text-xl leading-normal md:mt-1 text-gray-700">{{ state.buyNowProduct?.description }}</p>

                <Button label="All Products" as="router-link" to="/all-products" rounded class="!text-xl mt-8 !px-4"></Button>
                <Button label="Buy" severity="help" class="mx-4" @click="addToCart(state.buyNowProduct)" />
            </div>
        </div>
        <div class="flex justify-start md:justify-center items-center transition ease-linear duration-500 hover:scale-125">
            <!-- <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto" /> -->
            <img :src="state.buyNowProduct?.productUrl ? state.buyNowProduct?.productUrl : 'www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png'" alt="Hero Image" class="w-6/12 h-1/2" />
        </div>
    </div>
</template>
