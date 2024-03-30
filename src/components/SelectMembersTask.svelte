<script lang="ts">
	import GroupIcon from '../components/icons/GroupIcon.svelte';
	let isOpen = false;
	let userValue: string = '';

	const search = (userValue: string) => {};
</script>

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="bg-[#F2F2F2] text-[#828282] rounded-[8px] w-[150px] h-[32px] flex items-center pl-[15px] gap-[10px]"
	>
		<GroupIcon />
		Members
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
			class="absolute right-0 mt-2 py-2 px-4 z-10 w-[245px] h-[300px] bg-[white] dark:bg-[#282E33] rounded-[12px] shadow-xl border border-[#E0E0E0]"
		>
			<header class="mb-[15px]">
				<h3 class="font-semibold text-[#4F4F4F]">Photo Search</h3>
				<span class="text-[#828282] text-sm">Search Unsplash for photos</span>
			</header>

			<input
				type="search"
				class="w-full h-[32px] outline-none rounded-[8px] text-[#BDBDBD] border border-[#E0E0E0] pl-[10px]"
				placeholder="User..."
				bind:value={userValue}
				on:input={async () => await search(userValue)}
			/>

			<div class="gap-2 mt-[15px] grid grid-cols-4 overflow-y-auto h-[170px]">
				<!-- {#if covers}
					{#each covers as image}
						<button on:click={() => selectCover(image.urls.full)}>
							<img
								class="rounded-[4px] w-[50px] h-[50px] object-cover"
								src={image.urls.small}
								alt={image.description}
							/>
						</button>
					{/each}
				{/if} -->
			</div>
		</div>
	{/if}
</div>
