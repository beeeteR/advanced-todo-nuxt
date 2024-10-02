<script lang="ts" setup>

const todoStore = useTodoStore()
const searchedTasks = ref<ITask[]>([])
const searchInputIsFocus = ref<boolean>(true)
const searchInputText = ref<string>('')
const route = reactive(useRoute())
const selectedTaskId = ref<number>()

function searchTasks(e: Event) {
    const target = e.target as HTMLInputElement
    searchedTasks.value = target.value === '' ? [] : todoStore.getTasksByName(target.value)
}
function changeFocusedInput(e: Event) {
    setTimeout(() => {
        searchInputIsFocus.value = e.type === 'focusin' ? true : false
        setSelectedTask(-1)
    }, 100)
}
function setSelectedTask(id: number) {
    selectedTaskId.value = id
}
function keyPressInInput(e: Event) {
    const keyboard = e as KeyboardEvent
    if (keyboard.code === 'Enter') {
        if (selectedTaskId.value === -1) goToPageTasks()
        else goToPageTasks(true)
        setSelectedTask(-1)
    } else {
        const currentSelectedTaskIndex = searchedTasks.value.findIndex(task => task.id === selectedTaskId.value)
        if (keyboard.code === 'ArrowDown') {
            e.preventDefault()
            setSelectedTask(currentSelectedTaskIndex === searchedTasks.value.length - 1 ?
                -1 : currentSelectedTaskIndex === -1 ? searchedTasks.value[0].id : searchedTasks.value[currentSelectedTaskIndex + 1].id)
        } else if (keyboard.code === 'ArrowUp') {
            e.preventDefault()
            setSelectedTask(currentSelectedTaskIndex === 0 ?
                -1 : currentSelectedTaskIndex === -1 ? searchedTasks.value[searchedTasks.value.length - 1].id : searchedTasks.value[currentSelectedTaskIndex - 1].id)
        }
    }
}
function goToPageTasks(isPageTask?: boolean) {
    if (isPageTask) useRouter().push(`task-id-${selectedTaskId.value}`)
    else useRouter().push(`my-tasks?search=${searchInputText.value}`)
}
watch(() => route.fullPath, () => {
    searchInputText.value = ''
    searchedTasks.value = []
})
</script>

<template>
    <div class="search">
        <div class="search__input">
            <input type="text" class="search__input-field"
                :class="{ '--top-border-radius': searchedTasks.length > 0 && searchInputIsFocus }"
                placeholder="Найдите свою задачу здесь..." v-model="searchInputText" @input="searchTasks"
                @focusin="changeFocusedInput" @focusout="changeFocusedInput" @keydown="keyPressInInput">
            <button class="search__input-btn" @click="goToPageTasks()">
                <img src="~/assets/img/header/SearchICon.svg" alt="">
            </button>
        </div>
        <div class="search__tasks" v-show="searchedTasks.length && searchInputIsFocus">
            <layout-header-task-item v-for="item in searchedTasks" :key="item.id" :task="item"
                :class="{ '--searched-selected-task': selectedTaskId === item.id }" @mouseenter="setSelectedTask(item.id)" />
        </div>
    </div>
</template>

<style lang="scss">
.search {
    position: relative;

    &__input {
        display: flex;

        &-field {
            width: 100%;
            font-size: 12px;
            font-weight: 600;
            padding: 10px 15px;
            border: none;
            border-radius: 0.5rem;
            box-shadow: -2px 2px 4px 2px rgb(235, 235, 235);
            transition: all 200ms;

            &:focus {
                box-shadow: 0 2px 8px 2px rgb(200, 200, 200);
            }
        }

        &-btn {
            position: absolute;
            right: 0;

            img {
                height: 100%;
                aspect-ratio: 1;
            }
        }
    }

    .search__tasks {
        position: absolute;
        width: 100%;
        max-height: 400px;
        background-color: #F8F8F8;
        border-top: 1px solid map-get($colors, 'pink');
        box-shadow: 2px 2px 8px 0px map-get($colors, 'light-grey');
        overflow-y: auto;
        z-index: 10;

        .--searched-selected-task {
            background-color: map-get($colors, 'ultra-light-grey');
        }
    }

    .--top-border-radius {
        border-radius: 0;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }
}
</style>