<template>
  <div class="flex flex-col gap-3 px-25 pt-10 min-h-screen">
    <div class="flex justify-center gap-10 w-full bg-rose-200 p-3 ">
      <Navbar />
    </div>
    <div class="flex gap-3 w-full">
      <div class="bg-blue-100 w-1/2 p-3"><FileReview /></div>
      <div class="bg-green-100 w-1/2 p-3"><OcrResult /></div>
    </div>
  </div>
</template>

<script setup>
  import Navbar from '@/components/nav-bar.vue';
  import FileReview from '@/components/file-preview.vue';
  import OcrResult from '@/components/ocr-result.vue';
</script>

<style scoped></style>
