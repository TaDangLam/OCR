<template>
    <div class="flex flex-col gap-4 px-3">
        <div class="flex items-center justify-center gap-5 py-1">
            <label id="uploadTemplate" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">
                Upload Template
                <input class="uploadTemplate" @change="handleSelectFileTemplate" type="file" hidden accept="*/*">
            </label>
            <label class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">
                Upload Files
                <input @click="handleClickBeforeUpload" @change="handleUploadFiles" id="uploadFilesInput" class="uploadTemplate" type="file" hidden accept="*/*" multiple>
            </label>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Add OCR Fields</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">View Results</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Run OCR</button>
        </div>
        <div class="flex items-center justify-center gap-5">
            <button v-if="selectedFiles && selectedFiles.length > 0" @click="handleResetFiles" type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Reset Uploaded Files</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Edit OCR Fields</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-red-400 hover:text-white rounded-lg">Delete OCR Fields</button>
            <button type="button" class="py-1 px-5 bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white rounded-lg">Profile</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from '@/libs/vue-export.js';
    import { Notiflix } from '@/libs/notiflix.js';

    const selectedFiles = ref([]);
    const emit = defineEmits(['update-template', 'update-files']);
    const props = defineProps({
        canUploadFiles: Boolean,
    })

    //-------------------------------------Handle Temaplte Files-------------------------------------------
    const handleSelectFileTemplate = (event) => {
        const file = event.target.files[0]
        if(!file) return
        emit('update-template', file);
    }
    // ----------------------------------------------------------------------------------------------------

    //-------------------------------------Handle Upload Files---------------------------------------------
    const handleClickBeforeUpload = (event) => {
        if (!props.canUploadFiles) {
            event.preventDefault();
            Notiflix.Report.warning('Unable to upload file', 'Please upload Template first', 'OK');
        }
    }

    const handleUploadFiles = (event) => {
        const newFiles = Array.from(event.target.files);
        selectedFiles.value = [...selectedFiles.value, ...newFiles];
        if(!selectedFiles.value.length) return;
        emit('update-files', selectedFiles.value);
    }

    const handleResetFiles = () => {
        selectedFiles.value = [];
        emit('update-files', []);

        const fileInput = document.getElementById('uploadFilesInput');
        if (fileInput) fileInput.value = '';
        Notiflix.Notify.info('Uploaded files have been reset');
    }
    // ----------------------------------------------------------------------------------------------------
</script>

<style scoped>

</style>