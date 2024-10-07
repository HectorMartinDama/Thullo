<script lang="ts">
	export let listTitle: string;
	export let listId: string;
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Trash } from 'lucide-svelte';
</script>

<AlertDialog.Root portal={null}>
	<AlertDialog.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="text-[13px] w-full h-[35.5px] p-2 justify-start"
		>
			<Trash class="mr-2 h-4 w-4  stroke-[#b03d32]" />
			<span class="text-[#b03d32]">Delete</span>
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="text-[16px] font-semibold">Delete List</AlertDialog.Title>
			<AlertDialog.Description>
				The list <strong>{listTitle}</strong> will be permanently deleted.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="font-semibold text-[13px] h-8 text-[#1a1a1a]"
				>Cancel</AlertDialog.Cancel
			>
			<form method="POST" action="?/deleteList">
				<input hidden name="id" id="id" value={listId} />
				<AlertDialog.Action
					type="submit"
					class="font-semibold bg-[#dc4c3e] text-[13px] h-8 hover:bg-[#c3392c] transition-colors duration-150"
					>Delete</AlertDialog.Action
				>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
