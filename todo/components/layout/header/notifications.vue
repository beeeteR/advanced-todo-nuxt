<script lang="ts" setup>

const todoStore = useTodoStore()
const notifications = computed(() => todoStore.getNotifications)
const tasks = computed(() => notifications.value.reduce((acc, item) => {
    if (item.taskId) {
        const task = todoStore.getTaskById(item.taskId)
        if (task) acc.push(task)
    }
    return acc
}, [] as ITask[]))
const showNotification = ref<boolean>(false)

function changeStateNotifications(state?: boolean) {
    showNotification.value = state === undefined ? !showNotification.value : state
}
function getTypeById(id: number) {
    return notifications.value.find(item => item.taskId === id)?.type
}
</script>

<template>
    <div class="notifications">
        <div class="notifications__btn" @click="changeStateNotifications()">
            <img class="notifications__btn-img" src="~/assets/img/header/Notifications.svg" alt="">
            <span class="notifications__btn-counter" v-show="notifications.length">{{ notifications.length }}</span>
        </div>
        <div class="notifications__list" :class="{ 'notifications__list-active': showNotification }"
            @click="changeStateNotifications(false)" @mouseleave="changeStateNotifications(false)">
            <nuxt-link 
                    class="notifications__item" 
                    v-for="(task, index) in tasks" :key="index"
                    :to="`task-id-${task.id}`"
                    :class="{ 
                        '--bg-light-blue': getTypeById(task.id) === ENotificationTypes.lastDay, 
                        '--bg-red': getTypeById(task.id) === ENotificationTypes.afterLastDay 
                        }">
                <h3>{{ task.name }}</h3>
                <p>{{ EStateTaskRu[EStateTask[task.state]] }}</p>
                <p>{{ EPriorityTaskRu[EPriorityTask[task.priority]] }}</p>
                <p>{{ ENotificationTypes[getTypeById(task.id)] }}</p>
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="scss">
.notifications {
    position: relative;

    &__list {
        position: absolute;
        top: 2.5rem;
        right: 0;
        width: 320px;
        max-height: 0px;
        overflow-y: scroll;
        border-radius: 0.5rem;
        transition: max-height 300ms;
        z-index: 5;

        &-active {
            max-height: 240px;
        }
    }

    &__item {
        display: flex;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid white;
        border-top: 1xp solid white;
    }

    &__btn {
        position: relative;

        &-counter {
            position: absolute;
            top: -12px;
            right: -10px;
            width: 24px;
            aspect-ratio: 1;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            background-color: map-get($colors, 'red');
            outline: 1px solid white;
            border-radius: 50%;
        }
    }
}
</style>