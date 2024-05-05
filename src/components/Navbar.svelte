<script lang="ts">
	import AllBoardButton from './AllBoardButton.svelte';
	import BrandIcon from './icons/BrandIcon.svelte';
	import AccountDropdown from './AccountDropdown.svelte';
	import { page } from '$app/stores';
	import GoogleIcon from './icons/GoogleIcon.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import GithubStar from './GithubStar.svelte';
	import Search from './Search.svelte';
	import CreateBoard from './CreateBoard.svelte';

	export let boardTitle = '';
	let isDropDownOpen = false;

	// return the first letter
	const firstLetter = (username: string) => {
		return username.charAt(0);
	};

	const handleDropDownClick = () => {
		isDropDownOpen = !isDropDownOpen;
	};
</script>

<nav
	class="flex px-[35px] justify-between items-center border-b-2 border-[#D9DDE2] text-black dark:border-[#32383D] h-[68px] w-full bg-[white] dark:bg-[#1D2125]"
>
	<!-- FIRST GROUP -->
	<div class="flex flex-row">
		<a href="/boards">
			<BrandIcon />
		</a>

		{#if $page.data.session?.user}
			<!-- BOARD TITLE -->
			<h1
				class="text-[#333333] dark:text-[#B6C2CF] justify-center text-lg font-semibold ml-[130px]"
			>
				{boardTitle}
			</h1>

			{#if boardTitle}
				<div class="inline-block h-[35px] mx-[30px] border-[1px] border-[#E0E0E0]"></div>
				<AllBoardButton />
			{/if}
		{/if}
	</div>
	{#if $page.data.session?.user}
		<div class="flex flex-row gap-20 items-center">
			<CreateBoard />
			<Search />
			<AccountDropdown />
		</div>
	{:else}
		<div class="flex flex-row gap-8">
			<GithubStar />
			<button
				class="flex flex-row items-center gap-4 rounded-[4px] py-2 px-2 border border-gray-300 transition-colors duration-150 hover:bg-[#e7e7f5]"
				on:click={() => signIn('google', { callbackUrl: '/boards' })}
			>
				<GoogleIcon />
				Sign in with Google
			</button>
		</div>
	{/if}
</nav>
