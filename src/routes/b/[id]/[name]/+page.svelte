<script lang="ts">
	import type { TaskItem } from "$lib/types";
    import Navbar from "../../../../components/Navbar.svelte";
    import { Lists } from "$lib";

    // moock de datos. Se remplaza por consulta en la base de datos.
	import ListTasks from "../../../../components/ListTasks.svelte";

    const background= '/background-crystallBall.svg';

    let taskDragging: TaskItem;


    const prueba= (listId: string) =>{
        console.log(`se ha dropeado la task ${taskDragging.title} en la list ${listId}`);


    }


    

    
 

 
</script>






<section class="pt-[56px] px-[16px] flex flex-row gap-[6px]" style="background-image: url({background});">

    {#each Lists as list (list.id)}
        <ListTasks {list} on:taskDragging={(e) => taskDragging= e.detail} on:assignedTask={(e) => prueba(e.detail)}/>
    {/each}


    <!-- Add other list -->
    <button class="w-[272px] h-[44px] rounded-xl bg-[#DFE1E6] text-[#172B4D] text-[14px] flex items-center justify-around shadow-xl bg-opacity-50">
        Add another list
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
    </button>





</section>



<style>

    section {
        height: calc(100vh - 48px); /* le quito el espacio que ocupa el navbarx */
        width: 100vw;       
        background-size: cover;
        background-repeat: no-repeat;
    }

</style>
