export enum EStateTask {
    created = 1,
    started = 2,
    finished = 3
}
export enum EPriorityTask {
    low = 1,
    medium = 2,
    extreme = 3
}

export type TDescTask = string | null

export interface ITask {
    id: number,
    creationDateTimestamp: number,
    endDateTimespamp: number,
    state: EStateTask,
    priority: EPriorityTask,
    name: string,
    desc: TDescTask,
    file: File | undefined,
    vital: boolean
}

export enum ERuMonth {
    'Января' = 1,
    'Февраля' = 2,
    'Марта' = 3,
    'Апреля' = 4,
    'Мая' = 5,
    'Июня' = 6,
    'Июля' = 7,
    'Августа' = 8,
    'Сентября' = 9,
    'Октября' = 10,
    'Ноября' = 11,
    'Декабря' = 12
}

export enum typesWordMonth {
    'месяц' = 1,
    'месяца' = 3,
    'месяцев' = 5
}

export enum typesWordDays {
    'день' = 1,
    'дня' = 3,
    'дней' = 5
}