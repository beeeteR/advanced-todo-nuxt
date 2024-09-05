<script setup lang="ts">

import { EStateTaskRu, EPriorityTaskRu, EPriorityTask, EStateTask } from "~/composables/types";

interface IFilterBy {
    creationDate: boolean,
    endDate: boolean,
    priority: null | EPriorityTask,
    state: null | EStateTask
}

const filterBy = reactive<IFilterBy>({
    creationDate: false,
    endDate: false,
    priority: null,
    state: null
})
const valuesInputPriority = ref([])
const valuesInputState = ref([])

watch(() => filterBy.creationDate, (value) => {
    if (value) filterBy.endDate = false
})
watch(() => filterBy.endDate, (value) => {
    if (value) filterBy.creationDate = false
})
watch(valuesInputPriority, (newVal, oldVal) => {
    changeArrayInputStateOrPriorityFromWather('priority', newVal, oldVal)
    filterBy.priority = valuesInputPriority.value[0] ? valuesInputPriority.value[0] : null
})
watch(valuesInputState, (newVal, oldVal) => {
    changeArrayInputStateOrPriorityFromWather('state', newVal, oldVal)
    filterBy.state = valuesInputState.value[0] ? valuesInputState.value[0] : null
})

function changeArrayInputStateOrPriorityFromWather(who: 'state' | 'priority', newVal: Array<never>, oldVal: Array<never>) {
    const neededArray = who === 'state' ? valuesInputState : valuesInputPriority
    if (neededArray.value.length > 1) {
        const biggerArr = newVal.length > oldVal.length ? newVal : oldVal
        neededArray.value = biggerArr.filter(item => item != (biggerArr == newVal ? oldVal[0] : newVal[0]))
    }
}

watch(filterBy, () => {
    const route = useRoute()
    const router = useRouter()
    const computedQueries: any = {}
    Object.keys(route.query).forEach(key => {
        if (!key.includes('filterBy')) {
            computedQueries[key] = route.query[key]
        }
    })
    Object.keys(filterBy).forEach(item => {
        const key = item as keyof IFilterBy
        if (filterBy[key]) {
            computedQueries[`filterBy${key[0].toUpperCase() + key.slice(1)}`] = filterBy[key]
        }
    })
    
    router.push({path: route.path, query: computedQueries})
})

</script>

<template>
    <div>
        <label for="filterStartDate">По начальной дате</label>
        <input type="checkbox" name="filterDate" id="filterStartDate" v-model="filterBy.creationDate">
        <label for="filterEndDate">По конечной дате</label>
        <input type="checkbox" name="filterDate" id="filterEndDate" v-model="filterBy.endDate">
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