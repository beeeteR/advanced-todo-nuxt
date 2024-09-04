<script setup lang="ts">

const todoStore = useTodoStore()
const props = defineProps<{
    task: ITask;
}>();
const emits = defineEmits<{
    taskDeleted: []
}>()
const alertState = ref(false)
const computedHtmlText = computed(() => {
    return {
        textFormatDate: getTextFormatDate(props.task.creationDateTimestamp),
        taskDesc: props.task.desc?.length ? props.task.desc : "Описание отсутствует.",
        taskPriority: props.task.priority === 1 ? "Второстепенный" : props.task.priority === 2 ? "Умеренный" : "Макс. приоритет",
        taskState: props.task.state === 1 ? "Создано" : props.task.state === 2 ? "Начато" : "Завершено",
    }
})

function changeAlertState(settedState: boolean) {
    alertState.value = settedState
}
function applyChanges() {
    changeAlertState(false)
    todoStore.delTaskById(props.task.id)
    emits('taskDeleted')
}

</script>

<template>
    <div class="task-card full-card" v-if="props.task">
        <div class="task__header">
            <img v-if="task.file" :src="task.file.name" alt="" />
            <div class="task__short-info">
                <h3 class="task__title">{{ props.task.name }}</h3>
                <p>Приоритет:
                    <span :class="{
                        '--text-green': EPriorityTask.low === props.task.priority,
                        '--text-light-blue': EPriorityTask.medium === props.task.priority,
                        '--text-red': EPriorityTask.extreme === props.task.priority,
                    }">{{ computedHtmlText.taskPriority }}
                    </span>
                </p>
                <p>Статус:
                    <span :class="{
                        '--text-red': EStateTask.created === props.task.state,
                        '--text-blue': EStateTask.started === props.task.state,
                        '--text-green': EStateTask.finished === props.task.state,
                    }">{{ computedHtmlText.taskState }}</span>
                </p>
                <p class="task__create-date">Создано: {{ computedHtmlText.textFormatDate }}</p>
            </div>
        </div>
        <div class="task__body">
            <p class="task__desc">
                {{ props.task.desc?.length ? props.task.desc : "Описание отсутствует." }}
            </p>
        </div>
        <div class="task__footer">
            <tasks-task-actions :taskId="props.task.id" :view="'icon'" class="task__actions" />
            <button class="footer__btn" @click="changeAlertState(true)"><img
                    src="~/assets/img/pages/delete-icon.svg" alt="delete"></button>
        </div>
        <popups-alert :state="alertState" :title="`Удаляю задачу <${task?.name}>`" :withOpportunityCancel="true"
            whatCanceled="delete" @cancelChanges="changeAlertState(false)" @applyChanges="applyChanges" />
    </div>
</template>

<style lang="scss">
.full-card {
    margin-top: 0;
    padding: 0;
    height: 100%;
    border: none;
    cursor: auto;

    .task {
        &__header {
            gap: 1rem;

            img {
                height: 100%;
                max-height: 160px;
                aspect-ratio: 1;
            }
        }

        &__short-info {
            flex-direction: column;

            p {
                font-size: 14px;
            }
        }

        &__title {
            font-size: 1.25rem;
        }

        &__body {
            flex-grow: 1;
        }

        &__desc {
            font-size: 1rem;
            height: 100%;
        }

        &__footer {
            position: relative;
            min-height: 50px;
            justify-content: flex-end;
            gap: 1rem;

            .footer__btn {
                height: fit-content;
                align-self: flex-end;
            }
        }

        &-card__actions {
            top: unset;
            bottom: 0;
            right: 3rem;
        }
    }
}

</style>