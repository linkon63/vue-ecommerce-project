<script setup>
import { onMounted, reactive } from 'vue';

import { doc, getDoc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

import { useFirestore } from 'vuefire';
const db = useFirestore();

import { collection } from 'firebase/firestore';

const state = reactive({
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    productUrl: '',
    productData: [],
    visibleAddProduct: true
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

onMounted(async () => {
    try {
        const productArray = [];
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('All products', productArray);
        state.productData = [...productArray];
    } catch (e) {
        console.log('Error getting products document:', e);
    }
});
</script>

<template>
    <Fluid>
        <div class="flex gap-8">
            <div class="md:w-full card flex">
                <div class="w-1/2">
                    <div class="text-[24px] font-bold my-4">All Products</div>
                    <div v-if="state.productData.length > 0" class="flex justify-center">
                        <div>
                            <p class="text-green-500 font-bold">Your product list in your inventory</p>
                            <div v-for="product in state.productData" :key="product" class="m-4">
                                <Card style="width: 25rem; overflow: hidden">
                                    <template #header>
                                        <img alt="user header" :src="product.productUrl" class="w-full" />
                                    </template>
                                    <template #title>{{ product.name }}</template>
                                    <template #content>
                                        <p class="m-0">
                                            {{ product.description }}
                                        </p>
                                        <p class="m-0">Price : {{ product.price }} tk - Quantity: {{ product.quantity }}</p>
                                    </template>
                                    <template #footer>
                                        <div class="flex gap-4 mt-1">
                                            <Button @click="deleteProduct(product)" label="Delete" severity="secondary" outlined class="w-full" />
                                            <Button label="Update" class="w-full" @click="updateStateProductData(product)" />
                                        </div>
                                    </template>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex justify-center">
                        <div>
                            <p class="text-red-500">You have no product in your inventory</p>
                            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" class="flex justify-center" />
                        </div>
                    </div>
                </div>
                <div class="w-1/2">
                    <section v-if="state.visibleAddProduct">
                        <div class="font-semibold text-xl">Product Add</div>
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" v-model="state.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Price</label>
                            <InputText id="email1" type="number" min="0" v-model="state.price" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Quantity</label>
                            <InputText id="email1" type="number" min="0" v-model="state.quantity" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Product Url</label>
                            <InputText id="email1" type="url" v-model="state.productUrl" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Description</label>
                            <textarea id="email1" type="text" class="border" v-model="state.description" />
                        </div>
                        <Button label="Submit" icon="pi pi-check" iconPos="right" @click="addProductInDb" class="mt-4" />
                    </section>
                    <section v-else>
                        <div class="font-semibold text-xl">Product Update</div>
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" v-model="state.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Price</label>
                            <InputText id="email1" type="number" min="0" v-model="state.price" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Quantity</label>
                            <InputText id="email1" type="number" min="0" v-model="state.quantity" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Product Url</label>
                            <InputText id="email1" type="url" v-model="state.productUrl" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Description</label>
                            <textarea id="email1" type="text" class="border" v-model="state.description" />
                        </div>
                        <Button label="Submit" severity="warn" icon="pi pi-check" iconPos="right" @click="updateProduct" class="mt-4" />
                    </section>
                </div>
            </div>
        </div>
    </Fluid>
</template>
