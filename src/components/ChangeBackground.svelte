<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectBackgroundColors from './SelectBackgroundColors.svelte';
	import SelectBackgroundPhotos from './SelectBackgroundPhotos.svelte';
	import SelectBackgroundCustom from './SelectBackgroundCustom.svelte';
	import UnsplashIcon from './icons/UnsplashIcon.svelte';
	const dispatch = createEventDispatcher();

	let isOpenColors = false;
	let isOpenPhotos = false;

	const openColors = () => {
		isOpenColors = true;
	};

	const openPhotos = () => {
		isOpenPhotos = true;
	};
</script>

{#if !isOpenPhotos && !isOpenColors}
	<div class="w-full flex justify-between flex-row gap-4">
		<button
			on:click={() => openColors()}
			style="background-image: url(/colors.webp);"
			class="w-[150px] h-[96px] rounded-[3px] bg-center bg-no-repeat bg-cover"
		>
		</button>

		<button
			on:click={() => openPhotos()}
			class="flex justify-center w-[150px] h-[96px] rounded-[3px] bg-[#dadde2]"
		>
			<div class="h-[100px] w-[100px] flex items-center">
				<UnsplashIcon />
			</div>
		</button>

		<hr class="my-[10px] mb-9" />
	</div>

	<h2 class="text-sm font-semibold mt-9 dark:text-[#b6c2cf] mb-2">Custom</h2>
	<SelectBackgroundCustom on:changeBackgroundCustom={() => dispatch('changeBackground')} />
{/if}

{#if isOpenColors}
	<SelectBackgroundColors on:changeBackgroundColor={() => dispatch('changeBackground')} />
{/if}

{#if isOpenPhotos}
	<SelectBackgroundPhotos on:changeBackgroundUnplash={() => dispatch('changeBackground')} />
{/if}
