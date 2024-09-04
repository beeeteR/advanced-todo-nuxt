<script setup lang="ts">

import { type ITask } from '~/composables/types';

const todoStore = useTodoStore()
const taskId: number = Number(useRoute().params.id)
const task: ITask | undefined = todoStore.getTaskById(taskId)
const alertState = ref(false)

onMounted(() => {
    if (!task) useRouter().replace('/')
})

function goDashboard() {
    useRouter().replace('/')
}
function deleteTask() {
    alertState.value = true
}
function alertClosed() {
    alertState.value = !alertState.value
}
function applyChanges() {
    alertClosed()
    todoStore.delTaskById(taskId)
    useRouter().replace('/')
}
</script>

<template>
    <div class="task-page --border-wrapper" v-if="task">
        <div class="task-page__header">
            <img :src="task.file?.name" alt="" v-if="task.file">
            <div class="header__short-info">
                <h2 class="short-info__task-name">{{ task.name }}</h2>
                <TaskPriority class="short-info__task-priority" :priority="task.priority" />
                <TaskState class="short-info__task-state" :state=task.state />
                <div class="short-info__task-dates">
                    <p class="task-dates__create">Дата создания: {{ getTextFormatDate(task.creationDateTimestamp) }}</p>
                    <p class="task-dates__end">Дата окончания: {{ getTextFormatDate(task.endDateTimespamp) }}</p>
                </div>
            </div>
            <button class="header__btn-go-back" @click="goDashboard">Вернуться</button>
        </div>
        <div class="task-page__body">
            <p class="body__task-desc">{{ task.desc || 'Описание отсутствует.' }}</p>
        </div>
        <div class="task-page__footer">
            <div class="footer__btns">
                <TaskActions class="footer__btns-btn" :taskId="taskId" view="icon" />
                <button class="footer__btns-btn" @click="deleteTask"><img src="../assets/img/pages/delete-icon.svg"
                        alt="delete"></button>
            </div>
        </div>
    </div>
    <Alert :state="alertState" :title="`Удаляю задачу <${task?.name}>`" :withOpportunityCancel="true" whatCanceled="delete"
        @cancelChanges="alertClosed" @applyChanges="applyChanges"/>
</template>

<style>
.task-page {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.task-page__header {
    display: flex;
    gap: 1rem;
}

.header__short-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.short-info__task-name {
    font-size: 1.5rem;
    font-weight: 500;
}

.short-info__task-priority {}

.short-info__task-state {}

.short-info__task-dates {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.task-dates__create,
.task-dates__end {
    color: var(--light-grey);
    font-size: 14px;
}

.task-dates__create {}

.task-dates__end {}

.header__btn-go-back {
    margin-left: auto;
    height: fit-content;
    font-weight: 600;
    border-bottom: 1px solid black;
    transition: all 300ms;
}

.header__btn-go-back:hover {
    border-bottom: 1px solid var(--pink);
    color: var(--pink);
}

.task-page__body {}

.body__task-desc {
    color: var(--grey);
}

.task-page__footer {}

.footer__btns {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.footer__btns-btn {
    align-self: flex-end;
}
</style>