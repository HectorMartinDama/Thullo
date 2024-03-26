<script lang="ts">
	import type { TaskItem } from "$lib/types";
	import { onMount } from "svelte";

    export let task: TaskItem;


    const enableEditDescription= () =>{
        const description= document.querySelector('#description');
        description?.removeAttribute('readonly');
    }

    





  





</script>



<dialog class="w-[661px] h-full bg-white px-[20px] py-[20px] outline-none rounded-xl">

    <header class="flex justify-end">
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
        </button>

    </header>

    {#if task.background}
        <img class="w-[616px] h-[130px] rounded-[12px]" src={task.background} alt="">
    {:else}
        <img class="w-[616px] h-[130px] rounded-[12px]" src="" alt="default background">
    {/if}


    <h2 class="text-[18px] -tracking-[0.5px] font-normal pt-[15px]">{task.title}</h2>


    <div class="mt-[30px]">
        <div class="flex flex-row gap-[20px]">
            <label for="description" class="flex flex-row items-center text-[#BDBDBD] text-[14px] font-semibold gap-[10px] mb-[15px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-description" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#BDBDBD" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17h6" /><path d="M9 13h6" /></svg>
                Description 
            </label>
            
            <button class="h-[24px] w-[62px] border-[1px] border-[#BDBDBD] rounded-xl flex flex-row items-center justify-center text-[#BDBDBD] font-medium gap-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#BDBDBD" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                Edit
            </button>
            
        </div>
        {#if task.description}
            <textarea readonly name="description" id="description" cols="30" rows="10" class="pl-[10px] w-[443px] h-[231px] text-[14px] font-normal rounded-xl resize-none">{task.description}</textarea>
        {/if}
    </div>
</dialog>
