<script setup lang="ts">

export type { EStateTask, EPriorityTask, ITask } from '~/composables/types'

const todoStore = useTodoStore()
const newTask: ITask = reactive({
    id: Date.now(),
    creationDateTimestamp: Date.now(),
    endDateTimespamp: Date.now(),
    state: 1,
    priority: 1,
    name: '',
    desc: null,
    file: undefined,
    vital: false
})
const priorityTask = ref<keyof typeof EPriorityTask>('low')
const fileTask = ref()
const alertState = ref(false)
const alertText = ref('')

function getImage(e: Event) {
    const files: FileList | null = (e.target as HTMLInputElement).files
    if (files === null) return
    fileTask.value = files[0]
}

function changeDate(dateTimestamp: number) {
    newTask.endDateTimespamp = dateTimestamp
}

function validation() {
    const keysEnumPriorityTask = Object.values(EPriorityTask).filter((item) => typeof item === 'string')
    if (newTask.name.length === 0) return 'title'
    if (!keysEnumPriorityTask.includes(priorityTask.value)) return 'priority'
    return 'ok'
}

function addNewTask() {
    const validationResult = validation()
    switch (validationResult) {
        case 'ok':
            newTask.priority = EPriorityTask[priorityTask.value]
            todoStore.addTask(newTask)
            useRouter().push('/my-tasks')
            break;
        case 'title':
            callAlert('Введите название')
            break
        case 'priority':
            callAlert('Ошибка выбора приоритета, перезагрузите страницу')
            break;
    }
}

// function resetVars() {
//     newTask.value.name.value = ''
//     descTask.value = ''
//     fileTask.value = null
// }

function callAlert(title: string) {
    alertText.value = title
    alertState.value = true
}

</script>


<template>
    <div>
        <form method="post" class="create-task-form" enctype="multipart/form-data">
            <div class="create-task-form__vert-elem">
                <div class="task-form-elem">
                    <p class="task-form-elem__input-title" :class="{ '--text-red': newTask.name.length == 0 }">Название
                    </p>
                    <input type="text" name="title" class="task-form-elem__input"
                        :class="{ '--btn-red': newTask.name.length == 0 }" v-model="newTask.name">
                </div>
                <div class="task-form-elem">
                    <p class="task-form-elem__input-title">Дата окончания</p>
                    <common-input-date class="task-form-elem__input" @changeDate="changeDate" />
                </div>
                <div class="task-form-elem">
                    <p class="task-form-elem__input-title">Приоритет</p>
                    <div class="create-task-form__hor-elem">
                        <div class="priority-input-wrapper">
                            <input type="radio" name="priority" id="extreme" class="task-form-elem__input --input-radio"
                                value="extreme" v-model="priorityTask">
                            <label class="label-priority" for="extreme">
                                <div class="circle-priority" data-priority="extreme"></div>
                                <span>Макс. приоритет</span>
                            </label>
                        </div>
                        <div class="priority-input-wrapper">
                            <input type="radio" name="priority" id="medium" class="task-form-elem__input --input-radio"
                                value="medium" v-model="priorityTask">
                            <label class="label-priority" for="medium">
                                <div class="circle-priority" data-priority="medium"></div>
                                <span>Умеренный</span>
                            </label>
                        </div>
                        <div class="priority-input-wrapper">
                            <input type="radio" name="priority" id="low" class="task-form-elem__input --input-radio"
                                value="low" v-model="priorityTask" checked>
                            <label class="label-priority" for="low">
                                <div class="circle-priority" data-priority="low"></div>
                                <span>Второстепенный</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="task-form-elem"></div>
            <div class="task-form-elem">
                <p class="task-form-elem__input-title">Описание</p>
                <textarea name="desc" placeholder="Я есть описание" class="create-task__area"
                    v-model="newTask.desc"></textarea>
            </div>
            <div class="task-form-elem relative">
                <p class="task-form-elem__input-title">Загрузите изображение</p>
                <input type="file" name="file" class="task-form-elem__input" accept="image/*" @change="getImage">
                <span class="input-file__desc" v-show="!fileTask">Переместите файлы сюда<br>или</span>
                <span class="input-file__desc" v-show="fileTask">{{ fileTask?.name }}</span>
            </div>
            <button class="btn --form-btn" @click.prevent="addNewTask">Создать задачу</button>
        </form>
        <popups-alert :title="alertText" :state="alertState" @alertClosed="alertState = false" />
    </div>
</template>

<style lang="scss">
.create-task-form {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 2rem 1rem 1rem;
    gap: 2rem;

    .task-form-elem {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &__input-title {
            font-weight: 600;
            transition: all 300ms;
        }

        .priority-input-wrapper {
            display: flex;
            flex-direction: row-reverse;
            gap: 0.5rem;

            .label-priority {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;

                .circle-priority {
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;

                    &[data-priority="extreme"] {
                        background-color: map-get($colors, 'red');
                    }

                    &[data-priority="medium"] {
                        background-color: map-get($colors, 'light-blue');
                    }

                    &[data-priority="low"] {
                        background-color: map-get($colors, 'green');
                    }
                }
            }
        }

        .create-task__area {
            height: 15rem;
            padding: 1rem;
            resize: none;
            border: 1px solid map-get($colors, 'light-grey');
            border-radius: 0.5rem;
        }

        .input-file__desc {
            position: absolute;
            width: 205px;
            max-height: 40px;
            top: 62%;
            left: 50%;
            transform: translateX(-50%);
            color: map-get($colors, 'light-grey');
            text-align: center;
            word-break: break-all;
            overflow: hidden;
            z-index: -1;
        }
    }

    &__hor-elem {
        display: flex;
        gap: 4rem;
    }

    &__vert-elem {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
}


.--input-radio[type="radio"] {
    appearance: none;
    padding: 0;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 0;
    transform: scale(1) rotate(0deg);
    transition: all 350ms ease;
    cursor: pointer;

    &:checked {
        background-color: map-get($colors, 'pink');
        border: 1px solid map-get($colors, 'pink');
        border-radius: 50%;
        transform: scale(1.2) rotate(180deg);
    }
}


.task-form-elem__input[type="file"] {
    position: relative;
    height: 100%;
    background-color: transparent;
    background-image: url(~/assets/img/pages/input-file.svg);
    background-repeat: no-repeat;
    background-position: 50% 20%;
    background-size: 25%;
    color: transparent;
    cursor: pointer;

    &::-webkit-file-upload-button {
        appearance: none;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translateX(-50%);
        height: fit-content;
        padding: 0.5rem 1rem;
        color: map-get($colors, 'light-grey');
        background-color: transparent;
        font-weight: 500;
        border: 1px solid map-get($colors, 'light-grey');
        border-radius: 0.5rem;
        cursor: pointer;
    }
}

.relative {
    position: relative;
}

.--form-btn {
    width: fit-content;
}
</style>