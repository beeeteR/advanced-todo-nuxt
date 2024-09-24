export function setToLocalStorage(key: string, data: Object) {
    localStorage.setItem(key, JSON.stringify(data))
    console.log(data);
    
}

export function getFromLocalStorage(key: string) {
    const lsData = JSON.parse(localStorage.getItem(key) || '{}')
    if (Object.keys(lsData).length === 0) return null
    return lsData
}