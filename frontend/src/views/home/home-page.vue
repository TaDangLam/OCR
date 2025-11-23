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
				@save-ocr-fields="handleSaveOCRFields"
				@cancel-ocr-fields="handleCancelOCRFields"
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
					@template-id="handleSetTemplateId"
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
	import { useMutation } from '@/libs/apollo-client.js';
	import { CREATE_MANY_OCR_FIELDS } from '@/graphql/index.js';
	const { accessToken } = useAuth();

    const router = useRouter();
	const { clearAuth } = useAuth(); 
	const templateFileLocal = ref(null);
	// const canUploadTemplate = ref(true);
	const canUploadFiles = ref(false);
	// const canAddOcrFields = ref(false);
	const uploadFiles = ref([]);
	const showOcrEditor = ref(false);
	const ocrBoxes = ref([]);
	const hideResetFilesButton = ref(false);
	const templateId = ref('');
	const { mutate: createMany } = useMutation(CREATE_MANY_OCR_FIELDS);

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
					fileId: templateId.value,
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
		// console.log('ocrBoxes.value: ', ocrBoxes.value);
	}

	const handleSetTemplateId = (id) => {
		templateId.value = id;
	}

	const handleSaveOCRFields = async() => {
		if (!templateId.value) {
			Notiflix.Report.warning("No template!", "Upload a template before saving.", "OK");
			return;
    	}

		if (ocrBoxes.value.length === 0) {
			Notiflix.Report.warning("Empty!", "No OCR fields to save.", "OK");
			return;
		}
		
		Notiflix.Confirm.show(
			'Confirm Save OCR Fields',
            `Are you sure you want to Save OCR Fields?`,
            'Yes',
            'No',
			async () => {
                Notiflix.Loading.circle('Save OCR Fields...');
                try {
					const fieldsPayload = ocrBoxes.value.map(box => ({
						fieldName: box.fieldName,
						x: box.x,
						y: box.y,
						width: box.width,
						height: box.height
					}));
                    await createMany(
						{
							fileId: templateId.value,
							fields: fieldsPayload
						},
						{
							context: {
								headers: {
									authorization: `Bearer ${accessToken.value}`
								}
							}
						}
					);
					showOcrEditor.value = false;
                    Notiflix.Loading.remove();
                    Notiflix.Notify.success('Save OCR Fields successfully!');
                } catch (err) {
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure('Save OCR Fields is failed!');
                    console.error('❌ Save OCR Fields is failed!: ', err.message);
                }
            },
            () => {
                Notiflix.Notify.info('Save OCR Fields Canceled');
            }
		);
	}

	const handleCancelOCRFields = () => {
		Notiflix.Confirm.show(
			'Cancel OCR Fields',
			'Are you sure you want to cancel all added OCR fields?',
			'Yes',
			'No',
			() => {
				ocrBoxes.value = [];
				showOcrEditor.value = false;
				Notiflix.Notify.success('All OCR fields have been cancelled.');
			},
			() => {
				
			}
		)
	}

</script>

<style scoped></style>
                        