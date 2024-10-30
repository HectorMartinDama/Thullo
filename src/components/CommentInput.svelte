<script lang="ts">
	import {
		PUBLIC_AWS_SES_REGION,
		PUBLIC_ACCESS_KEY_ID,
		PUBLIC_SECRET_ACCESS_KEY
	} from '$env/static/public';
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import PaperClipIcon from './icons/PaperClipIcon.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Event, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

	import { Input } from '$lib/components/ui/input/index.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { addAttachment } from '$lib/requestsBackend';

	let fileInputRef: HTMLInputElement;
	let sessionToken: string | undefined;
	let taskId = $page.params.id;

	const dispatch = createEventDispatcher();

	const s3Client = new S3Client({
		region: PUBLIC_AWS_SES_REGION,
		credentials: {
			accessKeyId: PUBLIC_ACCESS_KEY_ID,
			secretAccessKey: PUBLIC_SECRET_ACCESS_KEY
		}
	});

	const uploadFileToS3 = async (file: File) => {
		const params = {
			Bucket: 'thullo-files',
			Key: 'files/' + file.name,
			Body: file,
			ContentType: file.type
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
	};

	const handleFileChange = async (e: Event) => {
		const file = event?.target?.files?.[0];
		if (file) {
			await uploadFileToS3(file);
			dispatch('addedAttachment');
		}
	};

	const handleButtonClick = () => {
		fileInputRef.click();
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<form action="" method="post" class="flex flex-row items-center gap-3 my-4">
	<Avatar.Root class="h-8 w-8">
		<Avatar.Image src={$page.data.session?.user?.image} alt="profile picture" />
		<Avatar.Fallback class="text-sm">{$page.data.session?.user?.name?.split('')[0]}</Avatar.Fallback
		>
	</Avatar.Root>
	<div class="flex flex-row items-center gap-3">
		<Input
			type="text"
			placeholder="Write a comment..."
			class="max-w-xs outline-none focus-visible:ring-transparent w-[300px] text-xs rounded-[15px] h-8 transition-colors duration-150"
			autocomplete="off"
		/>

		<div class="flex flex-col items-center">
			<input
				bind:this={fileInputRef}
				type="file"
				class="hidden"
				aria-label="Upload a file"
				on:change={handleFileChange}
			/>
			<Tooltip.Root portal={null}>
				<Tooltip.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						size="icon"
						class="h-8 w-8"
						on:click={handleButtonClick}
					>
						<PaperClipIcon className="h-4 w-4 stroke-1" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p class="text-xs text-[#666]">Attach Files</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
</form>
