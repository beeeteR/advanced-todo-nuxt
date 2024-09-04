<script setup lang="ts">

import { EStateTask } from '~/composables/types';

interface ITaskStateProps {
    state: number
}

const props = defineProps<ITaskStateProps>()
const taskStateText = computed(() => props.state === 1 ? "Создано" : props.state === 2 ? "Начато" : "Завершено")

</script>

<template>
    <p>Статус:
        <span :class="{
            '--text-red': EStateTask.created === props.state,
            '--text-blue': EStateTask.started === props.state,
            '--text-green': EStateTask.finished === props.state,
        }">{{ taskStateText }}</span>
    </p>
</template>

<style></style>