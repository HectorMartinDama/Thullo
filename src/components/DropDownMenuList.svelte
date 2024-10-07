<script lang="ts">
	import type { List } from '$lib/types';
	import OptionsIcon from './icons/OptionsIcon.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { createEventDispatcher } from 'svelte';
	import { EditIcon } from 'lucide-svelte';
	import DeleteList from './DeleteList.svelte';

	const dispatch = createEventDispatcher();

	export let list: List;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon">
			<Button variant="ghost" size="icon">
				<OptionsIcon className="h-4 w-4 stroke-1" />
			</Button>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[235px] rounded-2xl" align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item class="py-2 rounded-md ">
				<button
					class="flex items-center gap-1 w-full"
					on:click={() => {
						dispatch('editListTitle');
					}}
				>
					<EditIcon class="mr-2 w-4 h-4" />
					<span class="text-[13px]">Edit</span>
				</button>
			</DropdownMenu.Item>
			<DeleteList listId={list.id} listTitle={list.title} />
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
