<script lang="ts">
	import { labelColors } from '$lib';
	import { list } from 'postcss';
	import TagIcon from '../components/icons/TagIcon.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	export let taskId: string;
	let isOpen = false;
	let labelTitle: string = '';
	let colorSelected: string;
	const dispatch = createEventDispatcher();

	const submitCreateLabel: SubmitFunction = ({ formData }) => {
		formData.append('color', colorSelected);
		return async ({ result, update }) => {
			dispatch('addTask');
			await update(); // no hay que ponerlo porque se va a redirigir al usuario al tablero
		};
	};

	const selectLabel = (color: string) => {
		colorSelected = color;
	};
</script>

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="bg-[#f0f1f4] text-[#828282] dark:bg-[#323940] dark:text-[#B6C2CF] rounded-[8px] w-[150px] h-[32px] flex items-center gap-[10px] pl-[15px] transition-colors duration-150 dark:hover:bg-[#3d4750] hover:bg-[#dcdfe4]"
	>
		<TagIcon />
		Labels
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
			class="absolute right-0 mt-2 py-2 px-4 w-[245px] h-[300px] z-10 bg-[white] dark:bg-[#282E33] rounded-[12px] shadow-xl border border-[#E0E0E0]"
		>
			<header class="mb-[15px]">
				<h3 class="font-semibold text-[#4F4F4F]">Label</h3>
				<span class="text-[#828282] text-sm">Select a name and a color</span>
			</header>

			<form action="?/addLabelTask" method="post" use:enhance={submitCreateLabel}>
				<input
					type="text"
					class="w-full text-sm h-[32px] outline-none rounded-[8px] text-[#BDBDBD] border border-[#E0E0E0] pl-[10px]"
					placeholder="Label..."
					bind:value={labelTitle}
					name="title"
				/>

				<input type="hidden" name="id" value={taskId} />

				<div class="gap-2 mt-[15px] grid grid-cols-4 h-[100px]">
					{#if labelColors}
						{#each labelColors as color}
							<button type="button" on:click={() => selectLabel(color)}>
								<div
									class="rounded-[4px] w-[50px] h-[27px]"
									style="background-color: {color};"
								></div>
							</button>
						{/each}
					{/if}
				</div>
			</form>

			<footer class="flex justify-center">
				<button
					type="submit"
					disabled={!colorSelected || labelTitle === ''}
					class="bg-[#2F80ED] text-white rounded-[8px] h-[30px] w-[74px]">Add</button
				>
			</footer>
		</div>
	{/if}
</div>

<style>
	:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
