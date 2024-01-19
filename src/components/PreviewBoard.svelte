<script lang="ts">
	import { goto } from "$app/navigation";
	import { addScript } from "$lib";
	import type { Board } from "$lib/types";
    export let board: Board;


    const navigateToBoard= async (board: Board) =>{
        const titleToScript= await addScript(board.title);
        goto(`b/${board.id}/${titleToScript}`);
    }

    // rgba(9, 30, 66, 0.06)
</script>



<div on:click={() =>  navigateToBoard(board)} class="w-[193px] h-[112px] rounded-[5px] py-[5px] px-[5px] cursor-pointer bg-cover bg-center bg-no-repeat transition-color duration-300 ease-out hover:bg-white" style="background-image: url({board.background})">
    <header>
        <h3 class="font-bold text-[16px] text-[white]">{board.title}</h3>
    </header>

</div>