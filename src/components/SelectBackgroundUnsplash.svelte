<script lang="ts">
	import type { Image } from '$lib/types';
	import { getPhotoByQuery } from '$lib/unsplashService';
	import { createEventDispatcher } from 'svelte';
	import BrandUnsplash from './icons/BrandUnsplash.svelte';
	import OptionsIcon from './icons/OptionsIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';

	let searchValue = '';
	let isOpen = false;
	let backgrounds: Image[] = [];

	const dispacth = createEventDispatcher();

	const search = async (name: string) => {
		let response = await getPhotoByQuery(name);
		if (response) backgrounds = response.results;
	};

	const handleBackgroundSelected = (image: string) => {
		dispacth('selectBackgroundUnsplash', image);
	};

	const unsplash = () => {
		dispacth('openUnsplash');
	};
</script>

<div class="relative">
	<button
		type="button"
		on:click={() => unsplash()}
		class="h-[32px] w-[40px] rounded-[8px] bg-[#f0f1f4] flex items-center justify-center transition-colors duration-150 hover:bg-[#dcdfe4]"
	>
		<OptionsIcon />
	</button>
	{#if isOpen}
		<button
			on:click={() => (isOpen = false)}
			tabindex="-1"
			class="fixed inset-0 h-full w-full cursor-default"
		></button>
	{/if}
	{#if isOpen}
		<div
			class="absolute right-0 mt-2 py-2 px-4 h-[504px] w-[304px] z-10 bg-[white] dark:bg-[#282E33] rounded-[12px] shadow-lg border border-[#E0E0E0]"
		>
			<header>
				<h3 class="text-center font-semibold text-[#44546F]">
					Fotos de <a href="https://unsplash.com" target="_blank">Unsplash</a>
				</h3>
			</header>

			<div>
				<SearchIcon />
				<input
					class="outline-none w-full h-[36px] py-[8px] border-2 border-gray-300 rounded-md"
					placeholder="Fotos"
					bind:value={searchValue}
					on:input={async () => await search(searchValue)}
					type="search"
					name=""
					id=""
				/>
			</div>

			<div class="grid grid-cols-2 gap-4 overflow-y-scroll h-full">
				{#if backgrounds}
					{#each backgrounds as image}
						<button type="button" on:click={() => handleBackgroundSelected(image.urls.full)}>
							<img
								class="rounded-[3px] w-[132px] h-[73px] object-cover"
								src={image.urls.small}
								alt={image.description}
							/>
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>
