<template >
    <div class="flex w-full">
        <div v-if="!templateFileLocal" class="flex justify-center p-3 border rounded-lg bg-gray-50 w-full">
            <div>No files selected!!</div>
        </div>

        <div v-else-if="templateFileLocal.type !== 'application/pdf'">
            <div>Only supports PDF file preview. ( Current file: <b>{{ templateFileLocal.type || 'Undefine' }}</b> )</div>
        </div>

        <div v-else class="flex flex-col gap-2 w-full">
            <div class="bg-gray-100 border border-gray-300 rounded-lg p-1.5 w-full">
                <div><strong>File Name:</strong> {{ templateFileLocal.name }}</div>
                <div><strong>Type:</strong> {{ templateFileLocal.type || 'Không rõ' }}</div>
                <div><strong>Size:</strong> {{ (templateFileLocal.size / 1024).toFixed(2) }} KB</div>
            </div>
            <div ref="pdfContainer" class="rounded-lg p-2 overflow-auto max-h-[85vh] flex flex-col items-center">
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick  } from '@/libs/vue-export.js';
    import { pdfjsLib } from '@/libs/pdf';

    const pdfContainer = ref(null);

    const props = defineProps({
        templateFileLocal: File
    });

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
    // watch(
    //     () => props.templateFileLocal,
    //     (newVal, oldVal) => {
    //         console.log('📁 File mới được chọn:', newVal)
    //         console.log('📁 File cũ:', oldVal)
    //     }
    // )
</script>

<style scoped>
    canvas {
        margin-bottom: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
</style>