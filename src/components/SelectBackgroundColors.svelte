<script lang="ts">
	import { page } from '$app/stores';
	import { allInitialsBackgrounds } from '$lib';
	import { changeBackgroundRequest } from '$lib/requestsBackend';
	import { createEventDispatcher, onMount } from 'svelte';
	let sessionToken: string | undefined;
	const dispatch = createEventDispatcher();

	const changeBackground = async (image: string) => {
		console.log('imagen', image);
		await changeBackgroundRequest(sessionToken, $page.params.id, image).then(() => {
			dispatch('changeBackgroundColor'); // cambiar aqui la imagen
		});
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<div class="grid grid-cols-2 gap-3">
	{#each allInitialsBackgrounds as background}
		<button
			on:click={() => changeBackground(background)}
			type="submit"
			class="w-[150px] h-[96px] rounded-[8px]"
			style="background-image: url({background});"
		></button>
	{/each}
</div>
