<script lang="ts">
	import { onMount } from 'svelte';
	import { initialBackgrounds } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	// Components
	import SelectBackgroundUnsplash from './SelectBackgroundUnsplash.svelte';
	import PreviewBackgroundBoard from './PreviewBackgroundBoard.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import MultiStepForm from './MultiStepForm.svelte';

	let active_step: number = 1;
	let loading = false; // spinner fetch put
	let dialog: HTMLDialogElement;
	let selectedBackground: string = 'https://images.unsplash.com/photo-1699775292727-06fabf36730d'; // default background

	$: if (selectedBackground) console.log('', selectedBackground);

	const handleBackgroundSelected = (background: string) => {
		selectedBackground = background;
	};

	const submitCreateBoard: SubmitFunction = ({ formElement, formData, action, cancel }) => {
		const { title } = Object.fromEntries(formData);
		if (!title) cancel();
		formData.append('background', selectedBackground);
		loading = true;

		return async ({ result, update }) => {
			loading = false;
			await update(); // no hay que ponerlo porque se va a redirigir al usuario al tablero
		};
	};

	const closeDialog = () => {
		active_step = 1;
		dialog.close();
	};

	onMount(() => {
		// poner focus el input title al abrir el componente
		const title = document.getElementById('title');
		title?.focus();
	});
</script>

<button
	class="text-sm px-2 py-2 bg-[#0C66E4] hover:bg-[#0055CC] rounded-[8px] text-white"
	on:click={() => dialog.showModal()}>Create board</button
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
