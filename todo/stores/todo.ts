import { defineStore } from 'pinia'
import { type ITask, type TDescTask, type EPriorityTask, EStateTask, type TTheme } from '~/composables/types'

export const NAME_LOCALSTORAGE = 'MyTodoTasks'

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        tasks: [] as ITask[],
        currentTimestamp: Date.now() as number,
        selectedTimestamp: Date.now() as number,
        currentTheme: 'light' as TTheme
    }),
    getters: {
        getTasks: (state) => {
            return state.tasks
        },
        getTasksByDate: (state) => {
            return (timestamp: number, isEndDate?: boolean) => {
                const date = new Date(timestamp)
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()

                return state.tasks.filter((task: ITask) =>
                    new Date(isEndDate ? task.endDateTimespamp : task.creationDateTimestamp).getFullYear() === year &&
                    new Date(isEndDate ? task.endDateTimespamp : task.creationDateTimestamp).getMonth() === month &&
                    new Date(isEndDate ? task.endDateTimespamp : task.creationDateTimestamp).getDate() === day
                )
            }
        },
        getCompletedTasks: (state) => {
            return state.tasks.filter(task => task.state === EStateTask.finished)
        },
        getTaskById: (state) => {
            return (id: number): ITask | undefined => state.tasks.find(task => task.id === id)
        },
        getTasksByName: (state) => {
            return (text: string): ITask[] => state.tasks.filter(el => el.name.toLowerCase().includes(text))
        },
        checkTaskIsVital(state) {
            return (id: number) => !!this.getTaskById(id)?.vital
        },
        getVitalsTasks: (state) => {
            return (tasks?: ITask[]) => tasks?.length ? tasks.filter(el => el.vital) : state.tasks.filter(el => el.vital)
        },
        getNonVitalTasks: (state) => {
            return (tasks?: ITask[]) => tasks?.length ? tasks.filter(el => !el.vital) : state.tasks.filter(el => !el.vital)
        },
        getTimestamps: (state) => {
            return {
                selected: state.selectedTimestamp,
                current: state.currentTimestamp
            }
        },
        getMinTimestamp: (state) => {
            return state.tasks.reduce((acc, task) => acc > task.creationDateTimestamp ? task.creationDateTimestamp : acc, Date.now() as number)
        },
        getCurrentTheme: (state) => {
            return state.currentTheme
        }
    },
    actions: {
        changeCurrentTimestamp() {
            setInterval(() => {
                this.currentTimestamp = Date.now()
            }, 60000)
        },
        resetTasks() {
            this.tasks.length = 0
            this.setTaskToLocalStorage()
        },
        addTask(task: ITask) {
            this.tasks.push(task)
            this.setTaskToLocalStorage()
        },
        delTaskById(id: number) {
            let taskById = this.getTaskById(id)
            if (typeof taskById === 'undefined') {
                return 'Error: Task is not found'
            }

            let findedIndex = this.tasks.indexOf(taskById)
            this.tasks.splice(findedIndex, 1)
            this.setTaskToLocalStorage()
        },
        changeStateTask(stateNum: number, id: number) {
            let taskById = this.getTaskById(id)
            if (!taskById) {
                return 'Error: Task is not found'
            }
            taskById.state = stateNum
            this.setTaskToLocalStorage()
        },
        changeTastVital(id: number) {
            const task = this.tasks.find(el => el.id === id) // findIndex
            if (!task) return 'Error'
            task.vital = !task.vital
            const taskIndex = this.tasks.indexOf(task)
            this.tasks[taskIndex] = task
            this.setTaskToLocalStorage()
        },
        setTaskToLocalStorage() { // + папка utils
            localStorage.setItem(NAME_LOCALSTORAGE, JSON.stringify(this.tasks))
        },
        setTasksFromLocalStorage() {
            const tasksLS = JSON.parse(localStorage.getItem(NAME_LOCALSTORAGE) || '{}')
            if (Object.keys(tasksLS).length === 0) return null
            try {
                this.tasks = tasksLS
            } catch (error) {
                console.log('Error parsing data from LS')
                return null
            }
        },
        setChoicedTimestamp(timestamp: number) {
            this.selectedTimestamp = timestamp
        },
        changeCurrentTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
        }
    }
})