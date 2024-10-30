<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import CloseIcon from './icons/CloseIcon.svelte';
	import PlusIcon from './icons/PlusIcon.svelte';
	import { enhance } from '$app/forms';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	export let notAllowModify: boolean;
	let button: HTMLButtonElement;
	let formContainer: HTMLDivElement;
	let inputTitleDom: HTMLElement; // $ a dom element
	let showForm: boolean = false;

	const dispatch = createEventDispatcher();

	const submitAddList: SubmitFunction = ({ formData, action, cancel }) => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dispatch('successAddList');
				await update(); // reset form values
				inputTitleDom.focus(); // focus in the input
			}
		};
	};

	const handleOutsideClick = (event: MouseEvent) => {
		console.log('click fuera');
		showForm = false;
		if (event.target === formContainer) showForm = false;
	};

	onMount(() => {
		formContainer?.addEventListener('click', handleOutsideClick);
	});

	onDestroy(() => {
		formContainer?.removeEventListener('click', handleOutsideClick);
	});
</script>

{#if !notAllowModify}
	<div class="relative">
		<button
			bind:this={button}
			id="btn"
			on:click={() => (showForm = true)}
			class="w-[272px] h-[35.5px] rounded-xl text-white text-[13px] flex items-center justify-around shadow-xl font-medium transition-colors duration-150 hover:bg-[#00000026]"
		>
			Add another list
			<PlusIcon className="h-5 w-5 stroke-white" />
		</button>

		{#if showForm}
			<div
				bind:this={formContainer}
				class="bg-[white] dark:bg-[#121212] w-[272px] h-[88px] rounded-xl flex items-center absolute top-0 left-0"
			>
				<form method="POST" action="?/createList" class="px-[10px]" use:enhance={submitAddList}>
					<input
						autofocus
						required
						name="title"
						bind:this={inputTitleDom}
						type="text"
						placeholder="Enter list title..."
						class="min-h-[20px] w-[250px] py-[6px] px-[12px] rounded-[5px] mb-[8px] text-[13px] bg-[#F5F5F5] dark:bg-[#1a1a1a] outline-none"
					/>
					<div class="flex items-center gap-[15px]">
						<button
							type="submit"
							class="h-[32px] text-[13px] font-medium text-white transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]"
							>Add list</button
						>
						<button on:click={() => (showForm = false)}>
							<CloseIcon />
						</button>
					</div>
				</form>
			</div>
		{/if}
	</div>
{/if}
