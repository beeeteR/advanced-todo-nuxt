<script setup lang="ts">
import { EStateTask } from "../composables/types";

const todoStore = useTodoStore();
const allTasks = computed(() => todoStore.getTasks);
const completedTasksCount = computed(() => {
    return allTasks.value.filter((task) => task.state === EStateTask.finished).length;
});
const startedTasksCount = computed(() => {
    return allTasks.value.filter((task) => task.state === EStateTask.started).length;
});
const createdTasksCount = computed(() => {
    return allTasks.value.filter((task) => task.state === EStateTask.created).length;
});
</script>

<template>
    <div class="general__status">
        <StatusCircle :color="'green'" :percent="allTasks.length != 0 && completedTasksCount != 0 ?
            Math.floor((completedTasksCount * 100) / allTasks.length) : 0" title="Завершено" />
        <StatusCircle :color="'blue'" :percent="allTasks.length != 0 && startedTasksCount != 0
            ? Math.floor((startedTasksCount * 100) / allTasks.length)
            : 0
            " title="В процессе" />
        <StatusCircle :color="'red'" :percent="allTasks.length != 0 && createdTasksCount != 0
            ? Math.floor((createdTasksCount * 100) / allTasks.length)
            : 0
            " title="Не начато" />
    </div>
</template>

<style>
.general__status {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}
</style>
