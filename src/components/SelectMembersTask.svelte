<script lang="ts">
	import type { User } from '$lib/types';
	import GroupIcon from '../components/icons/GroupIcon.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let isOpen = false;
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

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="bg-[#f0f1f4] text-[#828282] dark:bg-[#323940] dark:text-[#B6C2CF] rounded-[8px] w-[150px] h-[32px] flex items-center pl-[15px] gap-[10px] transition-colors duration-150 dark:hover:bg-[#3d4750] hover:bg-[#dcdfe4]"
	>
		<GroupIcon />
		Members
	</button>
	{#if isOpen}
		<button
			on:click={() => (isOpen = false)}
			tabindex="-1"
			class="fixed inset-0 h-full w-full cursor-default"
		></button>
	{/if}
	{#if isOpen}
		<div
			class="absolute right-0 py-2 px-4 z-10 w-[245px] h-[300px] bg-[white] dark:bg-[#282E33] rounded-[12px] shadow-xl border border-[#E0E0E0]"
		>
			<header class="mb-[15px]">
				<h3 class="font-semibold text-[#4F4F4F]">Members</h3>
				<span class="text-[#828282] text-sm">Assign members to this card</span>
			</header>

			<input
				type="search"
				class="w-full h-[32px] outline-none rounded-[8px] text-[#BDBDBD] border border-[#E0E0E0] pl-[10px] text-sm"
				placeholder="User..."
				bind:value={userValue}
				on:input={() => searchMembers(userValue)}
			/>

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

			<footer class="pb-4 flex justify-center">
				{#if memberId}
					<button class="bg-blue-500 rounded-[8px] text-sm text-white px-5 py-2">Invite</button>
				{/if}
			</footer>
		</div>
	{/if}
</div>
