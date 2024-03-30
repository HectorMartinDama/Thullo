<script lang="ts">
	import type { Board } from '$lib/types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Spinner from './Spinner.svelte';
	import { ARROWS } from '$lib/types';

	let ctr: AbortController;
	let loadingData: Boolean;
	let sessionToken: string | undefined;
	let isOpenDialog = false;
	let dialogSearch: HTMLDialogElement;
	let selectedIndex = 0;
	let boards: Board[];

	const handleArrowController = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			selectedIndex = Math.min(selectedIndex + 1, boards.length - 1);
		} else if (e.key === 'ArrowUp') {
			selectedIndex = Math.max(selectedIndex - 1, 0);
		}
		const selectedItem = document.getElementById(`item_${selectedIndex}`);
		if (selectedItem) {
			selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	const searchBoards = () => {
		const controller = new AbortController();
		const query = (): Promise<Board[]> =>
			fetch('http://localhost:4000/boards', {
				signal: controller.signal,
				headers: { Authorization: `Bearer ${sessionToken}` }
			}).then((res) => res.json());
		return { query, controller };
	};

	const eventListener = (e: KeyboardEvent) => {
		if (ARROWS.includes(e.key)) return;
		if (ctr) ctr.abort(); // si esta haciendo una peticion se cancela las otras peticiones.

		const { query, controller } = searchBoards();
		ctr = controller;

		loadingData = true;

		query()
			.then((res) => {
				loadingData = false;
				boards = res.filter((board) =>
					board.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
				);
			})
			.catch(() => {
				console.log('fetch de busqueda cancelado');
			});
	};

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			const isCommandOrCtrlPressed = event.metaKey || event.ctrlKey;
			const isKKeyPressed = event.key === 'k' || event.keyCode === 75;
			if (isCommandOrCtrlPressed && isKKeyPressed) {
				if (isOpenDialog) {
					dialogSearch.close();
					isOpenDialog = false;
				} else {
					dialogSearch.showModal();
					isOpenDialog = true;
				}
				event.preventDefault();
			}
		});
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<dialog
	id="search"
	bind:this={dialogSearch}
	class="block fixed opacity-0 translate-y-20 transition-[opacity,transform] duration-300 [&[open]]:opacity-100 [&[open]]:translate-y-0 inset-0 w-[550px] rounded-[8px] dark:bg-[#2E2E2E]"
>
	<div>
		<input
			on:keydown={(e) => handleArrowController(e)}
			on:keyup={(e) => eventListener(e)}
			autocomplete="off"
			type="search"
			name="searchBoards"
			id="searchBoards"
			placeholder="Keyword..."
			class="w-[430px] h-[34px] ml-[10px] outline-none text-[#BDBDBD] text-base dark:bg-[#2E2E2E]"
		/>

		<button
			on:click={dialogSearch.close()}
			type="button"
			class=" mr-[10px] rounded-md p-2 inline-flex items-center justify-center"
		>
			<span class="sr-only">Close menu</span>
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>

		<!-- Search Results  -->
		<div class="w-[550px] min-h-[300px] max-h-[300px] rounded-b-[8px] overflow-y-scroll">
			<!-- Cargo el spinner mientras se procesa la peticion -->
			<div class="flex items-center justify-center">
				<Spinner visible={loadingData} />
			</div>

			{#if boards}
				<div class="p-6 divide-y divide-slate-200">
					{#each boards as board, index (board.id)}
						<!-- <SearchResult {board} /> -->
						<div
							id={`item_${index}`}
							class="{index === selectedIndex
								? 'bg-slate-100'
								: ''}  flex items-center py-4 first:pt-0 last:pb-0 hover:bg-slate-100 transition-colors duration-100"
						>
							<img
								class="h-10 w-10 rounded-[6px]"
								src={board.background}
								alt="image of the board"
							/>
							<div class="ml-3 overflow-hidden">
								<p class="text-base font-medium text-slate-900">{board.title}</p>
								<p class="text-sm text-slate-500 truncate">{board.visibility}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- <span class="z-50 uppercase pl-[15px] text-sm font-semibold dark:text-[#E6E6E6] h-[50px] bg-[red]">not recent searches</span> -->
		</div>
	</div>
</dialog>
