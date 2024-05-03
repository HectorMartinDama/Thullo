<script lang="ts">
	import { onMount } from 'svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	export let notAllowModify: boolean;
	let button: HTMLButtonElement;
	let inputTitleDom: HTMLElement; // $ a dom element
	let showForm: boolean = false;

	$: if (showForm && inputTitleDom) focusInputTitle();

	const focusInputTitle = () => {
		inputTitleDom.focus();
	};
</script>

{#if !notAllowModify}
	<div class="relative">
		<button
			bind:this={button}
			id="btn"
			on:click={() => (showForm = true)}
			class="w-[272px] h-[44px] rounded-xl bg-[#ffffff5d] text-white text-[14px] flex items-center justify-around shadow-xl font-medium text-sm transition-colors duration-150 hover:bg-[#00000026]"
		>
			Add another list
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-plus"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="white"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path
					d="M5 12l14 0"
				/></svg
			>
		</button>

		{#if showForm}
			<div
				class="bg-[white] dark:bg-[#2b2a33] w-[272px] h-[88px] rounded-xl flex items-center absolute top-0 left-0"
			>
				<form method="POST" action="?/createList" class="px-[10px]">
					<input
						required
						name="title"
						bind:this={inputTitleDom}
						type="text"
						placeholder="Enter list title..."
						class="min-h-[20px] w-[250px] py-[6px] px-[12px] rounded-[5px] mb-[8px]"
					/>
					<div class="flex items-center gap-[15px]">
						<button
							type="submit"
							class="h-[32px] text-sm font-medium text-white transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]"
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
