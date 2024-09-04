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
                <tasks-task-priority class="short-info__task-priority" :priority="task.priority" />
                <tasks-task-state class="short-info__task-state" :state=task.state />
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
                <tasks-task-actions class="footer__btns-btn" :taskId="taskId" view="icon" />
                <button class="footer__btns-btn" @click="deleteTask"><img src="../assets/img/pages/delete-icon.svg"
                        alt="delete"></button>
            </div>
        </div>
    </div>
    <popups-alert :state="alertState" :title="`Удаляю задачу <${task?.name}>`" :withOpportunityCancel="true"
        whatCanceled="delete" @cancelChanges="alertClosed" @applyChanges="applyChanges" />
</template>

<style lang="scss">
.task-page {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    &__header {
        display: flex;
        gap: 1rem;

        .header {
            &__short-info {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .short-info {
                    &__task-name {
                        font-size: 1.5rem;
                        font-weight: 500;
                    }

                    &__task-priority {}

                    &__task-state {}

                    &__task-dates {
                        display: flex;
                        flex-direction: column;
                        gap: 0.25rem;

                        .task-dates {

                            &__create,
                            &__end {
                                color: map-get($colors, 'light-grey');
                                font-size: 14px;
                            }
                        }
                    }
                }
            }

            &__btn-go-back {
                margin-left: auto;
                height: fit-content;
                font-weight: 600;
                border-bottom: 1px solid black;
                transition: all 300ms;

                &:hover {
                    border-bottom: 1px solid map-get($colors, 'pink');
                    color: map-get($colors, 'pink');
                }
            }
        }
    }

    &__body {
        .body {
            &__task {
                &-desc {
                    color: map-get($colors, 'grey');
                }
            }
        }
    }

    &__footer {
        .footer {
            &__btns {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
            }

            &-btn {
                align-self: flex-end;

            }
        }
    }
}
</style>