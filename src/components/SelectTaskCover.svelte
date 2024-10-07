<script lang="ts">
	import { addCoverTask } from '$lib/requestsBackend';
	import type { Image } from '$lib/types';
	import { getPhotoByQuery } from '$lib/unsplashService';
	import { createEventDispatcher, onMount } from 'svelte';
	import ImageIcon from '../components/icons/ImageIcon.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';

	import * as Popover from '$lib/components/ui/popover/index.js';

	import { page } from '$app/stores';
	import PlusIcon from './icons/PlusIcon.svelte';
	let isOpen = false;
	let loading = true;
	let covers: Image[] = [];
	let searchValue: string;
	let sessionToken: string | undefined;
	export let taskId: string;

	const dispatch = createEventDispatcher();

	const search = async (searchValue: string) => {
		let results = await getPhotoByQuery(searchValue);
		if (results) covers = results;
	};

	const selectCover = async (cover: string) => {
		await addCoverTask(sessionToken, taskId, cover);
		dispatch('updatedCover');
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<Popover.Root portal={null}>
	<Popover.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="w-full justify-between">
			<span class="text-xs font-semibold text-[#666]">Cover</span>
			<PlusIcon className="h-4 w-4 stroke-1" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[300px] rounded-xl">
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Input
					type="search"
					class="text-sm rounded-[8px] h-[32px] text-[#202020] dark:bg-[#22272b]"
					placeholder="Keywords...."
					bind:value={searchValue}
					on:input={async () => await search(searchValue)}
				/>
				<hr class="my-2" />

				<div class="gap-2 grid grid-cols-4 overflow-y-auto h-[160px]">
					{#if covers}
						{#each covers as image}
							<button on:click={() => selectCover(image.urls.regular)}>
								<img
									class="rounded-[4px] w-[50px] h-[50px] object-cover"
									src={image.urls.small}
									alt={image.description}
								/>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

<!-- <div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="bg-[#f0f1f4] text-[#828282] dark:bg-[#323940] dark:text-[#B6C2CF] rounded-[8px] w-[150px] h-[32px] flex items-center pl-[15px] gap-[10px] transition-colors duration-150 dark:hover:bg-[#3d4750] hover:bg-[#dcdfe4]"
	>
		<ImageIcon />
		Cover
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
			class="absolute right-0 mt-2 py-2 px-4 w-[245px] h-[300px] bg-[white] dark:bg-[#282E33] rounded-[12px] shadow-xl border border-[#E0E0E0]"
		>
			<header class="mb-[15px]">
				<h3 class="font-semibold text-[#4F4F4F]">Photo Search</h3>
				<span class="text-[#828282] text-sm">Search Unsplash for photos</span>
			</header>

			<input
				type="search"
				class="w-full text-sm h-[32px] outline-none rounded-[8px] text-[#BDBDBD] dark:bg-[#22272b] border dark:border-[#22272B] border-[#E0E0E0] pl-[10px]"
				placeholder="Keywords...."
				bind:value={searchValue}
				on:input={async () => await search(searchValue)}
			/>

			<div class="gap-2 mt-[15px] grid grid-cols-4 overflow-y-auto h-[170px]">
				{#if covers}
					{#each covers as image}
						<button on:click={() => selectCover(image.urls.regular)}>
							<img
								class="rounded-[4px] w-[50px] h-[50px] object-cover"
								src={image.urls.small}
								alt={image.description}
							/>
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div> -->
