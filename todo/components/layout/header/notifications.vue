<script lang="ts" setup>

const todoStore = useTodoStore()
const notifications = computed(() => todoStore.getNotifications)
const showNotification = ref<boolean>(false)
const stateTasks = computed(() => notifications.value.map(item => item.task?.state))

function changeStateNotifications(state?: boolean) {
    showNotification.value = state === undefined ? !showNotification.value : state
}

watch(stateTasks, () => {
    if (stateTasks.value.includes(EStateTask.finished)) {
        todoStore.setNotification()
    }
})

</script>

<template>
    <div class="notifications">
        <div class="notifications__btn" @click="changeStateNotifications()">
            <img class="notifications__btn-img" src="~/assets/img/header/Notifications.svg" alt="">
            <span class="notifications__btn-counter" v-show="notifications.length">{{ notifications.length }}</span>
        </div>
        <div class="notifications__list" :class="{ 'notifications__list-active': showNotification }"
            @click="changeStateNotifications(false)" @mouseleave="changeStateNotifications(false)">
            <nuxt-link class="notifications__item" v-for="(notificationsItem, index) in notifications" :key="index"
                :to="`task-id-${notificationsItem.task?.id}`" :class="{
                    '--bg-light-blue': notificationsItem.type === ENotificationTypes.lastDay,
                    '--bg-red': notificationsItem.type === ENotificationTypes.afterLastDay
                }">
                <h3>{{ notificationsItem.task?.name }}</h3>
                <p>{{ EStateTaskRu[notificationsItem.task?.state as unknown as keyof typeof EStateTaskRu] }}</p>
                <p>{{ EPriorityTaskRu[notificationsItem.task?.priority as unknown as keyof typeof EPriorityTaskRu] }}
                </p>
                <p>{{ notificationsItem.type }}</p>
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