<script lang="ts">
	import PreviewBackgroundBoard from './PreviewBackgroundBoard.svelte';
	import { initialBackgroundsSmall, initialBackgrounds } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import SelectBackgroundUnsplash from './SelectBackgroundUnsplash.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import Spinner from './SpinnerButton.svelte';

	let active_step = 1;
	let selectedBackground: string;
	let loading: boolean;
	let titleValue: string;
	let visibilityValue: string;
	let descriptionValue: string;
	let unsplashService = false;
	let isHovered = false;

	const dispatch = createEventDispatcher();

	const handleBackgroundSelected = (index: number) => {
		selectedBackground = initialBackgrounds[index];
	};

	const submitCreateBoard: SubmitFunction = ({ formData, cancel }) => {
		if (!titleValue) cancel();
		formData.append('background', selectedBackground);
		formData.append('title', titleValue.trim());
		formData.append('visibility', visibilityValue);
		if (descriptionValue) formData.append('description', descriptionValue);
		loading = true;

		return async ({ result, update }) => {
			loading = false;
			await update(); // no hay que ponerlo porque se va a redirigir al usuario al tablero
		};
	};
</script>

<form
	method="POST"
	action="?/createBoard"
	use:enhance={submitCreateBoard}
	class="h-full dark:text-[#b6c2cf]"
>
	<header>
		<h3 class="font-semibold text-2xl">Create Board</h3>
		<button type="button" on:click={() => dispatch('closeDialog')}>
			<CloseIcon />
		</button>
	</header>
	{#if active_step === 1}
		<div class="mx-[30px] card active">
			<label for="title" class="text-sm">Add board title *</label>
			<input
				type="text"
				name="title"
				id="title"
				required
				class="w-full text-sm py-2 px-2 outline-none border rounded-[8px] mb-4 dark:border-[#b6c2cf]"
				bind:value={titleValue}
			/>
			<label for="description" class="text-sm">Add description board</label>
			<textarea
				name="description"
				id=""
				class="w-full text-sm py-2 px-2 outline-none border rounded-[8px] mb-4 resize-none dark:border-[#b6c2cf]"
				bind:value={descriptionValue}
			></textarea>

			<div class="flex justify-between items-center">
				<label for="visibility" class="text-sm">Choose the visibility of the board</label>
				<select
					name="visibility"
					id="visibility"
					bind:value={visibilityValue}
					class="py-2 px-3 text-sm rounded-[8px] border dark:border-[#b6c2cf]"
				>
					<option value="private" selected>Private</option>
					<option value="public">Public</option>
				</select>
			</div>
		</div>
	{:else if active_step === 2}
		<div class="flex flex-col justify-center gap-7">
			<div class="flex justify-center">
				<PreviewBackgroundBoard image={selectedBackground} />
			</div>
			<div class="" id="background-picker">
				<div class="grid grid-rows-1 grid-flow-col gap-[5px] justify-center">
					<button class="w-[64px] h-[40px]">Hoal</button>
				</div>
				<div class="grid grid-rows-1 grid-flow-col gap-[5px] justify-center">
					{#each initialBackgroundsSmall as background, index}
						<button
							class="relative backHover cursor-pointer h-[32px] w-[40px] rounded-[3px]"
							type="button"
							on:mouseenter={() => (isHovered = true)}
							on:mouseleave={() => (isHovered = false)}
							class:selected={selectedBackground === background}
							on:click={() => {
								handleBackgroundSelected(index);
							}}
						>
							<img
								id="background"
								class="h-[32px] w-[40px] bg-cover rounded-[4px]"
								src={background}
								alt=""
							/>
						</button>
					{/each}
					<button type="button" on:click={() => (active_step += 1)}>Abrir</button>
					<SelectBackgroundUnsplash
						on:selectBackgroundUnsplash={(e) => (selectedBackground = e.detail)}
						on:openUnsplash={() => (unsplashService = true)}
					/>
				</div>
			</div>
		</div>
	{:else if active_step === 3}{/if}
	<footer class="border-t bg-[#fafafa] dark:bg-[#282e33] dark:text-[#b6c2cf]">
		<menu>
			{#if active_step === 1}
				<button type="hidden"></button>
				<button
					type="button"
					on:click={() => (active_step += 1)}
					class="py-2 px-3 text-sm rounded-[8px] border dark:border-[#b6c2cf] transition-colors duration-150 dark:bg-[#323940] hover:bg-[#F0F1F4] font-normal dark:hover:bg-[#3d4750]"
					disabled={!titleValue}>Next</button
				>
			{:else}
				<button
					type="button"
					on:click={() => (active_step -= 1)}
					class="py-2 px-3 text-sm rounded-[8px] border dark:border-[#b6c2cf] transition-colors duration-150 dark:bg-[#323940] hover:bg-[#F0F1F4] font-normal dark:hover:bg-[#3d4750]"
					>Previous</button
				>

				{#if !loading}
					<button
						type="submit"
						class="py-2 px-3 text-sm rounded-[8px] font-normal border dark:border-[#b6c2cf] transition-colors duration-150 hover:bg-[#F0F1F4]"
						disabled={!selectedBackground}>Create</button
					>
				{:else}
					<Spinner textContent="Creating..." />
				{/if}
			{/if}
		</menu>
	</footer>
</form>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		padding-inline: 30px;
		padding-block: 20px;
	}

	footer > menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		padding-inline-start: 0;
	}

	form {
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: start;
		max-block-size: 80vh;
		max-block-size: 80dvb;
	}

	form > header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-block: 30px;
		padding-inline: 30px;
	}
</style>
