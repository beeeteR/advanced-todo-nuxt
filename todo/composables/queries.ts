interface IQueryParams {
    [key: string]: any
}

export function changeQuery(pushed: IQueryParams, deletedKeys: Array<string>) {
    const route = useRoute()
    const queries = { ...route.query }
    const result: IQueryParams = {}
    Object.keys(queries).filter(key => !deletedKeys.includes(key)).forEach(item => {
        result[item] = queries[item]
    })
    useRouter().push({ path: route.path, query: { ...result, ...pushed } })
}