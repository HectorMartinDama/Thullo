<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllAttachmentsBoard } from '$lib/requestsBackend';
	import { page } from '$app/stores';
	import type { AttachmentType } from '$lib/types';
	import Attachment from './Attachment.svelte';

	let attachments: AttachmentType[];
	let sessionToken: string | undefined;

	const getAttachments = async () => {
		attachments = await getAllAttachmentsBoard(sessionToken, $page.params.id);
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		getAttachments();
		return unsubcribe;
	});
</script>

{#if attachments}
	{#each attachments as attachment}
		<Attachment {attachment} />
	{/each}
{/if}
