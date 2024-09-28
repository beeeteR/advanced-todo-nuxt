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
        todoStore.setNotifications()
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
                :to="`task-id-${notificationsItem.task?.id}`">
                <h3 class="notifications__item-name">{{ notificationsItem.task?.name }}</h3>
                <div class="notifications__item-type">
                    <layout-header-notifications-warning :type="notificationsItem.type" />
                    <p class="type__text"
                        :class="{ '--text-red': notificationsItem.type === ENotificationTypes.afterLastDay, '--text-orange': notificationsItem.type === ENotificationTypes.lastDay }">
                        {{ notificationsItem.type }}</p>
                </div>
                <div class="notifications__item-info">
                    <tasks-task-state class="info__state" :state="notificationsItem.task!.state" />
                    <tasks-task-priority class="info__priority" :priority="notificationsItem.task!.priority" />
                </div>
                <div class="notifications__item-date">
                    <p class="date__start">Дата создания: {{
                        getTextFormatDate(notificationsItem.task!.creationDateTimestamp)
                        }}</p>
                    <p class="date__end">Дата окончания: {{
                        getTextFormatDate(notificationsItem.task!.endDateTimespamp) }}</p>

                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="scss">
$maxWidthNotificationsList: 480px;

.notifications {
    position: relative;

    &__list {
        position: absolute;
        top: 2.5rem;
        right: 0;
        width: $maxWidthNotificationsList;
        max-height: 0px;
        border-radius: 0.5rem;
        transition: max-height 300ms ease-out;
        overflow-y: auto;
        z-index: 5;

        &-active {
            max-height: 240px;
            box-shadow: 2px 2px 8px 1px map-get($colors, 'light-grey');
        }
    }

    &__item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.25rem 0.5rem;
        padding: 0.5rem 1rem;
        background-color: white;
        color: black;

        &:not(:last-child) {
            border-bottom: 1px solid black;
        }

        &-name {
            max-width: calc($maxWidthNotificationsList / 3 * 2);
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 18px;
            font-weight: 500;
            color: map-get($colors, 'pink');
        }

        &-info {
            .info {
                &__state {}

                &__priority {}

                &__state,
                &__priority {
                    font-size: 14px;
                }
            }
        }

        &-type {
            display: flex;
            align-items: center;
            gap: 1rem;

            .type {
                &__text {
                    font-size: 16px;

                    &::first-letter {
                        text-transform: uppercase;
                    }
                }
            }

        }

        &-date {
            font-size: 14px;
            color: map-get($colors, 'light-grey');
        }
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