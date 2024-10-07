<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { User } from '$lib/types';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import PlusIcon from './icons/PlusIcon.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let memberId: string;
	let userValue: string = '';
	let preValue: string = userValue;
	export let members: User[] | undefined;
	let intialMembers = members;

	const filterNameMembers = (userValue: string) => {
		members = intialMembers; // cojo de nuevo todos los miembros
		members = members?.filter((member) =>
			member.name.toLocaleLowerCase().includes(userValue.toLocaleLowerCase())
		);
	};

	const clearMembers = () => {
		members = intialMembers;
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

<Popover.Root portal={null}>
	<Popover.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="w-full justify-between">
			<span class="text-xs font-semibold text-[#666]">Members</span>
			<PlusIcon className="h-4 w-4 stroke-1" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[300px] rounded-xl">
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
					{#if members}
						{#each members as member}
							<button
								on:click={() => (memberId = member.id)}
								class="flex flex-row items-center gap-4 w-full font-semibold rounded-[8px] py-2 pl-2 text-sm transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940]"
							>
								<img
									src={member.image}
									alt="profile image of {member.name}"
									class="h-[30px] w-[30px] rounded-full"
								/>
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
