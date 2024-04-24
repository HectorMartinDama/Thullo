<script lang="ts">
	import {
		PUBLIC_AWS_SES_REGION,
		PUBLIC_ACCESS_KEY_ID,
		PUBLIC_SECRET_ACCESS_KEY
	} from '$env/static/public';
	import { page } from '$app/stores';
	import type { Attachment } from '$lib/types';
	import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
	import { onMount } from 'svelte';

	export let attachment: Attachment;
	let sessionToken: string | undefined;

	const s3Client = new S3Client({
		region: PUBLIC_AWS_SES_REGION,
		credentials: {
			accessKeyId: PUBLIC_ACCESS_KEY_ID,
			secretAccessKey: PUBLIC_SECRET_ACCESS_KEY
		}
	});

	async function deleteObjectFromS3(key: string) {
		const params = {
			Bucket: 'tullo',
			Key: key
		};

		const command = new DeleteObjectCommand(params);

		try {
			const response = await s3Client.send(command);
			if (response.$metadata.httpStatusCode === 204) {
				// elimino de la base de datos
				console.log('todo ha ido bn');
			}
			console.log('Objeto eliminado de S3:', response);
		} catch (error) {
			console.error('Error al eliminar objeto de S3:', error);
			// Manejo de errores
		}
	}

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<div class="flex flex-row items-center gap-6 mb-4">
	<div class="w-[120px] h-[70px] bg-[#E0E0E0] rounded-[8px]"></div>
	<div>
		<span class="text-xs text-[#BDBDBD]">{attachment.createdAt}</span>
		<h2 class="font-semibold text-sm mb-2">{attachment.name}</h2>
		<!-- Botones -->
		<div class="flex flex-row gap-[7px]">
			<a href={attachment.url} download={attachment.name} target="_blank">
				<button
					class="h-[30px] w-[90px] rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center text-sm transition-colors duration-150 hover:bg-[#dcdfe4]"
					>Download</button
				>
			</a>
			<button
				on:click={() => deleteObjectFromS3(attachment.key)}
				class="h-[30px] w-[90px] rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center text-sm transition-colors duration-150 hover:bg-[#dcdfe4]"
				>Delete</button
			>
		</div>
	</div>
</div>
