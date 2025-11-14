<template>
    <div class="flex items-center gap-5">
        <button type="button" @click="handleEditOCRFields" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Edit OCR Fields</button>
        <button type="button" @click="handleDeleteOCRFields" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Delete OCR Fields</button>
        <button type="button" @click="handlSaveOcrFields" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Save OCR Fields</button>
        <button type="button" @click="handlCancelOcrFields" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Cancel OCR Fields</button>
    </div>
</template>

<script setup>
    const emit = defineEmits([
        'edit-ocr-fields',
        'delete-ocr-fields',
        'save-ocr-fields',
        'cancel-ocr-fields'
    ]);

    const handleEditOCRFields = () => {
        emit('edit-ocr-fields')
    }
    const handleDeleteOCRFields = () => {
        emit('delete-ocr-fields')
    }
    const handlSaveOcrFields = () => {
        emit('save-ocr-fields')
    }
    const handlCancelOcrFields = () => {
        emit('cancel-ocr-fields')
    }
</script>

<style scoped>

</style>