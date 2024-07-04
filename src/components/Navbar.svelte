<script lang="ts">
	import AllBoardButton from './AllBoardButton.svelte';
	import BrandIcon from './icons/BrandIcon.svelte';
	import AccountDropdown from './AccountDropdown.svelte';
	import { page } from '$app/stores';
	import GoogleIcon from './icons/GoogleIcon.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import GithubStar from './GithubStar.svelte';
	import Search from './Search.svelte';
	import { renameTitleBoard } from '$lib/requestsBackend';
	import { onMount } from 'svelte';

	export let boardTitle = '';

	let inputRenameDom: HTMLInputElement;
	let sessionToken: string | undefined;
	let isDropDownOpen = false;
	let inputRename = false;
	let newTitleValue = boardTitle;

	// return the first letter
	const firstLetter = (username: string) => {
		return username.charAt(0);
	};

	const handleDropDownClick = () => {
		isDropDownOpen = !isDropDownOpen;
	};

	const renameTitle = async () => {
		inputRename = true;
	};

	const handleKeyPress = async (event: KeyboardEvent) => {
		if (
			event.key === 'Enter' &&
			newTitleValue.trim() != boardTitle.trim() &&
			newTitleValue.trim().length > 0
		) {
			await renameTitleBoard(sessionToken, $page.params.id, newTitleValue.trim());
		}
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<nav
	class="flex px-9 sticky top-0 z-10 justify-between items-center border-b border-[#D9DDE2] text-black dark:border-[#32383D] h-[68px] w-full bg-[white] dark:bg-[#1D2125]"
>
	<!-- FIRST GROUP -->
	<div class="flex flex-row">
		<a href="/boards">
			<BrandIcon />
		</a>

		{#if $page.data.session?.user}
			<!-- BOARD TITLE -->

			{#if !inputRename}
				<div
					on:click={() => renameTitle()}
					class="cursor-pointer h-[32px] transition-colors duration-150 ease-in-out hover:bg-[#F0F1F4] py-2 px-2 rounded-[4px] flex items-center ml-[130px]"
				>
					<h1 class="text-[#333333] dark:text-[#B6C2CF] justify-center text-lg font-semibold">
						{boardTitle}
					</h1>
				</div>
			{:else}
				<input
					on:keypress={handleKeyPress}
					bind:value={newTitleValue}
					type="text"
					class="ml-[130px] bg-white text-[#333333] dark:text-[#B6C2CF] justify-center text-lg font-semibold h-[32px] px-2 py-2"
				/>
			{/if}

			{#if boardTitle}
				<div class="inline-block h-[35px] mx-[30px] border-[1px] border-[#E0E0E0]"></div>
				<AllBoardButton />
			{/if}
		{/if}
	</div>
	{#if $page.data.session?.user}
		<div class="flex flex-row gap-20 items-center">
			<Search />
			<AccountDropdown />
		</div>
	{:else}
		<div class="flex-row gap-8 hidden md:flex">
			<GithubStar />
			<button
				class="flex flex-row items-center gap-4 rounded-[4px] text-sm py-2 px-2 border border-gray-300 transition-colors duration-150 hover:bg-[#e7e7f5]"
				on:click={() => signIn('google', { callbackUrl: '/boards' })}
			>
				<GoogleIcon />
				Sign in with Google
			</button>
		</div>
	{/if}
</nav>
