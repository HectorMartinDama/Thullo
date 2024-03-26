<script lang="ts">
	import type { Board } from "$lib/types";

    export let board: Board;
</script>




{#if board}
    <li class="flex items-center py-4 first:pt-0 last:pb-0 hover:bg-slate-100 transition-colors duration-100">
            <img class="h-10 w-10 rounded-[6px]" src="{board.background}" alt="image of the board" />
            <div class="ml-3 overflow-hidden">
                <p class="text-base font-medium text-slate-900">{board.title}</p>
                <p class="text-sm text-slate-500 truncate">{board.visibility}</p>
            </div>
       
    </li>
{/if}
 
