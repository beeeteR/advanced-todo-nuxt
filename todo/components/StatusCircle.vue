<script setup lang="ts">

const props = defineProps<{
    color: 'green' | 'blue' | 'red',
    title: string,
    percent: number
}>()
const localeColor = computed(() => props.color)
</script>
z
<template>
    <div class="status-circle">
        <svg viewBox="0 0 36 36" width="150px" height="150px" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle"
                :class="{ '--stroke-green': props.color === 'green', '--stroke-blue': props.color === 'blue', '--stroke-red': props.color === 'red' }"
                :stroke-dasharray="`${props.percent}, 100`" d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" class="percentage">{{ `${props.percent}%` }}</text>
        </svg>
        <p class="status-circle__title">{{ props.title }}</p>
    </div>
</template>

<style>
:root {
    --stroke-circle: 4px;
}

.status-circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1.5rem;
}

.status-circle__title {
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.status-circle__title::before {
    content: "";
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: v-bind(localeColor);
}

.circular-chart {
    display: block;
    max-width: 200px;
    max-height: 200px;
}

.circle-bg {
    fill: none;
    stroke: var(--light-grey);
    stroke-width: var(--stroke-circle);
}

.percentage {
    font-weight: 500;
    font-size: 0.45rem;
    text-anchor: middle;
}

.circle {
    fill: none;
    stroke-width: var(--stroke-circle);
}

.--stroke-green {
    stroke: var(--green);
}

.--stroke-red {
    stroke: var(--red);
}

.--stroke-blue {
    stroke: var(--blue);
}
</style>