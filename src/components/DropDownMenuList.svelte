<script lang="ts">
	import type { List } from '$lib/types';
	import OptionsIcon from './icons/OptionsIcon.svelte';

	export let list: List;
	let isOpen = false;
</script>

<div class="relative z-20">
	<button on:click={() => (isOpen = !isOpen)}>
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
			class="absolute right-0 mt-2 py-2 w-44 bg-white dark:bg-[#282E33] dark:text-[#B6C2CF] rounded-[12px] shadow-xl border border-[#E0E0E0]"
		>
			<div class="block px-4 py-2 text-[#828282] dark:text-[#B6C2CF] -tracking-[3.5%] text-sm">
				<form method="POST" action="?/deleteList">
					<input type="hidden" name="id" id="id" value={list.id} />
					<button type="submit">Delete this</button>
				</form>
			</div>
		</div>
	{/if}
</div>
