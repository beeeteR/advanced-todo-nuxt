const validKeysForFilter: (keyof IFilterBy)[] = ['filterByCreationDate', 'filterByEndDate', 'filterByPriority', 'filterByState']

export function getFilteredTasks(tasks: ITask[]) {
    const route = useRoute()
    const routeQueries = useRoute().query
    const todoStore = useTodoStore()
    let filteredTasks: ITask[] = tasks
    Object.keys(routeQueries).forEach(item => {
        if (validKeysForFilter.includes(item as keyof IFilterBy)) {
            switch (item) {
                case 'filterByCreationDate':
                    filteredTasks = filteredTasks.filter(task => getTextFormatDate(task.creationDateTimestamp) === getTextFormatDate(todoStore.selectedTimestamp))
                    break;
                case 'filterByEndDate':
                    filteredTasks = filteredTasks.filter(task => getTextFormatDate(task.endDateTimespamp) === getTextFormatDate(todoStore.selectedTimestamp))
                    break;
                case 'filterByPriority':
                    filteredTasks = filteredTasks.filter(task => EPriorityTask[task.priority] === routeQueries[item])
                    break;
                case 'filterByState':
                    filteredTasks = filteredTasks.filter(task => EStateTask[task.state] === routeQueries[item])
                    break;
            }
        }
    })
    return filteredTasks
}

export function getSortedTasks(tasks: ITask[]) {
    const route = useRoute()
    const routeQueries = useRoute().query
    if (!routeQueries.sortByKey && !routeQueries.sortByValue) return tasks
    let sortedTasks: ITask[] = tasks
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
    return Number(route.query.sortByValue) === -1 ? sortedTasks : sortedTasks.reverse()
}