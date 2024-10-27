<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	import type { AttachmentType } from '$lib/types';
	import { formatDate, isImage } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import AttachmentFile from './AttachmentFile.svelte';
	import AttachmentImage from './AttachmentImage.svelte';

	export let attachments: AttachmentType[];

	const dispatch = createEventDispatcher();

	const refresh = async () => {
		dispatch('removedAttachment');
	};
</script>

<Accordion.Root class="w-full">
	<Accordion.Item value="item-1">
		<Accordion.Trigger class="flex-row items-center jus gap-0 text-[13px]">
			Attachments
			{attachments.length}
		</Accordion.Trigger>

		<Accordion.Content class="w-full">
			{#each attachments as attachment}
				{#if isImage(attachment.url)}
					<AttachmentImage {attachment} on:deleteAttachment={refresh} />
				{:else}
					<AttachmentFile {attachment} on:deleteAttachment={refresh} />
				{/if}
			{/each}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
