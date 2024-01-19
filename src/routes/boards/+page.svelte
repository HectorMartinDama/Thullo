<script>
	import Navbar from "../../components/Navbar.svelte";
	import PreviewBoard from "../../components/PreviewBoard.svelte";
	export let data;

	const boards= data.boards;


	console.log(boards)
</script>



<svelte:head>
    <title>Boards | Thullo</title> 
</svelte:head>



<section class="mx-[180px] my-[50px]">
	<header class="flex flex-row items-center gap-3">
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#44546f" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
		<h3 class="font-bold text-[#172B4D] dark:text-[#B6C2CF] text-[16px]">Visto recientemente</h3>
	</header>
</section>

<section class="w-[825px] mx-[180px]">
	<header class="my-[25px]">
		<h3 class="text-[#44546F] dark:text-[#9FADBC] font-bold text-[16px] uppercase">tus espacios de trabajo</h3>
	</header>
	{#if boards}
		<div class="grid grid-cols-4 gap-[16.5px]">
			{#each boards as board}
				<PreviewBoard { board}/>
			{/each}
		</div>
	{/if}
</section>

