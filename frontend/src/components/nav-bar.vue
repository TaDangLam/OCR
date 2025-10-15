<template>
    <div class="flex flex-col gap-4 px-3">
        <div class="flex items-center justify-center gap-5 py-1">
            <label id="uploadTemplate" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">
                Upload Template
                <input class="uploadTemplate" @change="handleSelectFile" type="file" hidden accept="*/*">
            </label>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Upload Files</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Add OCR Fields</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">View Results</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Run OCR</button>
        </div>
        <div class="flex items-center justify-center gap-5">
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Edit OCR Fields</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-red-400 hover:text-white rounded-lg">Delete OCR Fields</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Profile</button>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['update-template']);
    const handleSelectFile = (event) => {
        const file = event.target.files[0]
        if(!file) return

        emit('update-template', file);
    }
</script>

<style scoped>

</style>