<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { differenceDays, formaDateToEuropean, formatDate, getDayMonth } from '$lib/utils';
	import { Calendar } from 'lucide-svelte';

	export let date;

	const hasPassed = (date: string): boolean => {
		const fechaInput = new Date(date);
		const hoy = new Date();
		hoy.setHours(0, 0, 0, 0);
		return fechaInput < hoy;
	};
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		class="text-xs {hasPassed(date)
			? 'text-[#d1453b]'
			: 'text-[#808080] '}  flex flex-row gap-1 items-center justify-center"
	>
		<Calendar class="h-3 w-3  {hasPassed(date) ? 'stroke-[#d1453b]' : 'stroke-[#808080]'} " />
		{getDayMonth(date)}
	</HoverCard.Trigger>
	<HoverCard.Content
		class="flex flex-col border-none text-black  w-[170px] text-xs bg-white bg-opacity-50 backdrop-blur-md"
	>
		{formaDateToEuropean(date)}
		<hr class="my-2 border-gray-500" />
		<span class="text-xs">{differenceDays(date)} days left</span>
	</HoverCard.Content>
</HoverCard.Root>
