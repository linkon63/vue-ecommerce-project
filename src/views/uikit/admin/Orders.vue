<script setup>
import { onMounted, reactive, ref } from 'vue';

import { doc, getDoc, addDoc, getDocs, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';

import { useFirestore } from 'vuefire';
const db = useFirestore();

import { collection } from 'firebase/firestore';

const state = reactive({
    orderData: [],
    backupProductData: []
});

const searchQuery = ref('')
const searchProducts = (e) => {
    const searchQuery = e.target.value;
    if(searchQuery.length === 0) {
        state.orderData = [...state.backupProductData];
        return;
    }
    console.log('searchQuery', searchQuery);
    const productArray = state.orderData.filter((product) => product.id.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log('productArray', productArray);
    state.orderData = [...productArray];
};

const courierOrder = async (id, order) => {
    // refetch data
    try {
        const specificOrderRef = await doc(db, 'order', id);
        await updateDoc(specificOrderRef, {
            ...order,
            courier: true,
            confirmedAt: new Date().toISOString()
        });
        alert('Order Update successfully !!');
        await reFatch();
    } catch (e) {
        console.log('Error getting products document:', e);
    }
};
const reFatch = async () => {
    const orderArray = [];
    const querySnapshot = await getDocs(collection(db, 'order'), orderBy('createdAt'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        orderArray.push({ ...doc.data(), id: doc.id });
    });
    console.log('All orders', orderArray);
    state.orderData = [...orderArray].reverse();
    state.backupProductData = [...orderArray].reverse();
};
onMounted(async () => {
    try {
        await reFatch();
    } catch (e) {
        console.log('Error getting products document:', e);
    }
});
</script>

<template>
    <Fluid>
        <div class="flex gap-8">
            <div class="md:w-full card">
                <div class="w-full">
                    <div class="text-[24px] font-bold my-4">All Orders</div>
                    <div v-if="state.orderData.length > 0" class="">
                        <div>
                            <p class="text-green-500 font-bold">Your Order list in your inventory</p>
                            <input type="text" class="px-8 py-4 text-black rounded-xl border" v-model="searchQuery" @input="searchProducts" placeholder="Search products by ID..." />
                            <div>
                                <!-- {{ state?.orderData }} -->

                                <div class="w-full my-1 py-6 px-8" v-for="order in state?.orderData" :key="order.id">
                                    <section class="">
                                        <section class="flex w-full items-start justify-between">
                                            <section class="capitalize border-green-500">
                                                <p>OrderId: {{ order?.id }}</p>
                                                <p>Name: {{ order?.name }}</p>
                                                <p>Address: {{ order?.address }}</p>
                                                <p>Phone: {{ order?.phone }}</p>
                                                <p>Total Price: {{ order?.totalPrice }} Tk</p>
                                                <p>created at : {{ order?.createdAt }}</p>
                                                <p v-if="order.confirmedAt">Confirm at: {{ order?.confirmedAt }}</p>
                                            </section>
                                            <section class="mx-8 border-red-500">
                                                <div v-for="product in order?.orderProducts" :key="product.id">
                                                    <div class="flex items-center justify-center px-8">
                                                        <section>
                                                            <div class="px-4 my-4">
                                                                <p>Name: {{ product?.name }}</p>
                                                                <p>Price: {{ product?.price }}</p>
                                                                <p>Total Order Quantity: {{ product?.totalOrderQuantity }}</p>
                                                            </div>
                                                            <div><img :src="product.productUrl" alt="hello" class="w-[100px]" /></div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </section>
                                            <section class="">
                                                <Button v-if="!order?.courier" label="Not Complete" severity="warn" class="mx-4 my-8" @click="courierOrder(order?.id, order)" />
                                                <Button v-else label="Completed" severity="primary" class="mx-4 my-8" disabled />
                                            </section>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex justify-center">
                        <div>
                            <p class="text-red-500">You have no order in your inventory</p>
                            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" class="flex justify-center" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fluid>
</template>
