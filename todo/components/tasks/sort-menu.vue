<script setup lang="ts">

import { EEngRuSortedNames, type ISortBy, type TValidValueForSort, type TSortNameForQuery, ESortType } from '~/composables/types'

const sortBy = reactive<ISortBy<typeof EEngRuSortedNames>>({
    priority: 0,
    state: 0,
    createDate: 0,
    endDate: 0,
})

onMounted(() => {
    const queries: TSortNameForQuery = useRoute().query
    if (queries.sortByKey && queries.sortByValue) {
        sortBy[queries.sortByKey] = Number(queries.sortByValue) as TValidValueForSort
    }
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

watch(sortBy, () => {
    const addedQueries: TSortNameForQuery = {sortByKey: undefined, sortByValue: undefined}
    const deleteQueries: Array<keyof TSortNameForQuery> = []
    Object.keys(sortBy).forEach(item => {
        const key = item as keyof ISortBy<typeof EEngRuSortedNames>
        if (sortBy[key] != ESortType.notSorted) {
            addedQueries.sortByKey = key
            addedQueries.sortByValue = sortBy[key]
        }
    })
    changeQuery(addedQueries, deleteQueries)
})

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
        &__title {
            font-size: 18px;
            font-weight: 600;
        }

        &__list {
            display: flex;
            gap: 0.5rem;
        }

        &__item {
            display: flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            transition: font-size 300ms, font-weight 300ms;

            &.--sort {

                &-ascending,
                &-descending {
                    margin-left: 0;
                    font-weight: 600;
                    font-size: 1.1rem;

                    &::before {
                        content: "";
                        display: block;
                        height: 1rem;
                        width: 1rem;
                        background-color: map-get($colors, 'red');
                        mask-image: url(~/assets/img/pages/arrow-up.svg);
                        mask-size: contain;
                    }
                }

                &-ascending {
                    &::before {
                        transform: rotate(180deg);
                        background-color: map-get($colors, 'green');
                    }
                }
            }
        }
    }
}
</style>