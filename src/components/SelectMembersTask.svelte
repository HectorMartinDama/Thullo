<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	import Button from '$lib/components/ui/button/button.svelte';
	import type { User } from '$lib/types';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Plus } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import MembersGroupAvatar from './MembersGroupAvatar.svelte';
	import type { TaskItem } from 'lib/types';

	let memberId: string;
	let userValue: string = '';
	let preValue: string = userValue;
	export let task: TaskItem;
	export let boardMembers: User[] | [];
	let intialMembers = boardMembers;

	const filterNameMembers = (userValue: string) => {
		boardMembers = intialMembers; // cojo de nuevo todos los miembros
		boardMembers = boardMembers?.filter((member) =>
			member.name.toLocaleLowerCase().includes(userValue.toLocaleLowerCase())
		);
	};

	const clearMembers = () => {
		boardMembers = intialMembers;
	};

	const searchMembers = (userValue: string) => {
		if (userValue.length > 0 && userValue != preValue) {
			filterNameMembers(userValue);
		} else if (preValue.length != userValue.length) {
			clearMembers();
		}
		preValue = userValue;
	};
</script>

{#if boardMembers.length > 0}
	<hr class="my-2" />
	<p class="text-xs font-semibold text-[#666] dark:text-[#bfbfbf] mb-2">Members</p>
	<div class="flex items-center gap-2">
		<MembersGroupAvatar admin={task.user} members={task.members} />
		<Popover.Root portal={null}>
			<Popover.Trigger asChild let:builder>
				<Button
					variant="ghost"
					size="icon"
					builders={[builder]}
					class="flex items-center justify-center h-[35px] w-[35px] rounded-full bg-[#F5F5F5] hover:bg-[#d9d7d5]"
				>
					<Plus class="h-4 w-4 stroke-1" />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[250px] rounded-xl" side="right" align="start">
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Input
							type="search"
							class="w-full h-[32px] outline-none rounded-[8px] text-[#202020] border border-[#E0E0E0] pl-[10px] text-sm"
							placeholder="User..."
							bind:value={userValue}
							on:input={() => searchMembers(userValue)}
						/>

						<hr class="my-2" />

						<div class="mt-[15px] overflow-y-auto h-[150px] w-full">
							{#if boardMembers}
								{#each boardMembers as member}
									<button
										on:click={() => (memberId = member.id)}
										class="flex flex-row items-center gap-4 w-full rounded-[8px] py-2 pl-2 text-xs transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940]"
									>
										<Avatar.Root class="w-8 h-8">
											<Avatar.Image src={member.image} alt={member.name} />
											<Avatar.Fallback>{member.name.split('')[0]}</Avatar.Fallback>
										</Avatar.Root>
										{member.name}
									</button>
								{/each}
							{:else}
								<h1 class="text-red-500">No se ha encontrado ningun memberx</h1>
							{/if}
						</div>
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	</div>
{/if}
