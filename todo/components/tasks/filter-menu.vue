<script setup lang="ts">

import { EStateTaskRu, EPriorityTaskRu, type IFilterBy, EStateTask, EPriorityTask } from "~/composables/types";

type TValidValueForPriorityAndStateFiltered = Array<keyof typeof EPriorityTask> | Array<keyof typeof EStateTask>
type TQueryParamsForFilter<IFilterBy> = {
    [K in keyof IFilterBy]?: IFilterBy[K]
}

const todoStore = useTodoStore()
const filterBy = reactive<IFilterBy>({
    filterByCreationDate: null,
    filterByEndDate: null,
    filterByPriority: null,
    filterByState: null
})
const valuesInputPriority = ref<Array<keyof typeof EPriorityTask>>([])
const valuesInputState = ref<Array<keyof typeof EStateTask>>([])

onMounted(() => {
    const queries: TQueryParamsForFilter<IFilterBy> = useRoute().query

    filterBy.filterByCreationDate = Boolean(queries.filterByCreationDate) || null
    filterBy.filterByEndDate = Boolean(queries.filterByEndDate) || null
    filterBy.filterByPriority = queries.filterByPriority || null
    filterBy.filterByState = queries.filterByState || null

    if (queries.filterByPriority) valuesInputPriority.value.push(queries.filterByPriority as unknown as keyof typeof EPriorityTask)
    if (queries.filterByState) valuesInputState.value.push(queries.filterByState as unknown as keyof typeof EStateTask)
})

watch(() => filterBy.filterByCreationDate, (value) => {
    if (value) filterBy.filterByEndDate = null
})
watch(() => filterBy.filterByEndDate, (value) => {
    if (value) filterBy.filterByCreationDate = null
})
watch(valuesInputPriority, (newVal, oldVal) => {
    changeArrayInputStateOrPriorityFromWather('priority', newVal, oldVal)
    filterBy.filterByPriority = (valuesInputPriority.value[0] ? valuesInputPriority.value[0] : null) as EPriorityTask | null
})
watch(valuesInputState, (newVal, oldVal) => {
    changeArrayInputStateOrPriorityFromWather('state', newVal, oldVal)
    filterBy.filterByState = (valuesInputState.value[0] ? valuesInputState.value[0] : null) as EStateTask | null
})


function changeArrayInputStateOrPriorityFromWather(who: 'state' | 'priority', newVal: TValidValueForPriorityAndStateFiltered, oldVal: TValidValueForPriorityAndStateFiltered) {
    const neededArray = who === 'state' ? valuesInputState : valuesInputPriority
    if (neededArray.value.length > 1) {
        const biggerArr = newVal.length > oldVal.length ? newVal : oldVal
        neededArray.value = biggerArr.filter(item => item != (biggerArr == newVal ? oldVal[0] : newVal[0])) as TValidValueForPriorityAndStateFiltered
    }

    watch(filterBy, () => {
        const addedQueries: any = {}
        const deleteQueries: Array<string> = []
        Object.keys(filterBy).forEach(item => {
            const key = item as keyof IFilterBy
            if (filterBy[key]) addedQueries[key] = filterBy[key]
            else deleteQueries.push(key)
        })
        changeQuery(addedQueries, deleteQueries)
    })
}
</script>

<template>
    <div>
        <label for="filterStartDate">По начальной дате</label>
        <input type="checkbox" name="filterDate" id="filterStartDate" v-model="filterBy.filterByCreationDate">
        <label for="filterEndDate">По конечной дате</label>
        <input type="checkbox" name="filterDate" id="filterEndDate" v-model="filterBy.filterByEndDate">
        <div>
            <p class="filter-title">По приоритету</p>
            <div class="" v-for="(item, index) in EPriorityTaskRu" :key="index">
                <label :for="`filter-priority-${index}`">{{ item }}</label>
                <input type="checkbox" name="filterPriority" :value="index" :id="`filter-priority-${index}`"
                    v-model="valuesInputPriority">
            </div>
        </div>
        <div>
            <p class="filter-title">По статусу</p>
            <div class="" v-for="(item, index) in EStateTaskRu" :key="index">
                <label :for="`filter-state-${index}`">{{ item }}</label>
                <input type="checkbox" name="filter-state" :value="index" :id="`filter-state-${index}`"
                    v-model="valuesInputState">
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.filter-title {
    font-weight: 600;
    font-size: 18px;
}
</style>