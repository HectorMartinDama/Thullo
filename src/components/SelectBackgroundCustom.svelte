<script lang="ts">
	import { page } from '$app/stores';
	import { changeBackgroundRequest } from '$lib/requestsBackend';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Event, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
	import {
		PUBLIC_AWS_SES_REGION,
		PUBLIC_ACCESS_KEY_ID,
		PUBLIC_SECRET_ACCESS_KEY
	} from '$env/static/public';

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

	async function uploadImageToS3(file) {
		const params = {
			Bucket: 'tullo',
			Key: 'backgrounds/' + file.name,
			Body: file
		};

		const command = new PutObjectCommand(params);

		try {
			const response = await s3Client.send(command);
			const bucketUrl = `https://${params.Bucket}.s3.amazonaws.com/`;
			const fileUrl = bucketUrl + encodeURIComponent(params.Key);

			if (response.$metadata.httpStatusCode === 200) {
				await changeBackground(fileUrl);
			}
		} catch (error) {
			console.error('Error al subir archivo a S3:', error);
		}
	}

	async function handleFileUpload(event: Event) {
		const file = event.target.files[0];
		console.log(file);
		if (file) {
			await uploadImageToS3(file);
		}
	}

	const changeBackground = async (image: string) => {
		console.log('imagen seleccionada', image);
		if (image) {
			await changeBackgroundRequest(sessionToken, $page.params.id, image).then(() => {
				console.log('dispatch event');
				dispatch('changeBackgroundCustom'); // cambiar aqui la imagen
			});
		}
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<input
	type="file"
	accept="image/*"
	class="hidden"
	on:change={handleFileUpload}
	bind:this={inputFile}
/>

<button
	on:click={() => inputFile.click()}
	class="flex justify-center items-center w-[150px] h-[96px] rounded-[8px] bg-[#dadde2] dark:bg-[#22272b] text-[#b6c2cf] transition-colors duration-150 dark:hover:bg-[#323940]"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
		><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path
			d="M5 12l14 0"
		/></svg
	>
</button>
