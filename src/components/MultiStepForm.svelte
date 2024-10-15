<script lang="ts">
	import PreviewBackgroundBoard from './PreviewBackgroundBoard.svelte';
	import type { Image } from '$lib/types';
	import { initialBackgroundsSmall, initialBackgrounds } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Spinner from './SpinnerButton.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import { getPhotoByQuery } from '$lib/unsplashService';
	import Button from '$lib/components/ui/button/button.svelte';

	let searchUnsplashValue: string;
	let backgroundsUnsplash: Image[] = [];

	let active_step = 1;
	let selectedBackground = initialBackgrounds[0];
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

	const search = async (name: string) => {
		let response = await getPhotoByQuery(name);
		if (response) backgroundsUnsplash = response;
	};

	const handleBackgroundSelectedUnsplash = (image: string) => {
		selectedBackground = image;
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

	onMount(() => {
		const form = document.getElementById('form');
		const handleFormSubmit = (event) => {
			if (event.key === 'Enter') {
				event.preventDefault(); // Evitar el envío del formulario al presionar "Enter"
			}
		};

		// Agregar un event listener al documento para capturar el evento keydown
		form.addEventListener('keydown', handleFormSubmit);

		// Limpiar el event listener cuando el componente se desmonta
		return () => {
			form.removeEventListener('keydown', handleFormSubmit);
		};
	});
</script>

<form
	id="form"
	method="POST"
	action="?/createBoard"
	use:enhance={submitCreateBoard}
	class="h-full dark:text-[#b6c2cf]"
>
	<header>
		<h3 class="font-semibold text-lg -tracking-wider">Create Board</h3>
		<button type="button" on:click={() => dispatch('closeDialog')}>
			<CloseIcon />
		</button>
	</header>
	{#if active_step === 1}
		<div class="mx-[30px] card active">
			<label for="title" class="text-sm">Add board title *</label>
			<input
				autofocus
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
					<button
						type="button"
						on:click={() => (active_step += 1)}
						class="h-[32px] w-[50px] rounded-[8px] bg-[#f0f1f4] flex items-center justify-center transition-colors duration-150 hover:bg-[#dcdfe4]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="icon icon-tabler icons-tabler-outline icon-tabler-brand-unsplash"
							><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
								d="M4 11h5v4h6v-4h5v9h-16zm5 -7h6v4h-6z"
							/></svg
						>
					</button>
				</div>
			</div>
		</div>
	{:else if active_step === 3}
		<div class="flex flex-col justify-center gap-7 bg-grey-300">
			<div class="flex flex-row justify-center items-center gap-2">
				<div class="flex justify-center">
					<PreviewBackgroundBoard image={selectedBackground} />
				</div>
				<div class="h-[170px] max-h-[170px] max-w-[264px] w-[264px] overflow-auto">
					{#if backgroundsUnsplash}
						{#each backgroundsUnsplash as background}
							<button
								class="gap-4"
								type="button"
								on:click={() => handleBackgroundSelectedUnsplash(background.urls.full)}
							>
								<img
									class="h-[73px] w-[110px] rounded-[8px] object-cover ml-3"
									src={background.urls.small}
									alt={background.description}
								/>
							</button>
						{/each}
					{/if}
				</div>
			</div>
			<div class="flex items-center justify-center">
				<input
					class="pl-4 outline-none w-[440px] h-[36px] py-[8px] rounded-[8px] border border-gray-300"
					placeholder="Search photos..."
					bind:value={searchUnsplashValue}
					on:input={async () => await search(searchUnsplashValue)}
					type="search"
					name=""
					id=""
				/>
			</div>
		</div>
	{/if}
	<footer class="border-t bg-[#fafafa] dark:bg-[#282e33] dark:text-[#b6c2cf]">
		<menu>
			{#if active_step === 1}
				<button type="hidden"></button>
				<Button
					type="button"
					size="sm"
					variant="outline"
					class="text-[13px]"
					on:click={() => (active_step += 1)}
					disabled={!titleValue}>Next</Button
				>
			{:else}
				<Button
					type="button"
					size="sm"
					variant="outline"
					class="text-[13px]"
					on:click={() => (active_step -= 1)}>Previous</Button
				>

				{#if !loading}
					<Button
						type="submit"
						size="sm"
						variant="outline"
						class="text-[13px]"
						disabled={!selectedBackground}>Create</Button
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
