<script setup>
import Header from '@/components/shared/Header.vue';
import ProductCategory from '@/components/landing-page/product-categories/Section.vue';
import { onMounted, reactive } from 'vue';
import { getDocs, orderBy, where } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';
import ProductCard from '@/components/landing-page/product/Card.vue';
import { query } from 'firebase/database';
const localState = reactive({
    productData: []
});

const db = useFirestore();

onMounted(async () => {
    try {
        const email = sessionStorage.getItem('userEmail');
        console.log('email', email);
        const q = query(collection(db, 'order'), where('email', '==', email), orderBy('createdAt'));

        const querySnapshot = await getDocs(q);
        const productArray = [];
        querySnapshot.forEach((doc) => {
            console.log('Orders', doc.data());
            console.log(doc.id, ' => ', doc.data());
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('All products', productArray);
        localState.productData = [...productArray].reverse();
    } catch (e) {
        console.log('Error getting products document:', e);
    }
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            hero section
            <ProductCategory />
            <section>
                <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                    <div class="grid grid-cols-12 gap-4 justify-center">
                        <div class="col-span-12 text-center mt-20 mb-6">
                            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Top Picks for You</div>
                            <span class="text-muted-color text-2xl">Check out our latest and trending products curated just for you.</span>
                        </div>

                        <!-- <ProductCard v-for="product in localState.productData" :title="product.name" :description="product.description" :price="product.price" :key="product" :img="product.productUrl" :product="product" /> -->
                    </div>
                </div>
                <div class="border my-2 bg-gray-300" v-for="product in localState.productData" :key="product">
                    <p class="px-4 py-1 font-bold text-white shadow-md" :class="product.courier ? 'bg-green-500' : 'bg-red-500'">Order completed : {{ product.courier ? 'Product Sent to you' : 'Not Done Yet' }}</p>
                    <p>Name : {{ product?.name }}</p>
                    <div v-for="order in product?.orderProducts" :key="order">
                        <p>Name : {{ order?.name }}</p>
                        <p>Price : {{ order?.price }}</p>
                        <p>totalOrderQuantity : {{ order?.totalOrderQuantity }}</p>
                    </div>
                    <p>Total Price : {{ product.totalPrice ? product.totalPrice : 0 }}tk</p>
                    <p>created at : {{ product?.createdAt }}</p>
                    <p v-if="product.confirmedAt">Confirm at: {{ product?.confirmedAt }}</p>
                </div>
            </section>
        </div>
    </div>
</template>
