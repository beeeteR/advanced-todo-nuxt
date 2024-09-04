<script setup lang="ts">

type TValidValueForSort = -1 | 0 | 1

enum ESortType {
    descending = -1,
    notSorted = 0,
    ascending = 1
}

enum EEngRuSortedNames {
    priority = 'Приоритет',
    state = 'Статус',
    createDate = 'Дата создания',
    endDate = 'Дата окончания',
}
type ISortBy<T> = {
    -readonly [K in keyof T]: TValidValueForSort
}

const sortBy = reactive<ISortBy<typeof EEngRuSortedNames>>({
    priority: 0,
    state: 0,
    createDate: 0,
    endDate: 0,
})

function changeSortBy(key: keyof typeof EEngRuSortedNames, nowValue: ESortType) {
    for (const keyOfSortBy in sortBy) {
        if (keyOfSortBy != key)
            sortBy[keyOfSortBy as keyof typeof EEngRuSortedNames] = 0
    }
    if (ESortType[nowValue + 1]) {
        sortBy[key] = (nowValue + 1) as TValidValueForSort
    } else {
        sortBy[key] = ESortType.descending
    }
}

</script>
<template>
    <div class="sort-menu">
        <p class="sort__title">Сортировка:</p>
        <ul class="sort__list">
            <li class="sort__item"
                :class="{ '--sort-descending': sortBy[key] === ESortType.descending, '--sort-ascending': sortBy[key] === ESortType.ascending }"
                v-for="(value, key) in sortBy" :key="key" @click="changeSortBy(key, value)">{{ EEngRuSortedNames[key] }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
.sort-menu {
    display: flex;
    gap: 0.5rem;

    .sort {
        &__title {}

        &__list {
            display: flex;
            gap: 0.25rem;
        }

        &__item {
            display: flex;
            align-items: center;
            margin-left: 1rem;
            user-select: none;
            cursor: pointer;

            &.--sort {

                &-ascending,
                &-descending {
                    margin-left: 0;

                    &::before {
                        content: "";
                        display: block;
                        height: 1rem;
                        width: 1rem;
                        background-image: url(~/assets/img/pages/arrow-up-svgrepo-com.svg);
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: contain;
                    }
                }

                &-ascending {
                    &::before {
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}
</style>