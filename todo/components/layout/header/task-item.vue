<script lang="ts" setup>
interface IHeaderTaskItemProps {
    task: ITask
}
const props = defineProps<IHeaderTaskItemProps>()

</script>
<template>
    <nuxt-link :to="`task-id-${props.task.id}`" class="searched__task">
        <div class="searched__task-main">
            <p>{{ props.task.name }}</p>
            <p>{{ props.task.desc }}</p>
        </div>
        <div class="searched__task-extra">
            <tasks-task-priority :priority="props.task.priority" />
            <tasks-task-state :state="props.task.state" />
            <p>Дата создания: {{ getTextFormatDate(props.task.creationDateTimestamp) }}</p>
            <p>Дата окончания: {{ getTextFormatDate(props.task.endDateTimespamp) }}</p>
        </div>
    </nuxt-link>
</template>
<style lang="scss">
.searched__task {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    gap: 6px 2rem;
    color: black;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid map-get($colors, 'pink');
    transition: all 300ms;

    &-main {
        p {
            &:first-child {
                @include limited-text(100%);
                color: map-get($colors, 'pink');
                font-size: 18px;
                font-weight: 500;
            }

            &:last-child {
                @include limited-text(100%, 3);

            }
        }
    }

    &-extra {
        p {
            &:nth-child(3) {
                margin-top: .5rem;
            }
            &:nth-child(3),
            &:nth-child(4) {
                color: map-get($colors, 'light-grey');
                font-size: 14px;
            }
        }
    }

    &:hover {
        background-color: map-get($colors, 'ultra-light-grey');
    }
}
</style>