<script setup lang="ts">
const todoStore = useTodoStore();
const tasks = computed(() => {
  return todoStore.getVitalsTasks();
});
const selectedTaskId = ref<number>(-1);

function changeSelectedCard(taskId: number) {
  if (selectedTaskId.value === taskId) selectedTaskId.value = -1;
  else selectedTaskId.value = taskId;
}
</script>

<template>
  <div class="my-tasks-page">
    <div class="tasks --border-wrapper">
      <common-page-title :title="'Важные задачи'" />
      <div class="tasks__cards">
        <tasks-task-item
          v-for="item in tasks"
          :key="item.id"
          :task="item"
          :isSelect="selectedTaskId === item.id"
          @cardSelected="changeSelectedCard"
        />
      </div>
    </div>
    <div class="selected-task --border-wrapper" v-show="selectedTaskId != -1">
      <tasks-full-task :task="(todoStore.getTaskById(selectedTaskId) as ITask)" />
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

.tasks__cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selected-task {
  width: 50%;
}
</style>
