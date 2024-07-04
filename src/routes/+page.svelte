<script>
	import Banner from '../components/Banner.svelte';
	import ExampleBoard from '../components/exampleBoard.svelte';
	import Footer from '../components/Footer.svelte';
	import { animate, inView, stagger } from 'motion';
	import { cards } from '$lib';
	import Card from '../components/Card.svelte';

	inView('#cards', () => {
		animate(
			'#card',
			{ opacity: [0, 1], x: [-100, 0] },
			{ delay: stagger(0.4, { easing: 'linear' }) }
		);
	});
</script>

<div
	class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
></div>

<div class="md:hidden">
	<Banner message="The mobile version is not available yet." />
</div>

<section class="flex flex-col mt-3 md:mt-10 px-9 md:px-[100px] w-full">
	<main class="flex flex-col md:flex-row justify-between mt-8 w-full">
		<div class="mb-8 md:mb-0">
			<h1 class="font-extrabold text-3xl md:text-6xl text-[#1C1E21] inline">
				<span
					class="bg-clip-text text-transparent bg-gradient-to-r to-[#7877c6] via-[#1080CF] from-[#afabff]"
					>Thullo</span
				>
				organize your lists in full screen board
			</h1>
			<p class="mt-5 -tracking-wide text-xl font-semibold text-[#7877C6]">
				To stay on top of your work ✨
			</p>
		</div>
		<ExampleBoard />
	</main>
	<div
		class="flex flex-col items-center gap-10 md:px-0 md:flex-row justify-between mt-16"
		id="cards"
	>
		{#each cards as card}
			<Card {card} />
		{/each}
	</div>
</section>

<Footer />

<style lang="css">
	section {
		/* 40 + 68 + 32 + 64 px*/
		min-height: calc(100vh - 170px);
	}

	@font-face {
		font-family: 'Satoshi';
		src: url('/fonts/Satoshi-Bold.woff2') format('woff2');
	}

	* {
		color: #1c1e21;
	}
</style>
