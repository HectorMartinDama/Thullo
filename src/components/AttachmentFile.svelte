<script lang="ts">
	import type { AttachmentType } from '$lib/types';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { formatDate } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Delete, DownloadIcon, Trash } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { deleteAttachmentTaskRequest } from '$lib/requestsBackend';
	import { page } from '$app/stores';

	export let attachment: AttachmentType;
	let isHovered = false;
	let sessionToken: string | undefined;

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

	<div
		class="flex relative flex-row h-11 w-[350px] ml-[44px] items-center justify-between text-xs border py-3 px-2 rounded-md hover:bg-[#f1f1f1] transition-colors duration-150"
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
	>
		<a href={attachment.url} target="_blank" class="w-full">{attachment.name}</a>
		{#if isHovered && $page.data.session?.user?.email === attachment.user.email}
			<button
				on:click|preventDefault={() => deleteAttachmentTask()}
				class=" flex items-center justify-center rounded-md absolute h-[30px] w-[30px] bottom-1 right-1 bg-white"
			>
				<Trash class="h-3 w-3 stroke-[#b03d32]" />
			</button>
		{/if}
	</div>
</div>
