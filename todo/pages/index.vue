<script setup lang="ts">
import { ERuMonth, typesWordMonth, typesWordDays } from '~/composables/types';

const todoStore = useTodoStore()
const storeTimestamps = computed(() => todoStore.getTimestamps)
const neededToThisComponentTasks = computed(() => {
    return {
        nonVitalBySelectedDate: todoStore.getNonVitalTasks(todoStore.getTasksByDate(storeTimestamps.value.selected, true)),
        vitalBySelectedDate: todoStore.getVitalsTasks(todoStore.getTasksByDate(storeTimestamps.value.selected, true)),
        completed: todoStore.getCompletedTasks
    }
})

function getStringFullDate(timestamp: number) {
    const date = new Date(timestamp)
    return `${date.getDate()} ${ERuMonth[date.getMonth() + 1]} ${date.getFullYear()}`
}

const getPassedTime = computed(() => {
    const currentDate = new Date(storeTimestamps.value.current)
    const currentDateObj = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        day: currentDate.getDate()
    }
    const choicedDate = new Date(storeTimestamps.value.selected)
    const choicedDateObj = {
        year: choicedDate.getFullYear(),
        month: choicedDate.getMonth(),
        day: choicedDate.getDate()
    }

    if (choicedDateObj.year - currentDateObj.year > 0) {
        return `Через ${choicedDateObj.year - currentDateObj.year} год`
    }
    if (choicedDateObj.month - currentDateObj.month > 0) {
        return `Через ${choicedDateObj.month - currentDateObj.month} ${plural(choicedDateObj.month - currentDateObj.month, Object.keys(typesWordMonth).filter(el => isNaN(Number(el))))}`
    }
    if (choicedDateObj.day - currentDateObj.day > 0) {
        return `Через ${choicedDateObj.day - currentDateObj.day} ${plural(choicedDateObj.day - currentDateObj.day, Object.keys(typesWordDays).filter(el => isNaN(Number(el))))}`
    }
    if (choicedDateObj.day - currentDateObj.day < 0) {
        return `${currentDateObj.day - choicedDateObj.day} ${plural(currentDateObj.day - choicedDateObj.day, Object.keys(typesWordDays).filter(el => isNaN(Number(el))))} назад`
    }
    return 'Сегодня'
})

function goToTheTaskPage(taskId: number) {
    useRouter().replace(`/task_id-${taskId}`)
}

</script>


<template>
    <div class="dashboard --border-wrapper">
        <div class="dashboard__tasks --border-wrapper">
            <div class="dashboard__tasks-header">
                <div class="dashboard__tasks__pre-title">
                    <div class="dashboard__tasks-header__title">
                        <img src="../assets/img/pages/Pending.svg" alt="">
                        <common-page-title :title="'To-Do'" class="dashboard__title" />
                    </div>
                    <nuxt-link :to="'/create-task'" class="dashboard__tasks-header__btn">
                        <span>+</span>
                        <span>Добавить задачу</span>
                    </nuxt-link>
                </div>
                <div class="dashboard__tasks-date">
                    <span>
                        {{ getStringFullDate(storeTimestamps.selected) }}
                    </span>
                    <span>
                        {{ getPassedTime }}
                    </span>
                </div>
            </div>
            <div class="dashboard__tasks-by-date">
                <tasks-task-item v-for="(task) in neededToThisComponentTasks.nonVitalBySelectedDate" :key="task.id" :task="task" @cardSelected="goToTheTaskPage(task.id)" />
            </div>
            <div class="dashboard__vital-tasks-by-date" v-if="neededToThisComponentTasks.vitalBySelectedDate.length">
                <span class="dashboard__tasks-separator"></span>
                <tasks-task-item v-for="(task) in neededToThisComponentTasks.vitalBySelectedDate" :key="task.id" :task="task"
                    @cardSelected="goToTheTaskPage(task.id)" />
            </div>
        </div>
        <div class="dashboard__info">
            <div class="dashboard__info__status --border-wrapper">
                <div class="dashboard__tasks-header__title">
                    <img src="../assets/img/pages/status.svg" alt="">
                    <common-page-title title="Общий статус" class="dashboard__title" />
                </div>
                <ui-general-status />
            </div>
            <div class="dashboard__info__completed --border-wrapper" v-if="neededToThisComponentTasks.completed.length">
                <div class="dashboard__tasks-header__title">
                    <img src="../assets/img/pages/completed.svg" alt="">
                    <common-page-title :title="'Выполненные задачи'" class="dashboard__title" />
                </div>
                <tasks-task-item v-for="(task) in neededToThisComponentTasks.completed" :key="task.id" :task="task"
                    @click="goToTheTaskPage(task.id)" />
            </div>
        </div>
    </div>
</template>

<style>
.dashboard {
    display: flex;
    gap: 1rem;
}

.dashboard__tasks,
.dashboard__info {
    width: 50%;
}

.dashboard__tasks,
.dashboard__info,
.dashboard__info__status,
.dashboard__info__completed {
    border: none;
}

.dashboard__tasks,
.dashboard__tasks-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.dashboard__tasks__pre-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dashboard__tasks-header__title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.dashboard__title h1 {
    color: var(--pink);
    font-weight: 500;
}

.dashboard__tasks-header__btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 1rem;
    outline: 1px solid white;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 300ms;
}

.dashboard__tasks-header__btn:hover {
    background-color: var(--pink);
}

.dashboard__tasks-header__btn span {
    transition: all 300ms 150ms;
}

.dashboard__tasks-header__btn span:first-child {
    font-size: 1.8rem;
    font-weight: 300;
    color: var(--pink);
}

.dashboard__tasks-header__btn span:last-child {
    color: var(--light-grey);
    font-weight: 400;
}

.dashboard__tasks-header__btn:hover span {
    color: white;
}

.dashboard__tasks-date {
    font-size: 14px;
}

.dashboard__tasks-date span:last-child {
    color: var(--light-grey);
    padding-left: 1rem;
}

.dashboard__tasks-separator {
    display: block;
    width: 100%;
    height: 1px;
    margin: 2rem 0 3rem 0;
    background-color: var(--light-grey);
}

.dashboard__info {
    display: flex;
    flex-direction: column;
    gap: 1rem
}

.dashboard__info__completed .dashboard__tasks-header__title {
    padding-bottom: 1rem;
}
</style>