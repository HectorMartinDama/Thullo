<script lang="ts">
	import type { TaskItem, Board } from "$lib/types";


    // moock de datos. Se remplaza por consulta en la base de datos.
	import ListTasks from "../../../../components/ListTasks.svelte";
	import AddAnotherList from "../../../../components/AddAnotherList.svelte";
	import TypeBoardButton from "../../../../components/TypeBoardButton.svelte";

    const background= '/background-crystallBall.svg';
    let taskDragging: TaskItem;
    export let data;
    const board: Board= data.board;


    
    
    


    const prueba= (listId: string) =>{
        console.log(`se ha dropeado la task ${taskDragging.title} en la list ${listId}`);
    }

    console.log(board);


    // header dark #0000003d


    

    
 

 
</script>


<svelte:head>
    <title>{data.pageTitle} | Thullo</title> 
</svelte:head>



    <section class="px-[16px] flex flex-row bg-center bg-no-repeat" style="background-image: url({board.background});">

        {#if board}
            <!-- <header class="fixed h-[56px] w-full flex items-center">
                <h2 class="font-bold text-[18px] text-[#FFFFFF]">{board.title}</h2>
                <TypeBoardButton visibility={board.visibility}/>
            </header> -->


           
                <!-- BOARD SPACE  -->
    
                <div class="flex flex-row pt-[56px] gap-[15px] h-full w-screen min-w-screen max-w-screen overflow-x-auto">
                    {#if board.lists}
                        {#each board.lists as list (list.id)}
                            <ListTasks {list} on:taskDragging={(e) => taskDragging= e.detail} on:assignedTask={(e) => prueba(e.detail)}/>
                        {/each}
                    {/if}
                      <!-- Add other list -->
                    <AddAnotherList/>
                </div>

        


        


          
            
        {/if}
    </section>




<style>

    section {
        height: calc(100vh - 48px); /* le quito el espacio que ocupa el navbarx */
        width: 100vw;       
        background-size: cover;
        background-repeat: no-repeat;
    }

</style>
