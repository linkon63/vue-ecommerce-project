<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

import { useRouter } from 'vue-router';
const router = useRouter();
import { getDocs, query, where } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
const db = useFirestore();
import { collection } from 'firebase/firestore';

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                resetMenu();
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
}
onMounted(async () => {
    console.log('router', router.path)
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    console.log('email and password', email, password);

    const q = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));

    let flag = false;
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            flag = true;
        });
    }
    console.log('flag', flag);
    if (!flag) {
        router.push('/auth/login');
        return;
    }
    router.push('/admin/dashboard');
});

</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
