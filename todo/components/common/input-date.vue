<script setup lang="ts">
const todoStore = useTodoStore();
const currentDate = todoStore.getTimestamps.current
const thisRoute = useRoute().name
const selectedDateTimestamp = ref<number>(currentDate)
const emits = defineEmits<{
	changeDate: [selectedDateTimestamp: number];
}>();

const minDate = computed(() => {
	return thisRoute === 'index' ?
		dateToHTMLFromJS(todoStore.getMinTimestamp) :
		dateToHTMLFromJS(currentDate)
})
const maxDate = computed(() => {
	return dateToHTMLFromJS(currentDate + 365 * 24 * 3600 * 1000)
})

function dateToJSFromHTML(htmlElem: HTMLInputElement) {
	const htmlValue = htmlElem.value.split("-")
	const thisDate = new Date()
	thisDate.setFullYear(Number(htmlValue[0]))
	thisDate.setMonth(Number(htmlValue[1]) - 1)
	thisDate.setDate(Number(htmlValue[2]))
	return thisDate.getTime()
}

function dateToHTMLFromJS(dateTimestamp: number) {
	return getTextFormatDate(dateTimestamp).split('/').reverse().join('-')
}

function updateSelectedDate(e: Event) {
	selectedDateTimestamp.value = dateToJSFromHTML(e.target as HTMLInputElement);
}

watch(selectedDateTimestamp, () => emits("changeDate", selectedDateTimestamp.value))
</script>

<template>
	<input class="input-date" type="date" :min="minDate" :max="maxDate" :value="dateToHTMLFromJS(currentDate)"
		@change="updateSelectedDate" />
</template>

<style lang="scss">
.input-date {
	cursor: text;

	&::-webkit-calendar-picker-indicator {
		appearance: none;
		width: 24px;
		height: 24px;
		background-image: url(~/assets/img/pages/input-date.svg);
		background-repeat: no-repeat;
		transform: scale(0.9);
		cursor: pointer;
		z-index: 1;
		transition: all 300ms;

		&:hover {
			transform: scale(1);
		}
	}
}
</style>
