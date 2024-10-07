<script lang="ts">
	import { changeBackgroundRequest } from '$lib/requestsBackend';
	import type { Board, Image } from '$lib/types';
	import { getPhotoByQuery, getRandomImages } from '$lib/unsplashService';
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';

	let searchValue: string;
	let initialsBackground: Array<Image>;
	let backgrounds: Array<Image> = [];
	let sessionToken: string | undefined;

	const dispatch = createEventDispatcher();

	const search = async (name: string) => {
		let response = await getPhotoByQuery(name);
		if (response) backgrounds = response;
	};

	const changeBackground = async (image: string) => {
		console.log('imagen', image);
		await changeBackgroundRequest(sessionToken, $page.params.id, image).then(() => {
			console.log('dispatch event');
			dispatch('changeBackgroundUnplash'); // cambiar aqui la imagen
		});
	};

	onMount(async () => {
		initialsBackground = await getRandomImages(9);
		console.log(initialsBackground);
		backgrounds = initialsBackground;
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<Input
	type="search"
	placeholder="Search photos"
	bind:value={searchValue}
	on:input={async () => await search(searchValue)}
	class="w-full h-[32px] text-xs pl-4 border rounded-[8px] outline-none text-[#202020] border-[#E0E0E0]"
/>

<div class="mt-5 h-[570px] w-full grid grid-cols-2 gap-3 overflow-auto">
	{#if backgrounds}
		{#each backgrounds as image}
			<button on:click={async () => await changeBackground(image.urls.full)}>
				<img
					class="w-[150px] h-[96px] rounded-[8px] object-cover"
					src={image.urls.regular}
					alt={image.description}
				/>
			</button>
		{/each}
	{/if}
</div>
