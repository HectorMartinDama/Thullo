<script lang="ts">
	import type { Visibility } from "$lib/types";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import { Button } from "$lib/components/ui/button";


    export let visibility: Visibility;

    console.log(visibility)
</script>





<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <!-- <button builders={[builder]} class="inline-flex items-center justify-center text-center bg-[#F2F2F2] h-[36px] w-[98px] rounded-[8px] text-sm font-medium text-[#828282] gap-[7px]">
            {#if visibility === 'private'}
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
            {:else if visibility === 'public'}
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
            {/if}
            {visibility}
        </button>     -->

      
        <Button builders={[builder]} class="gap-[7px] hover:bg-[#d0d4db] dark:hover:bg-[#282E33] duration-150 transition-colors">
          
            {#if visibility === 'private'}
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
            {:else if visibility === 'public'}
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
            {/if}
            {visibility}
        </Button>

    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-[250px] bg-[white] text-[#172B4D] dark:bg-[#282e33] dark:text-[#B6C2CF] text-base border-none rounded-xl" >
        <DropdownMenu.Label class="text-base font-semibold flex flex-col gap-[10px]">Visibility <span class="text-sm font-normal text-[#828282]">Choose who can see to this board.</span> </DropdownMenu.Label>
        <DropdownMenu.Separator />
       
      

        <DropdownMenu.Item class="flex-col text-base w-[234px] h-[58px] rounded-[8px] hover:bg-red-500 duration-150 transition-colors">
            <div class="flex flex-row gap-[10px]">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
                <h3>Public</h3>
            </div>
            <span class="text-sm font-light text-[#828282]">Anyone on the internet can see this.</span>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item class="text-base">GitHub</DropdownMenu.Item>


    </DropdownMenu.Content>
    
</DropdownMenu.Root>