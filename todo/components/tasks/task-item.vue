<script setup lang="ts">
import type { ITask } from "../composables/types";

const props = defineProps<{
    task: ITask;
    isSelect?: boolean;
}>();
const emits = defineEmits<{
    cardSelected: [id: number];
}>();
const taskActionsCard = ref<HTMLElement>()
const computedHtmlText = computed(() => {
    return {
        textFormatDate: { create: getTextFormatDate(props.task.creationDateTimestamp), end: getTextFormatDate(props.task.endDateTimespamp) },
        taskDesc: props.task.desc?.length ? props.task.desc : "Описание отсутствует.",
    }
})

function clickedByTaskCard(event: Event) {
    const eventHtmlEl: HTMLElement = event.target as HTMLElement
    if (eventHtmlEl.classList.value.includes('actions') != taskActionsCard.value?.classList.value.includes('actions')) {
        emits("cardSelected", props.task?.id ? props.task.id : -1);
    }
}

function getElementTaskActions(htmlEl: HTMLElement | undefined) {
    taskActionsCard.value = htmlEl
}
</script>

<template>
    <div class="task-card" :class="{ '--selected-task-card': props.isSelect }" v-if="props.task"
        @click="clickedByTaskCard">
        <div class="task-card__decor-circle" :class="{
            '--border-red': EStateTask.created === props.task.state,
            '--border-blue': EStateTask.started === props.task.state,
            '--border-green': EStateTask.finished === props.task.state,
        }"></div>
        <tasks-task-actions :taskId="props.task.id" :view="'element'" class="task-card__actions"
            @sendElementTaskActions="getElementTaskActions" />
        <div class="task__header">
            <h3 class="task__title">{{ props.task.name }}</h3>
        </div>
        <div class="task__body">
            <p class="task__desc">{{ computedHtmlText.taskDesc }}</p>
            <img :src="props.task?.file.name" alt="task-card__img" v-if="props.task.file" />
        </div>
        <div class="task__footer">
            <div class="task__short-info">
                <tasks-task-priority :priority="props.task.priority" />
                <tasks-task-state :state="props.task.state" />
            </div>
            <div class="task-dates">
                <p class="task-dates__date">Дата создания: {{ computedHtmlText.textFormatDate.create }}</p>
                <p class="task-dates__date">Дата окончания: {{ computedHtmlText.textFormatDate.end }}</p>
            </div>
        </div>
    </div>
</template>

<style>
.task-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    margin-top: 1.5rem;
    border: 1px solid var(--light-grey);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 3rem;
    cursor: pointer;
    transition: background-color 300ms;
}

.--selected-task-card {
    background-color: rgba(161, 163, 171, 0.2);
}

.task-card__decor-circle {
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    width: 12px;
    aspect-ratio: 1;
    background-color: transparent;
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
    transition: all 400ms;
}

.task-card:hover .task-card__decor-circle {
    transform: scale(1.3);
}

.task-card:hover .--border-red {
    background-color: var(--red);
}

.task-card:hover .--border-blue {
    background-color: var(--blue);
}

.task-card:hover .--border-green {
    background-color: var(--green);
}

.task__title {
    font-weight: 600;
    font-size: 1rem;
    font-weight: 600;
}

.task__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task__desc {
    font-size: 14px;
    font-weight: 300;
    color: var(--light-grey);
}

.task__footer {
    display: flex;
    justify-content: space-between;
}

.task__short-info {
    display: flex;
    align-self: flex-end;
    gap: 1rem;
}

.task__short-info p,
.task-dates {
    font-size: 12px;
    font-weight: 300;
}

.task-dates {
    color: var(--light-grey);
}

.task-card__actions {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
}
</style>