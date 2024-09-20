<script lang="ts" setup>
interface IHeaderTaskItemProps {
    task: ITask
}
const props = defineProps<IHeaderTaskItemProps>()

</script>
<template>
    <nuxt-link :to="`task-id-${props.task.id}`" class="searched__task">
        <div class="searched__task-main">
            {{ props.task.name }}
            {{ props.task.desc }}
        </div>
        <div class="searched__task-extra">
            {{ props.task.priority }}
            {{ props.task.state }}
            {{ props.task.creationDateTimestamp }}
            {{ props.task.endDateTimespamp }}
        </div>
    </nuxt-link>
</template>
<style lang="scss">
.searched__task {
    display: block;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid map-get($colors, 'pink');
    transition: all 300ms;

    &-main {}

    &-extra {}

    &:hover {
        background-color: map-get($colors, 'light-grey');
    }
}
</style>