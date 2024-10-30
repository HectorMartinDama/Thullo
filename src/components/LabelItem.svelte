<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { page } from '$app/stores';
	import { deleteLabelTask } from '$lib/requestsBackend';
	import type { Label } from '$lib/types';

	export let id: string;
	export let label: Label;
	let sessionToken: string | undefined;

	console.log(label);

	const dispatch = createEventDispatcher();

	const deleteLabel = async () => {
		await deleteLabelTask(sessionToken, id, label._id);
		dispatch('deleteLabel');
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<span
	aria-label="remove label"
	class="inline-flex items-center px-2 py-1 me-2 text-xs text-[#202020] bg-[#D9D7D5] rounded"
>
	{label.title}
	<button
		on:click={() => {
			deleteLabel();
		}}
		type="button"
		class="inline-flex items-center p-1 ms-2 bg-transparent rounded-sm hover:bg-[#bebdbc]"
		data-dismiss-target="#badge-dismiss-default"
		aria-label="Remove"
	>
		<CloseIcon className="h-3 w-3" />
	</button>
</span>
