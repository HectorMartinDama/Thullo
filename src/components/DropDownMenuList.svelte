

<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
	import type { List } from "$lib/types";
    import {enhance} from "$app/forms"
	import type { SubmitFunction } from "@sveltejs/kit";


    export let list: List;

    const prueba: SubmitFunction= ({formElement, formData, action, cancel}) =>{
        formData.append('id', list.id);
        return async ({ result, update }) =>{
            await update();
        };
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>   
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-[151px] h-[80px] bg-[white] dark:bg-[#282E33] rounded-[12px] border-none">
        <DropdownMenu.Item class="text-[#828282]">
            <form method="POST" action="?/deleteList">
                <input type="hidden" name="id" id="id" value={list.id}>
                <button type="submit">Delete this</button>
            </form>
            <DropdownMenu.Item class="text-[#828282]">Delete this list</DropdownMenu.Item>
            Rename
        </DropdownMenu.Item>
        <DropdownMenu.Separator class="bg-[#E0E0E0]" />
 
    </DropdownMenu.Content>
</DropdownMenu.Root>