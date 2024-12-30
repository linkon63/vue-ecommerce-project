<script setup>
defineProps(['name', 'totalVacancy']);
</script>

<template>
  <button class="px-2 py-1 sm:px-6 sm:py-3 border text-[#323232] hover:bg-[#0567E1] m-1 rounded-xl hover:text-white text-base font-r-semibold transform ease duration-200 hover:scale-[1.02] text-[10px] sm:text-[16px]" type="button">
    {{ name ? `${name}` : 'Submit' }}
  </button>
</template>
