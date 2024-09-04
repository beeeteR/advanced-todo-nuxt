<script lang="ts" setup>

interface IAlertProps {
    title: string,
    state?: boolean,
    withOpportunityCancel?: boolean,
    whatCanceled?: string
}

const props = defineProps<IAlertProps>()
const emits = defineEmits<{
    alertClosed: [state: boolean],
    cancelChanges: [whatCanceled: string],
    applyChanges: []
}>()
const localeState = ref(false)
let timeoutState: NodeJS.Timeout
let isApplyChanges = true

watch(() => props.state, () => {
    if (props.state != localeState.value) {
        localeState.value = props.state

        timeoutState = setTimeout(() => {
            localeState.value = false
        }, props.withOpportunityCancel ? 5000 : 3000);
    }
})

watch(localeState, () => {
    if (!localeState.value) {
        emits('alertClosed', localeState.value)
        clearTimeout(timeoutState)
        if (props.withOpportunityCancel && isApplyChanges) {
            emits('applyChanges')
        }
    }
    isApplyChanges = true
})

function cancelChanges() {
    localeState.value = false
    isApplyChanges = false
    if (props.whatCanceled) {
        emits('cancelChanges', props.whatCanceled)
    }
}

function closeAlert() {
    if (!props.withOpportunityCancel) localeState.value = false
}

onMounted(() => {
    if (props.withOpportunityCancel && !props.whatCanceled) {
        throw new Error('Если передан "withOpportunityCancel", то должен быть передан и "whatCanceled"');
    }
})

</script>

<template>
    <div class="alert-wrapper" :class="{ '--alert-active': localeState, '--is-question': props.withOpportunityCancel }"
        @click="closeAlert">
        <h2 class="alert-text">{{ props.title }}</h2>
        <button class="btn alert-btn --btn-red" @click="cancelChanges" v-if="withOpportunityCancel">Отменить</button>
    </div>
</template>

<style>
.alert-wrapper {
    position: fixed;
    top: -150vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem 2rem;
    background-color: var(--red);
    border-radius: 0.5rem;
    opacity: 1;
    z-index: 100;
    cursor: pointer;
    transition: all 400ms;
}

.alert-wrapper:hover {
    opacity: 0.8;
}

.--alert-active {
    top: 5%;
}

.alert-text {
    color: white;
    font-weight: 500;
    font-size: 1.15rem;
}

.--is-question {
    cursor: auto;
}

.--is-question:hover {
    opacity: 1;
}

.alert-btn {
    transition: all 300ms;
}

.alert-btn:hover {
    box-shadow: 0 0 4px 2px white;
}

@keyframes progress-bar {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

.--alert-active.--is-question::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 8px;
    background-color: white;
    background-image: linear-gradient(to right, var(--pink) 65%, white);
    border-radius: 0.5rem;
    animation-name: progress-bar;
    animation-duration: 7000ms;
    animation-timing-function: linear;
}
</style>