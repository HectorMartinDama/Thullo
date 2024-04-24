<script>
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import OptionsIcon from '../components/icons/OptionsIcon.svelte';
	const flipDurationMs = 200;
	let board = [
		{
			id: 1,
			name: 'Todo',
			items: [
				{ id: 1, name: 'Welcome to Tullo!' },
				{ id: 2, name: 'This is a demo board' },
				{ id: 3, name: 'I am a task' }
			]
		},
		{
			id: 2,
			name: 'Doing',
			items: [
				{ id: 4, name: 'You can drag me anywhere in this list' },
				{ id: 5, name: 'And also to another list' }
			]
		},
		{
			id: 3,
			name: 'Done',
			items: [
				{ id: 46, name: 'Share the board' },
				{ id: 47, name: 'Login in Tullo' }
			]
		}
	];

	const handleDndConsiderColumns = (e) => {
		board = e.detail.items;
	};

	// se ejecuta cuando finalize el moviendo de las listas
	const handleDndFinalizeColumns = async (e) => {
		board = e.detail.items;
	};

	function handleDndConsiderCards(cid, e) {
		const colIdx = board.findIndex((c) => c.id === cid);
		board[colIdx].items = e.detail.items;
		board = [...board];
	}
	function handleDndFinalizeCards(cid, e) {
		const colIdx = board.findIndex((c) => c.id === cid);
		board[colIdx].items = e.detail.items;
		board = [...board];
	}
</script>

<div
	class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
></div>

<!-- <section class="flex items-center justify-center" id="bentor">
	<main class="w-[1300px] h-[700px] flex justify-center items-center">
		<div class="container">
			<div class="row-1">
				<div
					class="col-1 font-semibold text-[24px] flex flex-row items-center gap-4 overflow-x-auto bg-[#141E2F]"
					style=""
					use:dndzone={{ items: board, flipDurationMs, type: 'columns' }}
					on:consider={handleDndConsiderColumns}
					on:finalize={handleDndFinalizeColumns}
				>
					{#each board as column (column.id)}
						<div
							animate:flip={{ duration: flipDurationMs }}
							class="w-[280px] h-[260px] bg-white rounded-[8px] text-sm font-normal px-[15px] py-[15px]"
						>
							<header class="h-[38px] flex justify-between">
								<h2 class="text-sm text-[#172B4D] dark:text-[#B6C2CF] font-semibold">
									{column.name}
								</h2>
								<OptionsIcon />
							</header>
							<div
								class=""
								use:dndzone={{ items: column.items, flipDurationMs }}
								on:consider={(e) => handleDndConsiderCards(column.id, e)}
								on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
							>
								{#each column.items as item (item.id)}
									<div
										class="flex items-center px-[10px] py-[10px] rounded-[4px] h-[35px] border-2 hover:border-[#0055CC] mb-[10px]"
										animate:flip={{ duration: flipDurationMs }}
									>
										{item.name}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<div class="col-2">Columna 2</div>
			</div>
			<div class="row-2">
				<div class="col-3 font-bold -tracking-[0.9px] text-[24px] font-sans">
					Collaborative Boards
				</div>
				<div class="col-4">Integrated with Unsplash</div>
				<div class="col-5">Columna 5</div>
			</div>
		</div>
	</main>
</section> -->

<style lang="css">
	#bentor {
		height: calc(100vh - 68px);
	}
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.row-1,
	.row-2 {
		display: flex;
		gap: 20px;
	}

	.col-1,
	.col-2,
	.col-3,
	.col-4,
	.col-5 {
		flex: 1;
		border: 1px solid #ccc;
		border-radius: 3rem;
		text-align: center;
	}

	.col-1,
	.col-2 {
		flex: 1; /* Elimina la distribución flexible */
		width: 510px; /* Ancho fijo de 510px */
		height: 370px; /* Altura fija de 370px */
		padding: 10px;
		border: 1px solid #ccc;
	}

	.col-3,
	.col-4,
	.col-5 {
		flex: 1; /* Elimina la distribución flexible */
		width: 330px; /* Ancho fijo de 510px */
		height: 369px; /* Altura fija de 370px */
		padding: 10px;
		border: 1px solid #ccc;
	}
	@media (max-width: 768px) {
		.row-1 {
			flex-direction: column;
		}

		.col-1,
		.col-2 {
			width: 100%;
		}
	}
</style>
