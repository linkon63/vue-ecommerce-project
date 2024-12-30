import { reactive } from 'vue';

const state = reactive({
    atToCart: [],
    buyNowProduct: {},
});

export function useState() {
    return { state };
}
