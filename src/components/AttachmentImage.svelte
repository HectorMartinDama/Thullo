<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { AttachmentType } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Trash } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import { deleteAttachmentTaskRequest } from '$lib/requestsBackend';

	export let attachment: AttachmentType;
	let sessionToken: string | undefined;

	let isHovered = false;

	const dispatch = createEventDispatcher();

	const deleteAttachmentTask = async () => {
		await deleteAttachmentTaskRequest(sessionToken, $page.params.id, attachment.name);
		dispatch('deleteAttachment');
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<div class="gap-4 mb-8">
	<div class="flex gap-3">
		<Avatar.Root class="h-8 w-8">
			<Avatar.Image src={attachment.user.image} alt={attachment.user.name} />
			<Avatar.Fallback>{attachment.user.name.split('')[0]}</Avatar.Fallback>
		</Avatar.Root>
		<p class="text-[13px] font-medium">
			{attachment.user.name}
			<span class="ml-2 text-xs text-[#808080] font-light"
				>{formatDate(attachment.createdAt.toString())}</span
			>
		</p>
	</div>

	<div class="">
		<a
			href={attachment.url}
			target="_blank"
			class="relative inline-block z-0"
			on:mouseenter={() => (isHovered = true)}
			on:mouseleave={() => (isHovered = false)}
		>
			<img
				src={attachment.url}
				alt={attachment.name}
				class="h-[200px] ml-[44px] flex items-center rounded-lg hover:bg-[#f1f1f1]"
			/>
			{#if isHovered && $page.data.session?.user?.email === attachment.user.email}
				<button
					on:click|preventDefault={() => deleteAttachmentTask()}
					class=" flex items-center justify-center rounded-md absolute h-[30px] w-[30px] bottom-1 right-1 bg-white"
				>
					<Trash class="h-3 w-3 stroke-[#b03d32]" />
				</button>
			{/if}
		</a>
	</div>
</div>
