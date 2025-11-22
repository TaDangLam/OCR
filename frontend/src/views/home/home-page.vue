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
				:hide-reset="hideResetFilesButton"
			/>
		</div>
		<div class="flex gap-3 w-full">
			<div class="bg-blue-100 w-1/2 p-3 rounded-lg">
				<FileReview 
					@can-upload-files="handleCanUploadFiles"
					@update-boxes="handleOcrBoxes"
					@uploaded-bulk-success="handleUploadedBulkSuccess"
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
	import { Notiflix } from '@/libs/notiflix.js';

    const router = useRouter();
	const { clearAuth } = useAuth(); 
	const templateFileLocal = ref(null);
	const canUploadFiles = ref(false);
	const uploadFiles = ref([]);
	const showOcrEditor = ref(false);
	const ocrBoxes = ref([]);
	const hideResetFilesButton = ref(false);
	
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

	const handleUploadedBulkSuccess = () => {
		hideResetFilesButton.value = true;
	}

	const handleAddOcrBasicBox = () => {
		Notiflix.Confirm.prompt(
			'Add OCR Field',
			'Enter the field name:',
			'',
			'OK',
			'Cancel',
			(value) => {
				if (!value) {
					Notiflix.Report.warning('Field name cannot be empty!', 'Please enter field name', 'OK');
					return;
				}

				ocrBoxes.value.push({
					id: Date.now(),
					x: 50,
					y: 50,
					width: 150,
					height: 40,
					fieldName: value,
				});
			},
			() => {
				// Cancel action
			}
		);
	};

	const handleOcrBoxes = (ocrBox) => {
		ocrBoxes.value = ocrBox;
	}
</script>

<style scoped></style>
                        