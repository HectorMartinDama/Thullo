<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Calendar, Settings, Smile, Calculator, User, CreditCard } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Board } from '$lib/types';
	import { page } from '$app/stores';
	import { getAllBoard } from '$lib/requestsBackend';
	import { addScript } from '$lib';
	import { goto } from '$app/navigation';

	let boardLink: HTMLAnchorElement;
	let loading = false;
	let sessionToken: string | undefined;
	let open = false;
	let boards: Board[];

	const ir = () => {
		boardLink.click();
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		const handleKeydown = async (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				loading = true;
				open = !open;
				boards = await getAllBoard(sessionToken);
				loading = false;
			}
		};
		document.addEventListener('keydown', handleKeydown);
		return () => {
			unsubcribe;
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open class="h-[300px]">
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item onSelect={() => goto('/settings')} class="cursor-pointer">
				<Settings class="mr-2 w-5 h-5" />
				<span class="text-[13px]">Settings</span>
			</Command.Item>
		</Command.Group>

		{#if loading}
			<Command.Loading progress={0.5} class="text-[13px] pl-4 text-gray-500"
				>Loading boards...</Command.Loading
			>
		{:else}
			<Command.Group heading="Boards">
				{#each boards as board}
					<Command.Item value={board.title} onSelect={() => ir()} class="cursor-pointer">
						<a
							id={board.id}
							class="flex items-center"
							bind:this={boardLink}
							data-sveltekit-reload
							href="/b/{board.id}/{addScript(board.title)}"
						>
							<img
								class="h-6 w-6 rounded-[6px] mr-2"
								src={board.background}
								alt="background of the {board.title} board"
							/>
							<span class="text-[13px]">{board.title}</span>
						</a>
					</Command.Item>
				{/each}
			</Command.Group>
		{/if}
	</Command.List>
</Command.Dialog>
