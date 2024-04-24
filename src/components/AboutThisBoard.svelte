<script lang="ts">
	import { page } from '$app/stores';
	import type { Board } from '$lib/types';
	import AccountIcon from './icons/AccountIcon.svelte';
	import GroupIcon from './icons/GroupIcon.svelte';
	import NoteIcon from './icons/NoteIcon.svelte';
	export let board: Board;
	let descriptionValue: string;
</script>

{#if board}
	<ul class="space-y-2 font-medium">
		<li class="flex flex-row items-center gap-2 py-[10px] text-[#BDBDBD]">
			<AccountIcon />
			<span>Made by</span>
		</li>
		<li class="flex flex-row gap-4 items-center pb-3">
			<img src={board.user.image} alt="image profile" class="h-[35px] w-[35px] rounded-full" />
			<div>
				<h3 class="font-semibold">{board.user.name}</h3>
				<span class="text-sm text-[#BDBDBD]">on 4 July, 2020</span>
			</div>
		</li>
		<li
			class="flex flex-row items-center font-normal gap-2 py-[10px] text-[#BDBDBD] dark:text-[#B6C2CF]"
		>
			<NoteIcon />
			<span>Description</span>
		</li>
		<textarea
			name="description"
			id=""
			class="w-full h-[250px] font-normal rounded-[8px] py-4 px-4 outline-none border border-[#BDBDBD] dark:border-[#B6C2CF] dark:bg-[#282E33] resize-none"
			placeholder="Add the description of the board..."
			bind:value={board.description}
		></textarea>
		<li class="flex flex-row items-center gap-2 py-[10px] text-[#BDBDBD] dark:text-[#B6C2CF]">
			<GroupIcon />
			<span>Team</span>
		</li>
		<li class="flex flex-col gap-4 pb-3">
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row items-center gap-4">
					<img src={board.user.image} alt="image profile" class="h-[35px] w-[35px] rounded-full" />

					<h3 class="font-semibold">{board.user.name}</h3>
				</div>
				<span class="text-[#828282] font-normal">Admin</span>
			</div>
			{#if board.members}
				{#each board.members as member}
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-row items-center gap-4">
							<img src={member.image} alt="image profile" class="h-[35px] w-[35px] rounded-full" />

							<h3 class="font-semibold">{member.name}</h3>
						</div>
						{#if $page.data.session?.user?.email === board.user.email}
							<!-- Si es el creador -->
							<button
								class="h-[24px] px-3 rounded-[8px] text-[#EB5757] font-normal border border-[#EB5757] text-sm transition-colors duration-150 hover:bg-[#FFEDEF]"
								>Remove</button
							>
						{/if}
					</div>
				{/each}
			{/if}
		</li>
	</ul>
{/if}
