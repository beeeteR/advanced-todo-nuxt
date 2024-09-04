<script setup lang="ts">

import { type ITask, EStateTask } from '../composables/types'

const todoStore = useTodoStore()
const props = defineProps<{
    view: 'icon' | 'element',
    taskId: number,
    isTaskPage?: boolean
}>()
const emits = defineEmits<{
    sendElementTaskActions: [el: HTMLElement | undefined]
}>()
const stateTaskActions = ref(false)
const task = ref<ITask>()
const taskActionsEl = ref<HTMLElement>()
let timerOpenedActions: NodeJS.Timeout | null = null
task.value = todoStore.getTaskById(props.taskId)
const computedHtmlText = computed(() => {
    return {
        actionVital: todoStore.checkTaskIsVital(props.taskId) ? 'Убрать из важных' : 'Добавить в важные',
        actionState: EStateTask.created === task.value?.state ? 'Начать' : 'Завершить'
    }
})

function toggleStateTaskActions() {
    stateTaskActions.value = !stateTaskActions.value
    if (stateTaskActions.value) clearTimer()
    else startTimer()
}

function startTimer() {
    clearTimer()
    timerOpenedActions = setTimeout(() => {
        stateTaskActions.value = false
    }, 500)
}

function resetTimer() {
    clearTimer()
    if (stateTaskActions.value) startTimer()
}

function clearTimer() {
    if (timerOpenedActions) {
        clearTimeout(timerOpenedActions)
        timerOpenedActions = null
    }
}

onMounted(() => {
    emits('sendElementTaskActions', taskActionsEl.value)
})

</script>


<template>
    <div @mouseenter="startTimer" @mouseleave="resetTimer">
        <div ref="taskActionsEl" class="task-actions" :class="{ '--task-actions-icon': props.view === 'icon' }">
            <div class="task-action__btn" @click="toggleStateTaskActions">
                <div class="task-actions__icon" v-if="props.view === 'icon'">
                    <img src="../assets/img/pages/edit-icon.svg" alt="">
                </div>
                <div class="actions-element" v-else>
                    <div class="actions-element__decor"></div>
                    <div class="actions-element__decor"></div>
                    <div class="actions-element__decor"></div>
                </div>
            </div>
            <div class="actions-wrapper" :class="{ '--actions-open': stateTaskActions }">
                <ul class="actions-list">
                    <li class="actions-elem" @click="todoStore.changeTastVital(props.taskId)">{{
                        computedHtmlText.actionVital }}</li>
                    <li class="actions-elem">Изменить</li>
                    <li class="actions-elem" @click="todoStore.delTaskById(props.taskId)" v-if="props.isTaskPage">Удалить</li>
                    <li class="actions-elem" @click="todoStore.changeStateTask(task!.state + 1, props.taskId)"
                        v-if="EStateTask.finished != task?.state">{{ computedHtmlText.actionState }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.task-actions {
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
}

.task-action__btn {
    align-self: flex-end;
    cursor: pointer;
}

.actions-element {
    display: flex;
    gap: 0.25rem;
    cursor: pointer;
}

.actions-element__decor {
    width: 8px;
    aspect-ratio: 1;
    border: 1px solid var(--light-grey);
    border-radius: 50%;
    transition: all 200ms;
}

.actions-element:hover .actions-element__decor {
    background-color: var(--light-blue);
    border-color: var(--light-blue);
}

.actions-wrapper {
    margin-top: 1rem;
    transform: scale(0);
    transform-origin: top right;
    padding: 1rem;
    background-color: white;
    border: 1px solid var(--light-blue);
    border-radius: 0.5rem;
    transition: all 300ms;
    z-index: 10;
}

.actions-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.actions-elem {
    position: relative;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 2px;
    width: fit-content;
    transform: translateX(0px);
    cursor: pointer;
    user-select: none;
    transition: all 300ms;
}

.actions-elem:hover {
    transform: translateX(10px);
}

.--actions-open {
    transform: scale(1);
}

.--task-actions-icon {
    flex-direction: column-reverse;
}

.--task-actions-icon .actions-wrapper {
    flex-direction: column;
    margin-top: unset;
    margin-bottom: 1rem;
    transform-origin: bottom right;
}
</style>
