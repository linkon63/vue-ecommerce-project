<script setup>
import { onMounted, reactive } from 'vue';

import { doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

import { useFirestore } from 'vuefire';
const db = useFirestore();

import { collection } from 'firebase/firestore';

const state = reactive({
    // id: '',
    // name: '',
    // price: 0,
    // quantity: 0,
    // description: '',
    // productUrl: '',
    reviewData: []
    // visibleAddProduct: true
});

const addProductInDb = async () => {
    console.log('product', state);
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, 'products'), {
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        description: state.description,
        productUrl: state.productUrl
    });
    console.log('Product Add Successfully', docRef);
    // state removed after add the products
    state.name = '';
    state.price = 0;
    state.quantity = 0;
    state.description = '';
    state.productUrl = '';

    const querySnapshot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
    });
    state.productData = productArray.reverse();
};

const deleteProduct = async (product) => {
    alert('Are you sure you want to delete this product');
    await deleteDoc(doc(db, 'products', product.id));
    console.log('delete product', product);
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
    });
    state.productData = [...productArray];
};

const updateStateProductData = (product) => {
    state.visibleAddProduct = false;
    console.log('update product', product);
    state.id = product.id;
    state.name = product.name;
    state.price = product.price;
    state.quantity = product.quantity;
    state.description = product.description;
    // state.productUrl = product.productUrl;
    // alert('Are you sure you want to update this product', product);
};

const updateProduct = async () => {
    // update doc ref
    const specificProductRef = await doc(db, 'products', state.id);
    await updateDoc(specificProductRef, {
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        description: state.description
    });
    alert('Product Update successfully !!');
    // input field empty
    state.id = '';
    state.name = '';
    state.price = '';
    state.quantity = '';
    state.description = '';
    state.visibleAddProduct = true;
    // refetch data
    try {
        const productArray = [];
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('All products refetch after update data', productArray);
        state.productData = [...productArray];
    } catch (e) {
        console.log('Error getting products document:', e);
    }
};

const disableReview = async (review) => {
    console.log('review', review);
    const specificReviewRef = await doc(db, 'reviews', review.id);
    await updateDoc(specificReviewRef, {
        status: false
    });
    try {
        const reviewArray = [];
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('reviewArray', reviewArray);
        state.reviewData = [...reviewArray];
    } catch (e) {
        console.log('Error getting products document:', e);
    }
};

const enableReview = async (review) => {
    console.log('review', review);
    const specificReviewRef = await doc(db, 'reviews', review.id);
    await updateDoc(specificReviewRef, {
        status: true
    });
    try {
        const reviewArray = [];
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('reviewArray', reviewArray);
        state.reviewData = [...reviewArray];
    } catch (e) {
        console.log('Error getting products document:', e);
    }
};

onMounted(async () => {
    try {
        const reviewArray = [];
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('reviewArray', reviewArray);
        state.reviewData = [...reviewArray];
    } catch (e) {
        console.log('Error getting products document:', e);
    }
});
</script>

<template>
    <Fluid>
        <div class="flex md:flex-row gap-8">
            <section class="md:w-full card">
                <div class="text-[24px] font-bold my-4">All reviews</div>
                <div class="card" v-if="state.reviewData.length > 0">
                    <div v-for="(item, index) in state.reviewData" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img
                                    class="block xl:block mx-auto rounded w-full"
                                    :src="
                                        item.status
                                            ? `https://static.vecteezy.com/system/resources/previews/004/154/332/original/data-storage-database-outline-style-icon-vector.jpg`
                                            : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vcntYGWCJVPM3DXzUarg23iLaELsOOiV0g&s`
                                    "
                                    :alt="item.userId"
                                />
                                <!-- https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vcntYGWCJVPM3DXzUarg23iLaELsOOiV0g&s -->
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.userId }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.description }}</div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <!-- <span class="text-xl font-semibold">${{ item.price }}</span> -->
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button severity="danger" icon="pi pi-trash" label="Disable Review" class="flex-auto md:flex-initial whitespace-nowrap" @click="disableReview(item)" :disabled="!item.status"></Button>
                                        <Button icon="pi pi-shopping-cart" label="Keep Review" class="flex-auto md:flex-initial whitespace-nowrap" :disabled="item.status" @click="enableReview(item)"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>You have no reviews</p>
                </div>
            </section>
        </div>
    </Fluid>
</template>
