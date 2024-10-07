<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select/index.js';
	import { cn } from '$lib/utils.js';
	import { DateFormatter, getLocalTimeZone, type DateValue, today } from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined = undefined;

	const items = [
		{ value: 0, label: 'Today' },
		{ value: 1, label: 'Tomorrow' },
		{ value: 3, label: 'In 3 days' },
		{ value: 7, label: 'In a week' },
		{ value: 30, label: 'In a month' }
	];

	$: if (value) console.log(value.toString(), 'valor seleccionado');
</script>

<div class="flex flex-col gap-2">
	<p class="text-[13px] font-semibold text-[#666]">Due date</p>
	<Popover.Root openFocus portal={null}>
		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				class={cn(
					'w-full h-[36px] text-xs justify-start text-left font-normal',
					!value && 'text-muted-foreground'
				)}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="flex w-auto flex-col space-y-2 p-2 ">
			<Select.Root
				portal={null}
				{items}
				onSelectedChange={(v) => {
					if (!v) return;
					value = today(getLocalTimeZone()).add({ days: v.value });
				}}
			>
				<Select.Trigger>
					<Select.Value placeholder="Select" />
				</Select.Trigger>
				<Select.Content>
					{#each items as item}
						<Select.Item value={item.value}>{item.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<div class="rounded-md border">
				<Calendar bind:value />
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
