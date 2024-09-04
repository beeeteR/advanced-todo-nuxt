<script setup lang="ts">
const todoStore = useTodoStore();
const tasks = computed(() => {
  return todoStore.getNonVitalTasks();
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
        <PageTitle title="Мои задачи" />
        <TasksSort />
      </div>
      <div class="tasks__body">
        <Task v-for="item in tasks" :key="item.id" :task="item" :isSelect="selectedTaskId === item.id"
          @cardSelected="changeSelectedCard" />
      </div>
    </div>
    <div class="selected-task --border-wrapper" v-show="selectedTaskId != -1">
      <FullTask :task="(todoStore.getTaskById(selectedTaskId) as ITask)" @taskDeleted="taskDeleted" />
    </div>
  </div>
</template>

<style>
.my-tasks-page {
  display: flex;
  gap: 1rem;
}

.my-tasks-page .tasks {
  flex-grow: 1;
}

.tasks__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tasks__settings {}

.tasks__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selected-task {
  width: 50%;
}
</style>
