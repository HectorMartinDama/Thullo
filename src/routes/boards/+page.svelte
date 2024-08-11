<script lang="ts">
	import { page } from '$app/stores';
	import { getAllBoard } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import BoardIcon from '../../components/icons/BoardIcon.svelte';
	import StarredIcon from '../../components/icons/StarredIcon.svelte';
	import CreateBoard from '../../components/CreateBoard.svelte';
	import GridBoards from '../../sections/GridBoards.svelte';
	import SkeletonBoard from '../../components/SkeletonBoard.svelte';
	import GridFavouritesBoards from '../../components/GridFavouritesBoards.svelte';
	export let data;

	let sessionToken: string | undefined;

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<svelte:head>
	<title>Boards | Thullo</title>
</svelte:head>

<main class="flex flex-col justify-center">
	<section class="w-[825px] mx-[180px]">
		<header class="flex justify-between items-center my-[25px] text-[#44546F] dark:text-[#9FADBC]">
			<h3 class="flex flex-row gap-5 font-bold text-[16px]">
				<BoardIcon className="h-6 w-6" />
				Your boards
			</h3>
			<div>
				<CreateBoard />
			</div>
		</header>

		{#await data.boards}
			<SkeletonBoard />
		{:then boards}
			<GridBoards {boards} />
			<GridFavouritesBoards {boards} />
		{/await}
	</section>
</main>

<style>
	main {
		height: calc(100vh - 68px);
	}
</style>
