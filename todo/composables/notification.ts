export function getNotificationForLastOrAfterLastDayTask() {
    const todoStore = useTodoStore()
    const curTimestamp = todoStore.currentTimestamp
    return todoStore.getTasks.reduce((acc, item) => {
        const taskEndTimestamp = item.endDateTimespamp
        const oneDay = 1000 * 60 * 60 * 24
        if (item.state != EStateTask.finished) {
            if (curTimestamp - taskEndTimestamp < oneDay) {
                acc.push({ type: ENotificationTypes.lastDay, taskId: item.id })
            } else if (curTimestamp - taskEndTimestamp > 0) {
                acc.push({ type: ENotificationTypes.afterLastDay, taskId: item.id })
            }
        }
        return acc
    }, [] as INotification[])
}