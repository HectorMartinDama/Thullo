<script lang="ts">
	import { labelColors } from '$lib';
	import TagIcon from '../components/icons/TagIcon.svelte';

	let isOpen = false;
	let labelTitle: string = '';
	let colorSelected: string;

	const selectLabel = (color: string) => {
		colorSelected = color;
	};
</script>

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="bg-[#F2F2F2] text-[#828282] rounded-[8px] w-[150px] h-[32px] flex items-center gap-[10px] pl-[15px]"
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

			<input
				type="text"
				class="w-full h-[32px] outline-none rounded-[8px] text-[#BDBDBD] border border-[#E0E0E0] pl-[10px]"
				placeholder="Label..."
				bind:value={labelTitle}
			/>

			<div class="gap-2 mt-[15px] grid grid-cols-4 h-[100px]">
				{#if labelColors}
					{#each labelColors as color}
						<button on:click={() => selectLabel(color)}>
							<div class="rounded-[4px] w-[50px] h-[27px]" style="background-color: {color};"></div>
						</button>
					{/each}
				{/if}
			</div>

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
