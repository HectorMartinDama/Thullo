<script lang="ts">
	import { page } from '$app/stores';

	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { TaskItem } from '$lib/types';

	import { cn, formatDate, pushSuccessNotification, formaDateToEuropean } from '$lib/utils.js';
	import { DateFormatter, getLocalTimeZone, type DateValue, today } from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';
	import DueDate from './DueDate.svelte';
	import { addDueDate } from '$lib/requestsBackend';
	import { createEventDispatcher, onMount } from 'svelte';
	import { format } from 'date-fns';
	import { is } from 'date-fns/locale';
	let closeCalendar = false;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	export let task: TaskItem;
	let sessionToken: string | undefined;
	let value: DateValue | undefined = task.dueDate
		? today(getLocalTimeZone()).set({
				era: 'short',
				year: Number(task.dueDate.split('-')[0]),
				month: Number(task.dueDate.split('-')[1]),
				day: Number(task.dueDate.split('-')[2])
			})
		: undefined;

	const dispatch = createEventDispatcher();

	const items = [
		{ value: 0, label: 'Today' },
		{ value: 1, label: 'Tomorrow' },
		{ value: 3, label: 'In 3 days' },
		{ value: 7, label: 'In a week' },
		{ value: 30, label: 'In a month' }
	];

	const isTheOwner: boolean = $page.data.session?.user?.email === task.user.email;

	const updateDueDate = async (date: string) => {
		await addDueDate(sessionToken, task.id, date);
		closeCalendar = false;
		dispatch('changeDueDate');
		pushSuccessNotification('Due date updated to ' + formaDateToEuropean(date));
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return () => {
			unsubcribe;
		};
	});

	const fromDate: Calendar.Props['fromDate'] = () => {
		return new Date();
	};
</script>

<div class="flex flex-col gap-2">
	<p class="text-xs font-semibold text-[#666] dark:text-[#bfbfbf]">Due date</p>

	<Popover.Root
		openFocus
		portal={null}
		open={closeCalendar}
		onOpenChange={() => (closeCalendar = true)}
	>
		<Popover.Trigger asChild let:builder>
			<Button
				disabled={!isTheOwner}
				variant="outline"
				class={cn(
					'w-full h-[36px]  bg-[#fcfaf8] dark:text-white dark:bg-[#1a1a1a] dark:hover:bg-[#262626] border-none text-xs text-[#202020] justify-start text-left font-normal',
					!value && 'text-muted-foreground'
				)}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yyyy') : 'Pick a date'}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="flex w-auto mt-2 flex-col space-y-2 p-2">
			<Select.Root
				portal={null}
				{items}
				onSelectedChange={(v) => {
					if (!v) return;
					value = today(getLocalTimeZone()).add({ days: v.value });
					updateDueDate(value.toString());
				}}
			>
				<Select.Trigger class="h-9">
					<Select.Value class="text-[13px]" placeholder="Select" />
				</Select.Trigger>
				<Select.Content>
					{#each items as item}
						<Select.Item class="text-[13px]" value={item.value}>{item.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<div class="rounded-md border">
				<Calendar
					class="text-xs"
					bind:value
					{fromDate}
					onValueChange={(v) => {
						if (!v) return;
						value = today(getLocalTimeZone()).set({
							era: 'short',
							year: v.year,
							month: v.month,
							day: v.day
						});
						updateDueDate(value.toString());
					}}
				/>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
