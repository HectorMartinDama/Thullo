<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	// Components
	import MultiStepForm from './MultiStepForm.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	let dialog: HTMLDialogElement;

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === dialog) dialog?.close();
	};

	onMount(() => {
		dialog?.addEventListener('click', handleOutsideClick);
	});

	onDestroy(() => {
		dialog?.removeEventListener('click', handleOutsideClick);
	});
</script>

<Button
	size="sm"
	variant="outline"
	class="bg-[#0C66E4] hover:bg-[#0055CC] text-white !text-white text-[13px] "
	on:click={() => dialog.showModal()}>Create board</Button
>

<section class="flex flex-row">
	<dialog bind:this={dialog} class="w-[500px] h-[400px] rounded-[8px]">
		<MultiStepForm on:closeDialog={() => dialog.close()} />
	</dialog>
</section>

<style>
	:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	dialog[open] {
		animation: fadeIn 0.2s ease-in-out forwards;
	}

	dialog:not([open]) {
		pointer-events: none;
		opacity: 0;
	}

	dialog {
		display: grid;
		margin: auto;
		padding: 0;
		position: fixed;
		inset: 0;
	}
</style>
