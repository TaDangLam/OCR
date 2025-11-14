<template>
	<div class="flex flex-col gap-3 px-25 pt-10 min-h-screen">
		<div class="flex items-center justify-end">
			<div class="cursor-pointer" @click="logout">tadanglam</div>
		</div>
		<div class="gap-10 w-full bg-gray-100 rounded-lg p-3">
			<Navbar 
				@update-template="templateFileLocal = $event"
				@update-files="handleUploadFiles"
				@open-ocr-editor="showOcrEditor = true"
				@add-ocr-box="handleAddOcrBasicBox"
				:showOcrEditor="showOcrEditor"
				:can-upload-files="canUploadFiles"
			/>
		</div>
		<div class="flex gap-3 w-full">
			<div class="bg-blue-100 w-1/2 p-3 rounded-lg">
				<FileReview 
					@can-upload-files="handleCanUploadFiles"
					:templateFileLocal="templateFileLocal"
					:uploadFiles="uploadFiles"
					:showOcrEditor="showOcrEditor"
					:ocrBoxes="ocrBoxes"
				/>
			</div>

			<div class="bg-blue-100 w-1/2 p-3 rounded-lg">
				<OcrResult />
			</div>

		</div>
	</div>
</template>

<script setup>
	import { ref } from '@/libs/vue-export.js';
	import Navbar from '@/components/nav-bar.vue';
	import FileReview from '@/components/file-preview.vue';
	import OcrResult from '@/components/ocr-result.vue';
	import { useAuth } from '@/libs/use-auth.js';
	import { useRouter } from "vue-router";

    const router = useRouter();
	const { clearAuth } = useAuth(); 
	const templateFileLocal = ref(null);
	const canUploadFiles = ref(false);
	const uploadFiles = ref([]);
	const showOcrEditor = ref(false);
	const ocrBoxes = ref([]);
	
	const logout = () => {
		clearAuth();
		router.push('/login');
	}

	const handleCanUploadFiles = (event) => {
		canUploadFiles.value = event;
	}

	const handleUploadFiles = (event) => {
		uploadFiles.value = event;
	}

	const handleAddOcrBasicBox = () => {
    	// tạo box basic 100x100 ở vị trí default
		ocrBoxes.value.push({
			id: Date.now(),
			x: 50,
			y: 50,
			width: 100,
			height: 40,
			fieldName: "fielName",
		});
	};
</script>

<style scoped></style>
                        