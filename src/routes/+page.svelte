<script>
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import OptionsIcon from '../components/icons/OptionsIcon.svelte';
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import UnsplashIcon from '../components/icons/UnsplashIcon.svelte';
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

<section class="flex items-center justify-center" id="bentor">
	<main class="w-[1300px] flex justify-center items-center">
		<div class="container">
			<div class="row-1">
				<div
					class="col-1 font-semibold text-[24px] flex flex-row items-center gap-4 overflow-x-auto"
					style=""
					use:dndzone={{ items: board, flipDurationMs, type: 'columns' }}
					on:consider={handleDndConsiderColumns}
					on:finalize={handleDndFinalizeColumns}
				>
					{#each board as column (column.id)}
						<div
							animate:flip={{ duration: flipDurationMs }}
							class="w-[280px] h-[260px] bg-[#e7e7f5] rounded-[8px] text-sm font-normal px-[15px] py-[15px] relative
								column
							)}"
						>
							<div>
								<header class="h-[38px] flex justify-between">
									<h3 class="text-sm text-[#172B4D] dark:text-[#B6C2CF] font-semibold">
										{column.name}
									</h3>
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
											class="flex items-center px-[10px] py-[10px] rounded-[8px] h-[35px] bg-white border-2 hover:border-[#7289f4] mb-[10px]"
											animate:flip={{ duration: flipDurationMs }}
										>
											{item.name}
										</div>
									{/each}
								</div>
							</div>

							{#if column[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
								<div in:fade={{ duration: 200, easing: cubicIn }} class="custom-shadow-item"></div>
							{/if}
						</div>
					{/each}
				</div>

				<div class="col-2">
					<h2 class="text-2xl mb-3 flex justify-start">Get more things done on a full screen</h2>
					<p class="flex justify-start text-base">
						Organize your lists in full screen board to stay on top of your work.
					</p>
					<div class="flex justify-center items-center">
						<img src="prueba6.png" alt="" class="w-[600px] h-[500px] -mt-20" />
					</div>
				</div>
			</div>
			<div class="row-2 mt-9">
				<div class="col-3 relative h-full">
					<div
						class="absolute inset-0 -z-10 w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
					></div>
					<h2 class="text-2xl flex justify-start mb-3">Collaborative Boards</h2>
					<p class="flex justify-start">Share your Board and Lists in real-time with your team.</p>
				</div>
				<div
					class="col-4 h-full bg-[radial-gradient(circle_farthest-side,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
				>
					<h2 class="text-2xl">Integrated with Unsplash</h2>
					<div class="flex items-center justify-center w-full" id="prueba2">
						<div class="flex justify-center items-center h-[230px] w-[230px]">
							<UnsplashIcon />
						</div>
					</div>
				</div>
				<div class="col-5">Columna 5</div>
			</div>
		</div>
	</main>
</section>

<footer class="flex items-center justify-center w-full h-[45px] mt-4 border">
	<p>
		Made with ❤️ by <a
			href="https://github.com/HectorMartinDama"
			target="_blank"
			class="transition duration-150 hover:underline">HectorMartinDama</a
		>
	</p>
</footer>

<style lang="css">
	#prueba2 {
		height: calc(100% - 28px);
	}
	.custom-shadow-item {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		background: #ffffff5d;
		border-radius: 8px;
		margin: 0;
	}
	* {
		color: black;
	}

	@font-face {
		font-family: 'Satoshi';
		src: url('/fonts/Satoshi-Bold.woff2') format('woff2');
	}

	h2 {
		font-family: 'Satoshi';
	}
	#bentor {
		height: calc(100vh);
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
		border: 1px solid #cdc8db;
		border-radius: 3rem;
		text-align: center;
		padding-left: 25px;
		padding-right: 25px;
		padding-top: 25px;
		padding-bottom: 25px;
	}

	.col-1,
	.col-2 {
		flex: 1; /* Elimina la distribución flexible */
		width: 510px; /* Ancho fijo de 510px */
		height: 370px; /* Altura fija de 370px */
		padding: 8px;
		border: 1px solid #cdc8db;
		padding-left: 25px;
		padding-right: 25px;
		padding-top: 25px;
		padding-bottom: 25px;
	}

	.col-3,
	.col-4,
	.col-5 {
		flex: 1; /* Elimina la distribución flexible */
		width: 330px; /* Ancho fijo de 510px */
		height: 369px; /* Altura fija de 370px */
		padding: 8px;
		border: 1px solid #cdc8db;
		padding-left: 25px;
		padding-right: 25px;
		padding-top: 25px;
		padding-bottom: 25px;
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
