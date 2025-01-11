<script setup>
import Header from '@/components/shared/Header.vue';
import ProductCategory from '@/components/landing-page/product-categories/Section.vue';
import { onMounted, reactive, ref } from 'vue';
import { getDocs } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';
import ProductCard from '@/components/landing-page/product/Card.vue';
const localState = reactive({
    productData: [],
    backupProductData: []
});


const db = useFirestore();

const searchQuery = ref('')
const searchProducts = (e) => {
    const searchQuery = e.target.value;
    if(searchQuery.length === 0) {
        localState.productData = [...localState.backupProductData];
        return;
    }
    console.log('searchQuery', searchQuery);
    const productArray = localState.productData.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log('productArray', productArray);
    localState.productData = [...productArray];
};

onMounted(async () => {
    try {
        const productArray = [];
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('All products', productArray);
        localState.productData = [...productArray];
        localState.backupProductData = [...productArray];
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
                            <input type="text" class="px-8 py-4 text-black rounded-xl border" v-model="searchQuery" @input="searchProducts" placeholder="Search products by name..." />
                        </div>
                        <ProductCard v-for="product in localState.productData" :title="product.name" :description="product.description" :price="product.price" :key="product" :img="product.productUrl" :product="product" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
