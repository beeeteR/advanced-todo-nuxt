<script setup lang="ts">

const todoStore = useTodoStore()

function changeTheme() {
    todoStore.changeCurrentTheme()
}
</script>

<template>
    <div>
        <input type="checkbox" name="" id="" @input="changeTheme">
    </div>
</template>