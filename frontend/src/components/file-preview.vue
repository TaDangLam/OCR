<template >
    <div class="flex w-full">
        <div v-if="!templateFileLocal" class="flex justify-center p-3 border rounded-lg bg-gray-50 w-full">
            <div>No files selected!!</div>
        </div>

        <div v-else-if="templateFileLocal.type !== 'application/pdf'">
            <div>Only supports PDF file preview. ( Current file: <b>{{ templateFileLocal.type || 'Undefine' }}</b> )</div>
        </div>

        <div v-else class="flex flex-col gap-2 w-full">
            <div class="flex flex-col gap-0.5 bg-gray-100 border border-gray-300 rounded-lg p-1.5 w-full">
                <div><strong>File Name:</strong> {{ templateFileLocal.name }}</div>
                <div><strong>Type:</strong> {{ templateFileLocal.type || 'Không rõ' }}</div>
                <div><strong>Size:</strong> {{ (templateFileLocal.size / 1024).toFixed(2) }} KB</div>
                <div class="flex items-center gap-1.5">
                    <strong>Template:</strong> 
                    <div v-if="isUploadedTempalte" class="flex items-center bg-emerald-600 text-white px-2 rounded-xl">Active</div>
                    <button v-else class="cursor-pointer bg-gray-300 hover:bg-gray-400 hover:text-white px-2 rounded-xl" @click="handleConfirmUploadTemplate">Confirm</button>
                </div>
                <div v-if="uploadFiles && uploadFiles.length > 0" class="flex items-center gap-2.5">
                    <div><strong>Files Uploaded:</strong> {{ uploadFiles.length }}</div> 
                    <div v-if="isUploadFiles" class="flex items-center bg-emerald-600 text-white px-2 rounded-xl">Active</div>
                    <button v-else @click="handleConfirmUploadBulkFiles" class="cursor-pointer bg-gray-300 hover:bg-gray-400 hover:text-white px-2 rounded-xl" >Confirm</button>
                </div>
            </div>
            <div ref="pdfContainer" class="rounded-lg p-2 overflow-auto max-h-[85vh] flex flex-col items-center">
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick  } from '@/libs/vue-export.js';
    import { pdfjsLib } from '@/libs/pdf';
    import { useMutation } from '@/libs/apollo-client.js';
    import { UPLOAD_FILE_CLOUD, UPLOAD_FILES } from '@/graphql/index.js';
    import { userID, token } from '@/libs/localStorage.js';
    import { Notiflix } from '@/libs/notiflix.js';

    const pdfContainer = ref(null);
    const isUploadedTempalte = ref(false);
    const isUploadFiles = ref(false);
    const templateID = ref('');
    const { mutate: uploadFileCloud } = useMutation(UPLOAD_FILE_CLOUD);
    const { mutate: uploadBulkFiless } = useMutation(UPLOAD_FILES);

    const emit = defineEmits(['can-upload-files']);
    const props = defineProps({
        templateFileLocal: File,
        uploadFiles: Array
    });

    const handleConfirmUploadTemplate = async () => {
        if (!props.templateFileLocal) return;

        Notiflix.Confirm.show(
            'Confirm Upload',
            'Are you sure you want to upload this template?',
            'Yes',
            'No', 
            async () => {
                Notiflix.Loading.circle('Uploading...');
                try {
                    const { data } = await uploadFileCloud(
                        {
                            file: props.templateFileLocal,
                            name: props.templateFileLocal.name,
                            isTemplate: true,
                            typeName: props.templateFileLocal.type,
                            userId: userID
                        },
                        {
                            context: {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            }
                        }
                    );

                    Notiflix.Loading.remove();
                    Notiflix.Notify.success('Upload successfully!');
                    isUploadedTempalte.value = true;
                    templateID.value = data.uploadFileCloud.id;
                    emit('can-upload-files', true)
                } catch (err) {
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure('Upload failed!');
                    console.error('❌ Upload failure:', err.message);
                }
            },
            () => {
            
            Notiflix.Notify.info('Upload canceled');
            }
        );
    };

    watch(
        () => props.templateFileLocal,
        async (file) => {
            if(!file) return;
            const url = URL.createObjectURL(file);
            await nextTick();
            renderPDF(url);
        },
        { immediate: true }
    );

    const handleConfirmUploadBulkFiles = async () => {
        if (!props.uploadFiles || props.uploadFiles.length === 0) {
            Notiflix.Notify.warning('No files to upload!');
            return;
        }
        
        if (!templateID.value) {
            Notiflix.Notify.warning('Template not uploaded yet!');
            return;
        }

        Notiflix.Confirm.show(
            'Confirm Upload Bulk Files',
            `Are you sure you want to upload ${props.uploadFiles.length} files?`,
            'Yes',
            'No',
            async () => {
                Notiflix.Loading.circle('Uploading Bulk Files...');
                try {
                    await uploadBulkFiless(
                        {
                            templateId: templateID.value,
                            userId: userID,
                            files: props.uploadFiles
                        },
                        {
                            context: {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            }
                        }
                    );
                    isUploadFiles.value = true;
                    Notiflix.Loading.remove();
                    Notiflix.Notify.success('Upload successfully!');
                } catch (err) {
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure('Upload failed!');
                    console.error('❌ Upload failure:', err.message);
                }
            },
            () => {
                Notiflix.Notify.info('Upload canceled');
            }
        );
    };

    const clearPDF = () => {
        if (pdfContainer.value) pdfContainer.value.innerHTML = '';
    }

    const renderPDF = async (url) => {
        clearPDF();
        const pdf = await pdfjsLib.getDocument(url).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);

            // 👉 Lấy chiều rộng thực tế của container
            const containerWidth = pdfContainer.value.clientWidth || 600;
            const viewport = page.getViewport({ scale: 1 }); // scale gốc để lấy kích thước thật

            // 👉 Tính tỉ lệ scale động
            const scale = containerWidth / viewport.width;

            const scaledViewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            await page.render({ canvasContext: context, viewport: scaledViewport }).promise;

            canvas.style.width = '100%';
            canvas.style.height = 'auto';
            canvas.classList.add('mb-4', 'shadow', 'rounded-xl');

            pdfContainer.value.appendChild(canvas);
        }

        URL.revokeObjectURL(url);
    };

</script>

<style scoped>
    canvas {
        margin-bottom: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
</style>