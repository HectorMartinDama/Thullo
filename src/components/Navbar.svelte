<script lang="ts">
	import AllBoardButton from './AllBoardButton.svelte';
	import BrandIcon from './icons/BrandIcon.svelte';
	import Search from './Search.svelte';
	import AccountDropdown from './AccountDropdown.svelte';

	let isDropDownOpen = false;

	export function clickOutside(element, callbackFunction) {
		function onClick(event) {
			if (!element.contains(event?.target)) {
				callbackFunction();
			}
		}
		document.addEventListener('click', onClick);
		return {
			update(newCallBackFunction) {
				callbackFunction = newCallBackFunction;
			},
			destroy() {
				document.removeEventListener('click', onClick);
			}
		};
	}

	// return the first letter
	const firstLetter = (username) => {
		return username.charAt(0);
	};

	const handleDropDownClick = () => {
		isDropDownOpen = !isDropDownOpen;
	};
</script>

<nav
	class="flex justify-between items-center border-b-2 border-[#D9DDE2] dark:border-[#32383D] h-[68px] w-full bg-[white] dark:bg-[#1D2125]"
>
	<!-- FIRST GROUP -->
	<div class="flex flex-row pl-[35px]">
		<a href="/boards">
			<BrandIcon />
		</a>

		<!-- BOARD TITLE -->
		<h1 class="text-[#333333] dark:text-[#B6C2CF] justify-center text-xl font-semibold ml-[130px]">
			Devchallenges Board
		</h1>
		<div class="inline-block h-[35px] mx-[30px] border-[1px] border-[#E0E0E0]"></div>

		<!-- <div>
            <div use:clickOutside={() => { isDropDownOpen= false }} class="dropdown active" data-dropdown>
                <button on:click={handleDropDownClick} data-dropdown-button id="link" class="h-[32px] text-sm font-medium text-white dark:text-[#1d2125] transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]">Create</button>
                
                {#if isDropDownOpen}
                    <div class="dropdown-menu">
                        <CreateBoard/>
                    </div>
                {/if}
            </div>
        </div> -->
		<AllBoardButton />
	</div>

	<Search />

	<AccountDropdown />
</nav>

<style lang="css">
	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		position: absolute;
		left: 0;
		top: calc(100% + 0.5rem);
		opacity: 0;
		transform: translateY(-10px);
		transition:
			opacity 150ms ease-in-out,
			transform 150ms ease-in-out;
	}

	.dropdown.active > #link + .dropdown-menu {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}
</style>
