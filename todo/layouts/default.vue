<script setup lang="ts">

const todoStore = useTodoStore()

onMounted(() => {
    if (localStorage.getItem(NAME_LOCALSTORAGE) != '{}') {
        todoStore.setTasksFromLocalStorage()
        todoStore.changeCurrentTimestamp()
    }

    const oneYearOldTasks = todoStore.getTasks.filter(task => Date.now() - task.creationDateTimestamp > 365 * 24 * 60 * 60 * 1000 || task.creationDateTimestamp > task.endDateTimespamp || task.endDateTimespamp - Date.now() > 365 * 24 * 60 * 60 * 1000)
    oneYearOldTasks.forEach(task => {
        todoStore.delTaskById(task.id)
    })
})

</script>

<template>
    <div class="app">
        <layout-app-header />
        <div class="wrapper">
            <div class="content-layout">
                <slot></slot>
            </div>
        </div>
        <layout-side-nav />
    </div>
</template>

<style>
.app {
    background-color: var(--dark-gray);
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.wrapper {
    width: 100%;
    padding-top: 56px;
    padding-bottom: 56px;
    padding-right: 56px;
    padding-left: calc(var(--padding-right-side-nav) + var(--width-side-nav) + 56px);
}
</style>