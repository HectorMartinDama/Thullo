<script lang="ts">
	import { goto } from '$app/navigation';
	import { addScript } from '$lib';
	import type { Board } from '$lib/types';
	export let board: Board;
	let isHovered = false;

	const navigateToBoard = async (board: Board) => {
		const titleToScript = await addScript(board.title);
		goto(`b/${board.id}/${titleToScript}`);
	};
</script>

<a
	href="b/{board.id}/{addScript(board.title)}"
	data-sveltekit-preload-data="hover"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	class="relative flex flex-col justify-between w-[193px] h-[112px] rounded-[5px] py-[5px] px-[5px] cursor-pointer bg-cover bg-center bg-no-repeat transition-opacity duration-300"
	style="background-image: url({board.background})"
>
	<div
		style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.1); transition: opacity 0.3s"
		class:hidden={!isHovered}
	></div>
	<header class="z-10">
		<h3 class="font-bold text-[16px] text-[white]">{board.title}</h3>
	</header>

	<footer class="flex flex-row">
		{#if board.members}
			{#each board.members as member}
				<img
					src={member.image}
					alt="image profile of {member.name}"
					class="h-[28px] w-[28px] rounded-full"
				/>
			{/each}
		{/if}
	</footer>
</a>

<style lang="css"></style>
