<script lang="ts">
	import { getAllBoard } from '$lib/requestsBackend';
	import type { Board } from '$lib/types';
	import { onMount } from 'svelte';
	import PreviewBoard from '../components/PreviewBoard.svelte';
	import { page } from '$app/stores';

	let sessionToken: string | undefined;
	export let boards: Board[];

	const updateBoards = async () => {
		boards = await getAllBoard(sessionToken);
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<div class="grid grid-cols-4 gap-[16.5px] mb-10">
	{#each boards as board}
		<PreviewBoard {board} on:addToFavourite={updateBoards} />
	{/each}
</div>
