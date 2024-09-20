<script setup lang="ts">

enum WeekDay {
    'Воскресенье' = 0,
    'Понедельник' = 1,
    'Вторник' = 2,
    'Среда' = 3,
    'Четверг' = 4,
    'Пятница' = 5,
    'Суббота' = 6,
}
const todoStore = useTodoStore()
const date = ref(Date.now())
const dayOfWeek = computed(() => {
    return WeekDay[new Date(date.value).getDay()]
})
const dateStrForHTML = computed(() => {
    const localDate = new Date(date.value)
    let day = localDate.getDate()
    let month = localDate.getMonth()
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month + 1}/${localDate.getFullYear()}`
})
const searchedTasks = ref<ITask[]>([])
const searchInputIsFocus = ref<boolean>(false)
const searchInputElement = ref<HTMLInputElement>()

function changingDate(timestamp: number) {
    date.value = timestamp
    todoStore.setChoicedTimestamp(timestamp)
}
function searchTasks(e: Event) {
    const target = e.target as HTMLInputElement
    searchedTasks.value = target.value === '' ? [] : todoStore.getTasksByName(target.value)
}
function changeFocusedInput(e: Event) {
    setTimeout(() => {
        searchInputIsFocus.value = e.type === 'focusin' ? true : false
    }, 100)
}
function goToPageTasks(e: Event) {
    const keyboard = e as KeyboardEvent
    if ((e.type === 'keypress' && keyboard.code === 'Enter') || e.type === 'click') {
        useRouter().push(`my-tasks?search=${searchInputElement.value?.value}`)
        searchInputIsFocus.value = false
    }
}
</script>


<template>
    <div class="header__content">
        <nuxt-link to="/" class="logo">
            <span>To</span>
            <span>-Do</span>
        </nuxt-link>
        <div class="search">
            <div class="search__input">
                <input type="text" ref="searchInputElement" class="search__input-field"
                    :class="{ '--top-border-radius': searchedTasks.length > 0 && searchInputIsFocus }"
                    placeholder="Найдите свою задачу здесь..." @input="searchTasks" @focusin="changeFocusedInput"
                    @focusout="changeFocusedInput" @keypress="goToPageTasks">
                <button class="search__input-btn" @click="goToPageTasks">
                    <img src="~/assets/img/header/SearchICon.svg" alt="">
                </button>
            </div>
            <div class="search__tasks" v-show="searchedTasks.length && searchInputIsFocus">
                <layout-header-task-item v-for="item in searchedTasks" :key="item.id" :task="item" />
            </div>
        </div>
        <div class="header__info">
            <div class="header__btns">
                <div class="btn-img">
                    <img src="~/assets/img/header/Notifications.svg" alt="">
                </div>
                <div class="btn-img">
                    <img class="btn__img-datetime" src="~/assets/img/header/Cal.svg" alt="">
                    <common-input-date class="btn__input-datetime" @changeDate="changingDate" />
                </div>
            </div>
            <div class="header__this-day">
                <span>{{ dayOfWeek }}</span>
                <span>{{ dateStrForHTML }}</span>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.header {
    &__content {
        background-color: #F8F8F8;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        padding: 24px 72px;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 7%);

        .logo {
            font-size: 32px;
            font-weight: 600;
            width: fit-content;

            span {
                &:first-child {
                    color: map-get($colors, 'pink');
                }
            }
        }

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
                z-index: 10;
                background-color: #F8F8F8;
                border-top: 1px solid map-get($colors, 'pink');
            }

            .--top-border-radius {
                border-radius: 0;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
            }
        }
    }

    &__info {
        justify-self: end;
        display: flex;
        gap: 2rem;
    }

    &__btns {
        display: flex;
        gap: 1rem;

        .btn {
            &-img {
                cursor: pointer;
                position: relative;
            }

            &__input-datetime {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;

                &::-webkit-calendar-picker-indicator {
                    -webkit-appearance: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 90%;
                    height: 90%;
                    cursor: pointer;
                }
            }

            img {
                width: 100%;
                height: 100%;
                aspect-ratio: 1;
            }
        }
    }

    &__this-day {
        display: flex;
        flex-direction: column;

        span {
            font-weight: 500;

            &:last-child {
                color: map-get($colors, 'light-blue');
            }
        }
    }
}
</style>