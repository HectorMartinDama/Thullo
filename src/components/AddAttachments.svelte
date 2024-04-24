<script lang="ts">
	import {
		PUBLIC_AWS_SES_REGION,
		PUBLIC_ACCESS_KEY_ID,
		PUBLIC_SECRET_ACCESS_KEY
	} from '$env/static/public';
	import { Event, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import AddIcon from './icons/AddIcon.svelte';
	import { addAttachment } from '$lib/requestsBackend';

	export let taskId: string;
	let inputFile: HTMLInputElement;
	let sessionToken: string | undefined;

	const dispatch = createEventDispatcher();

	const s3Client = new S3Client({
		region: PUBLIC_AWS_SES_REGION,
		credentials: {
			accessKeyId: PUBLIC_ACCESS_KEY_ID,
			secretAccessKey: PUBLIC_SECRET_ACCESS_KEY
		}
	});

	async function uploadFileToS3(file) {
		const params = {
			Bucket: 'tullo',
			Key: 'files/' + file.name,
			Body: file
		};

		const command = new PutObjectCommand(params);

		try {
			const response = await s3Client.send(command);
			const bucketUrl = `https://${params.Bucket}.s3.amazonaws.com/`;
			const fileUrl = bucketUrl + encodeURIComponent(params.Key);

			if (response.$metadata.httpStatusCode === 200) {
				// cuando se suba a s3 lo guardo en la base de datos
				await addAttachment(sessionToken, taskId, file.name, params.Key, fileUrl);
				dispatch('addedAttachment');
			}
		} catch (error) {
			console.error('Error al subir archivo a S3:', error);
		}
	}

	async function handleFileUpload(event: Event) {
		const file = event.target.files[0];
		console.log(file);
		if (file) {
			await uploadFileToS3(file);
		}
	}

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<input type="file" class="hidden" on:change={handleFileUpload} bind:this={inputFile} />
<button
	on:click={() => inputFile.click()}
	class="py-1 px-3 rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center gap-[7px] transition-colors duration-150 hover:bg-[#dcdfe4]"
>
	<AddIcon color={'#BDBDBD'} />
	Add
</button>
