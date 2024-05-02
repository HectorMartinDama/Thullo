<script lang="ts">
	import { addScript } from '$lib';
	import type { Board } from '$lib/types';
	import { quintInOut } from 'svelte/easing';
	import StarIcon from './icons/StarIcon.svelte';
	import { slide } from 'svelte/transition';
	export let board: Board;
	let isHovered = false;
	let buttonStarVisible = false;

	const showButton = () => {
		buttonStarVisible = true;
	};

	const hideButton = () => {
		buttonStarVisible = false;
	};
</script>

<a
	href="b/{board.id}/{addScript(board.title)}"
	data-sveltekit-preload-data="hover"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	class="relative overflow-hidden flex flex-col justify-between w-[193px] h-[112px] rounded-[5px] py-[5px] px-[5px] cursor-pointer bg-cover bg-center bg-no-repeat transition-opacity duration-300"
	style="background-image: url({board.background})"
>
	<div
		style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.1); transition: opacity 0.3s"
		class:hidden={!isHovered}
	></div>
	<header class="z-10">
		<h3 class="font-bold text-[16px] text-[white]">{board.title}</h3>
	</header>

	<footer class="flex flex-row items-center min-h-[28px]">
		{#if board.members}
			{#each board.members as member}
				<img
					src={member.image}
					alt="image profile of {member.name}"
					class="h-[28px] w-[28px] rounded-full"
				/>
			{/each}
		{/if}
		{#if isHovered}
			<button
				type="button"
				class="boton"
				transition:slide={{ delay: 150, duration: 150, easing: quintInOut, axis: 'x' }}
			>
				<StarIcon />
			</button>
		{/if}
	</footer>
</a>

<style lang="css">
	.boton {
		position: absolute;
		right: -60px;
		opacity: 0;
		transition:
			right 0.3s ease-in-out,
			opacity 0.3s ease-in-out;
	}

	a:hover .boton {
		right: 15px; /* Posición final dentro del div */
		opacity: 1;
	}
</style>
