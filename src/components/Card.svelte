<script lang="ts">
	import type { Card } from '$lib/types';

	export let card: Card;
</script>

<article
	id="card"
	class="flex flex-col rounded-[32px] py-[32px] px-[32px] border hover:border-[#7877C6] bg-[#F8F8F8] w-full h-[218px] md:w-[368px] md:h-[242px] cursor-pointer"
>
	<p class="text-center text-3xl mb-4">{card.icon}</p>
	<h1 class="text-base font-bold">{card.title}</h1>
	<p class="leading-6 text-sm font-medium mt-2 text-[#474554]">
		{card.content}
	</p>
</article>
