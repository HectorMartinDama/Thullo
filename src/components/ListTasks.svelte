<script lang="ts">
	import type { List, TaskItem } from "$lib/types";
	import Task from "./Task.svelte";
    import { createEventDispatcher } from "svelte";
    import { flip } from "svelte/animate";

    const dispacth= createEventDispatcher();

    export let list: List;
    let taskDragging: TaskItem;


    // when move the task
    const taskDraggingEvent= (e: DragEvent, tasks: TaskItem[]) =>{
        const id= (e.target as HTMLElement).getAttribute('id');
        const task= tasks.find((task) => task.id === id);
        dispacth('taskDragging', task);
    };

    // cada vez que muevo una task la asigno a la variable
    function todoDragging(e: DragEvent, tasks: TaskItem[]){
        const id= (e.target as HTMLElement).getAttribute('id');
        const task= tasks.find((task) => task.id === id);
        if(task) taskDragging= task;
    }

    
    // when drop de task in the list
    function assignedTask(){
        dispacth('assignedTask', list.title);
    }
</script>



<div class="flex flex-row gap-[15px]">

    <div class="w-[272px] bg-[#F1F2F4] rounded-xl flex flex-col" on:drop={assignedTask} on:dragover={(e) => e.preventDefault()}>
        <header class="h-[38px] flex justify-between px-[15px] py-[15px]">
            <h2 class="text-[14px] text-[#172B4D] font-semibold">{list.title}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
        </header>

        <!-- Tasks --> 
        <div class="flex flex-col items-center">
            <ul>
                {#if list.tasks }
                    {#each list.tasks as task (task.id)}
                        <!-- Whithout the (task.id) svelte can't identify each one differently -->
                        <div on:drag={(e) => taskDraggingEvent(e, list.tasks)} animate:flip={{ duration: 500 }}>
                            <Task {task}/>
                        </div>
                    {/each}
                {/if}
            </ul>
        </div>
    </div> 

</div>