<script setup lang="ts">

import { EPriorityTask } from '~/composables/types';

interface ITaskPriorityProps {
    priority: number
}

const props = defineProps<ITaskPriorityProps>()
const taskPriorityText = computed(() => props.priority === 1 ? "Второстепенный" : props.priority === 2 ? "Умеренный" : "Макс. приоритет")


</script>

<template>
    <p>Приоритет:
        <span :class="{
            '--text-green': EPriorityTask.low === props.priority,
            '--text-light-blue': EPriorityTask.medium === props.priority,
            '--text-red': EPriorityTask.extreme === props.priority,
        }">{{ taskPriorityText }}
        </span>
    </p>
</template>

<style></style>