enum EPastOrNot {
    past = -1,
    today = 0,
    future = 1
}

export function getNotificationForLastOrAfterLastDayTask() {
    const todoStore = useTodoStore()
    const curTimestamp = todoStore.currentTimestamp
    return todoStore.getTasks.filter(item => item.state != EStateTask.finished).reduce((acc, item) => {
        const taskEndTimestamp = item.endDateTimespamp
        const isPast = isInPast(curTimestamp, taskEndTimestamp)
        if (isPast === EPastOrNot.today) {
            acc.push({ type: ENotificationTypes.lastDay, task: item })
        } else if (isPast === EPastOrNot.past) {
            acc.push({ type: ENotificationTypes.afterLastDay, task: item })
        }
        return acc
    }, [] as INotification[])
}

function isInPast(curTime: number, endTime: number): EPastOrNot {
    function getDayMonthYear(date: Date) {
        return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }
    }

    const curDate = getDayMonthYear(new Date(curTime))
    const endDate = getDayMonthYear(new Date(endTime))

    if (curDate.year === endDate.year) {
        if (curDate.month === endDate.month) {
            if (curDate.day === endDate.day) return EPastOrNot.today
            else if (curDate.day > endDate.day) return EPastOrNot.past
        } else if (curDate.month > endDate.month) return EPastOrNot.past
    } else if (curDate.year > endDate.year) return EPastOrNot.past
    return EPastOrNot.future
}