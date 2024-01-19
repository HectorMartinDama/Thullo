<script lang="ts">
	import type { TaskItem } from "$lib/types";
	import { onMount } from "svelte";
	import DialogTask from "./DialogTask.svelte";
    import { createEventDispatcher } from "svelte";

    let dialog: HTMLDialogElement | null;
    export let task: TaskItem;


    const dispacth= createEventDispatcher();


    const clickTask= () => {
        dispacth('openTask')

    }

    


    function clickOutside(element, callbackFunction){
        function onClick(event){
            if(!element.contains(event?.target)){
                callbackFunction();
            }
        }
        document.addEventListener('click', onClick);
        return { 
            update(newCallBackFunction){
                callbackFunction= newCallBackFunction;
            },
            destroy(){
                document.removeEventListener('click', onClick)
            } 
        }
    }




    


</script>





<li on:click={() => clickTask()}  draggable="true" id={task.id} class="bg-white max-w-[256px] w-[256px] shadow-md px-[10px] py-[10px] rounded-xl  border-2 hover:border-[#0055CC]">
    {task.title}
</li>  


<DialogTask { task } />
    





