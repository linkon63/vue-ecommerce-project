<script setup>
const props = defineProps(['title', 'price', 'description', 'img', 'product']);
import { useRouter } from 'vue-router';
import { useState } from '../../../composables/store.js';
const { state } = useState();
const router = useRouter();
const addToCart = (product) => {
    if (state.atToCart.length !== 0) {
        console.log('local products', product);
        console.log('state.atToCart', state.atToCart);

        const findProductsFromAtToCart = state.atToCart.find((pd) => pd.id === product.id);
        if (findProductsFromAtToCart === undefined) {
            state.atToCart = [...state.atToCart, product];
        }
    } else {
        state.atToCart = [...state.atToCart, product];
        console.log('Zero', state.atToCart);
    }

    // state.atToCart = [...state.atToCart, product];

    // comment code for the refrence for the future
    // const sessionProduct = JSON.parse(sessionStorage.getItem('cartProduct'));
    // const productArray = sessionProduct ? [...sessionProduct] : [];
    // if (sessionProduct && sessionProduct.length > 0) {
    //     productArray.push(product);
    //     sessionStorage.setItem('cartProduct', JSON.stringify(productArray));
    // } else {
    //     sessionStorage.setItem('cartProduct', JSON.stringify([product]));
    // }
};
const buyNow = (product) => {
    state.buyNowProduct = product;
    console.log(state);
    router.push(`/product/details?productId=${product.id}`);
};
</script>

<template>
    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 group">
        <div style="height: 350px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full overflow-hidden" style="border-radius: 8px">
                <div class="flex items-center justify-center h-[200px] overflow-hidden">
                    <img :src="img ? img : ''" class="w-full h-auto transition ease-linear duration-300 hover:scale-125" />
                </div>
                <h5 class="mb-2 text-surface-900 dark:text-surface-0 text-[32px] font-bold">{{ title ? title : '' }}</h5>
                <span class="text-surface-600 dark:text-surface-200">{{ description ? description : '' }}</span>
                <section class="flex justify-between">
                    <h5 class="mb-2 text-surface-900 dark:text-surface-0 text-[20px] group-hover:font-bold">{{ price ? price : '' }} BDT</h5>
                    <section class="flex">
                        <div class="translate-x-72 transition ease duration-200 group-hover:-translate-x-0 mx-2">
                            <Button icon="pi pi-heart" severity="help" rounded aria-label="Favorite" label="Cart" @click="addToCart(props.product)" />
                        </div>
                        <div class="translate-x-72 transition ease duration-200 group-hover:-translate-x-0 mx-2">
                            <Button icon="pi pi-check" severity="info" rounded aria-label="Favorite" label="Buy Now" @click="buyNow(props.product)" />
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>
