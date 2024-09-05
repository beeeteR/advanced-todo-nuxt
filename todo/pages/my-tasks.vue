<script setup lang="ts">
import { EEngRuSortedNames, type ITask } from '~/composables/types';

const todoStore = useTodoStore();
const tasks = computed(() => {
  const routeQueries = useRoute().query
  if (!routeQueries.sortByKey && !routeQueries.sortByValue) return todoStore.getNonVitalTasks()
  let sortedTasks: ITask[] = todoStore.getNonVitalTasks()
  for (const item in EEngRuSortedNames) {
    if (item === routeQueries.sortByKey) {
      switch (item) {
        case 'priority':
          sortedTasks = sortedTasks.sort((prev, cur) => cur.priority - prev.priority)
          break
        case 'state':
          sortedTasks = sortedTasks.sort((prev, cur) => cur.state - prev.state)
          break
        case 'createDate':
          sortedTasks = sortedTasks.sort((prev, cur) => cur.creationDateTimestamp - prev.creationDateTimestamp)
          break
        case 'endDate':
          sortedTasks = sortedTasks.sort((prev, cur) => cur.endDateTimespamp - prev.endDateTimespamp)
          break
      }
    }
  }
  return routeQueries.sortByValue == -1 ? sortedTasks: sortedTasks.reverse()
});
const selectedTaskId = ref<number>(-1);

function changeSelectedCard(taskId: number) {
  if (selectedTaskId.value === taskId) selectedTaskId.value = -1;
  else selectedTaskId.value = taskId;
}
function taskDeleted() {
  selectedTaskId.value = -1
}
</script>

<template>
  <div class="my-tasks-page">
    <div class="tasks --border-wrapper">
      <div class="tasks__header">
        <common-page-title title="Мои задачи" />
        <tasks-sort-menu />
      </div>
      <div class="tasks__body">
        <tasks-task-item v-for="item in tasks" :key="item.id" :task="item" :isSelect="selectedTaskId === item.id"
          @cardSelected="changeSelectedCard" />
      </div>
    </div>
    <div class="selected-task --border-wrapper" v-show="selectedTaskId != -1">
      <tasks-full-task :task="(todoStore.getTaskById(selectedTaskId) as ITask)" @taskDeleted="taskDeleted" />
    </div>
  </div>
</template>

<style lang="scss">
.my-tasks-page {
  display: flex;
  gap: 1rem;

  .tasks {
    flex-grow: 1;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .selected-task {
      width: 50%;
    }
  }
}
</style>
