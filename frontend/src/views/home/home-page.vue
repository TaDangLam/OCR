<template>
  <div class="flex flex-col gap-3 px-25 pt-10 min-h-screen">
    <div class="gap-10 w-full bg-gray-100 rounded-lg p-3">
      <Navbar @update-template="templateFileLocal = $event" />
    </div>
    <div class="flex gap-3 w-full">
      <div class="bg-blue-100 w-1/2 p-3 rounded-lg"><FileReview :templateFileLocal="templateFileLocal" /></div>
      <div class="bg-blue-100 w-1/2 p-3 rounded-lg"><OcrResult /></div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from '@/libs/vue-export.js';
  import Navbar from '@/components/nav-bar.vue';
  import FileReview from '@/components/file-preview.vue';
  import OcrResult from '@/components/ocr-result.vue';

  const templateFileLocal = ref(null);

  // watch(templateFileLocal, (newVal, oldVal) => {
  //   console.log('File mới được chọn:', newVal);
  //   console.log('File cũ được chọn:', oldVal);
  // })
  // const confirmTemplate = ref(null);
  
  // const childFiles = ref([]);
</script>

<style scoped></style>
                        