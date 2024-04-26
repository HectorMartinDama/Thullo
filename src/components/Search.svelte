<script lang="ts">
	import type { Board } from '$lib/types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Spinner from './Spinner.svelte';
	import { ARROWS } from '$lib/types';
	import CommandIcon from './icons/CommandIcon.svelte';
	import LetterKIcon from './icons/LetterKIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import { addScript } from '$lib';
	import type { Keyboard } from 'radix-icons-svelte';
	import { getAllBoard } from '$lib/requestsBackend';

	let ctr: AbortController;
	let loadingData: boolean;
	let sessionToken: string | undefined;
	let isOpenDialog = false;
	let dialogSearch: HTMLDialogElement;
	let selectedIndex = 0;
	let boards: Board[];

	const openDialog = async () => {
		dialogSearch.showModal();
		boards = await getAllBoard(sessionToken);
	};

	function moveToNextA(currentA: HTMLElement, nextA: HTMLElement) {
		currentA.blur();
		nextA.focus();
	}

	const detect = (e: KeyboardEvent) => {
		let selectedItem = document.getElementById(`item_${selectedIndex}`);
		if (e.key === 'ArrowDown') {
			selectedIndex = Math.min(selectedIndex + 1, boards.length - 1);
			let nextItemSelected = document.getElementById(`item_${selectedIndex}`);
			if (selectedItem && nextItemSelected) {
				moveToNextA(selectedItem, nextItemSelected);
			}
		} else if (e.key === 'ArrowUp') {
			selectedIndex = Math.max(selectedIndex - 1, 0);
			let nextItemSelected = document.getElementById(`item_${selectedIndex}`);
			if (selectedItem && nextItemSelected) {
				moveToNextA(selectedItem, nextItemSelected);
			}
		}
	};

	const handleArrowController = (e: KeyboardEvent) => {
		const initialElement = document.getElementById('item_-1');

		if (e.key === 'ArrowDown') {
			selectedIndex = 0;
			initialElement?.focus();
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
					selectedIndex = 0;
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

<button
	on:click={() => openDialog()}
	class="flex items-center justify-between h-10 bg-[#f0f1f4] dark:text-[#B6C2CF] dark:bg-[#323940] rounded-full w-[190px] border dark:border-[#4b505d] text-[#676779] uppercase text-sm px-4"
>
	<SearchIcon />
	search
	<div class="flex flex-row gap-1">
		<div
			class=" h-5 w-5 border dark:border-[#1d2125] rounded-[4px] bg-white dark:bg-[#1d2125] flex items-center justify-center"
		>
			<CommandIcon />
		</div>
		<div
			class=" h-5 w-5 border rounded-[4px] dark:border-[#1d2125] bg-white dark:bg-[#1d2125] flex items-center justify-center"
		>
			<LetterKIcon />
		</div>
	</div>
</button>

<dialog
	id="search"
	bind:this={dialogSearch}
	class="block fixed opacity-0 translate-y-20 transition-[opacity,transform] duration-300 [&[open]]:opacity-100 [&[open]]:translate-y-0 inset-0 w-[550px] rounded-[8px] dark:bg-[#1d2125] py-5"
>
	<div class="px-6" on:keydown={(e) => detect(e)}>
		<input
			on:keydown={(e) => handleArrowController(e)}
			on:keyup={(e) => eventListener(e)}
			autocomplete="off"
			spellcheck="false"
			type="search"
			name="searchBoards"
			id="searchBoards"
			placeholder="Keyword..."
			class="w-[430px] h-[34px] ml-[10px] outline-none text-[#BDBDBD] text-base dark:bg-[#1d2125]"
		/>

		<button
			on:click={() => dialogSearch.close()}
			type="button"
			class="mr-[10px] rounded-md p-2 inline-flex items-center justify-center"
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
		<div class="w-[550px] min-h-[300px] max-h-[300px] rounded-b-[8px] overflow-y-scroll mt-5">
			<!-- Cargo el spinner mientras se procesa la peticion -->
			<div class="flex items-center justify-center">
				<Spinner loading={loadingData} />
			</div>

			{#if boards}
				<div class="divide-y divide-slate-200 dark:divide-[#4b505d] dark:bg-[#1d2125]">
					{#each boards as board, index (board.id)}
						<a
							data-sveltekit-reload
							href="/b/{board.id}/{addScript(board.title)}"
							id={`item_${index}`}
							class="{index === selectedIndex
								? 'bg-slate-100 dark:bg-[#323940]'
								: ''}  flex items-center py-4 hover:bg-slate-100 dark:hover:bg-[#323940] transition-colors duration-100 pl-4 w-[510px]"
						>
							<img class="h-9 w-9 rounded-[6px]" src={board.background} alt="image of the board" />
							<div class="ml-3 overflow-hidden">
								<p class="text-sm text-slate-900">{board.title}</p>
								<p class="text-sm text-slate-500 truncate">{board.visibility}</p>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</dialog>

<style>
	a:focus {
		outline: none; /* Quitar el contorno de enfoque */
	}
</style>
