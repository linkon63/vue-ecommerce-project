<script setup>
import Header from '@/components/shared/Header.vue';
import { useState } from '../../composables/store.js';
import { onMounted, reactive, ref } from 'vue';
import { addDoc } from 'firebase/firestore';
const router = useRouter();
import { useFirestore } from 'vuefire';
const db = useFirestore();
import { collection } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import {loadStripe} from '@stripe/stripe-js';
const stripeRef = ref()
const { state } = useState();

const localState = reactive({
    atToCart: [],
    nextClicked: false,
    userData: {},
    pk: 'sk_test_51Ie1JhBHVweerPiK6OwuH7Le6GhqvqT902IKfI31hUySxJe9VIKrea23SBrYdndy2Btyx539mTZqHlEUJ02MttrN00pUQ5cz5F'
});

const picked = ref('Two');

const quantityIncrease = (e, product) => {
    const localQuantity = e.target.value;
    console.log('localQuantity: ' + localQuantity);
    // early return concepts // corner cases
    if (Number(localQuantity) < 0) {
        alert('you cant give the negative quantity');
        return;
    }
    if (Number(localQuantity) > Number(product.quantity)) {
        alert('you cant give the quantity more than' + product.quantity);
        return;
    }
    // main working
    const updateTheQuantity = localState.atToCart.find((pd) => pd.id === product.id);
    updateTheQuantity.totalOrderQuantity = localQuantity;
};

const next = () => {
    const quantityFlag = localState.atToCart.find((pd) => pd.totalOrderQuantity === '');
    if (quantityFlag) {
        console.log('quantityFlag', quantityFlag);
        alert('Please give product quantity of all products');
        return;
    }
    localState.nextClicked = true;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData.email) {
        console.log('userData', userData);
        localState.userData = userData;
    } else {
        alert('Please logged in otherwise you can not order');
    }
};
const deleteCartProduct = (product) => {
    if (product) {
        if (confirm('are you sure you want to delete this product?')) {
            const filterCartProduct = localState.atToCart.filter((prd) => prd.id !== product.id);
            localState.atToCart = filterCartProduct;
            state.atToCart = filterCartProduct;
        }
    }
};

const cashOnDelivery = async () => {
    const orderObject = {
        email: localState.userData?.email,
        name: localState.userData?.name,
        address: localState.userData?.address,
        phone: localState.userData?.phone,
        orderProducts: state.atToCart,
        payment: false,
        paymentId: ''
    };
    console.log('orderObject', orderObject);
    try {
        const docRef = await addDoc(collection(db, 'order'), { ...orderObject });
        console.log('Order Add Successfully', docRef);
        alert('Order Add Order successfully, Please wait till than get your product');
        state.atToCart = [];
        localState.atToCart = [];
        router.push('/');
    } catch (error) {
        alert('error occurred while creating account');
    }
};
let cardElement = reactive({})

onMounted( async () => {
    localState.atToCart = [...state.atToCart];
    const stripe = await loadStripe('pk_test_51Ie1JhBHVweerPiKD5ZiauHVxaum4XV1yLjMsUHfkMPf2T7UKNlyHOJ0u0JDpztqmYSfu9R9nRsTA8gydkmksxSr00UdXEF7bv');
    console.log('stripe', stripe);
    stripeRef.value = stripe

    let elements = stripe.elements();

    cardElement = elements.create('card', {
        classes: {
            base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
        }
    });

    cardElement.mount('#card-element');
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <section class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 lg:static">
                <section class="grid">
                    <section>
                        <section v-if="localState.atToCart && localState.atToCart.length > 0">
                            <div class="w-full my-1 border border-gray-300 py-6 px-8" v-for="product in localState.atToCart" :key="product.id">
                                <section class="flex justify-between">
                                    <section class="capitalize">
                                        <p>Name: {{ product.name }}</p>
                                        <p>descripiton: {{ product.description }}</p>
                                        <p>price: {{ product.price }}</p>
                                    </section>
                                    <section class="flex items-center">
                                        <section class="mx-10">
                                            <img :src="product.productUrl" alt="hello" class="w-[100px]" />
                                        </section>
                                        <section>
                                            <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Quantity ({{ product?.quantity }})</label>
                                            <input @blur="(e) => quantityIncrease(e, product)" max="10" type="number" placeholder="Quantity" class="w-full md:w-[10rem] mb-8 border py-2 px-4" />
                                        </section>
                                        <Button label="Delete" severity="danger" class="mx-4" @click="deleteCartProduct(product)" />
                                    </section>
                                </section>
                            </div>
                            <!-- {{ state.atToCart }} -->
                        </section>
                        <section v-else>
                            <p>there is no product in cart</p>
                        </section>
                    </section>
                    <section v-if="localState.nextClicked">
                        <p class="py-8 text-[24px]">Shipping detials</p>
                        <section class="flex">
                            <section class="mx-4">
                                <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                                <input :value="localState.userData.name" type="text" placeholder="Name" class="cursor-not-allowed w-full md:w-[10rem] mb-8 border py-2 px-4" readonly />
                            </section>

                            <section class="mx-4">
                                <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                                <input :value="localState.userData.email" type="text" placeholder="Name" class="cursor-not-allowed w-full md:w-[10rem] mb-8 border py-2 px-4" readonly />
                            </section>

                            <section class="mx-4">
                                <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Phone</label>
                                <input :value="localState.userData.phone" type="phone" placeholder="Phone" class="w-full md:w-[10rem] mb-8 border py-2 px-4" />
                            </section>

                            <section class="mx-4">
                                <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Address</label>
                                <input :value="localState.userData.address" type="text" placeholder="Address" class="w-full md:w-[10rem] mb-8 border py-2 px-4" />
                            </section>
                        </section>
                        <section>
                            <p class="py-8 text-[24px]">Delivery Option</p>
                            <section>
                                <input class="px-4" type="radio" id="two" value="Two" v-model="picked" />
                                <label for="two" class="px-4">Payment Gateway</label>

                                <input class="px-4" type="radio" id="one" value="One" v-model="picked" />
                                <label for="one" class="px-4">Cash on delivery</label>
                            </section>
                            <br />
                        </section>
                        <section v-if="picked === 'Two'">
                            <section>
                                <p>hello payment gateway</p>
                                <div id="#card-element"></div>
                                <!-- <StripeElementCard :pk="localState.pk" /> -->
                            </section>
                            <Button v-if="picked === 'Two'" label="Place Order" severity="" class="" />
                        </section>
                    </section>
                </section>
                <section class="py-4 flex justify-end" v-if="localState?.atToCart.length > 0">
                    <Button v-if="!localState.nextClicked" label="Next" severity="" class="" @click="next" />
                    <Button v-if="picked === 'One'" label="Place Order" severity="" class="" @click="cashOnDelivery" />
                </section>
            </section>
        </div>
    </div>
</template>
