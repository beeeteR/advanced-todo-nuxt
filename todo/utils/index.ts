export function getTextFormatDate(timestamp: number) {
    const localeDate = new Date(timestamp);
    const day = localeDate.getDate() < 10 ? `0${localeDate.getDate()}` : localeDate.getDate();
    const month = localeDate.getMonth() + 1 < 10 ? `0${localeDate.getMonth() + 1}` : localeDate.getMonth() + 1;
    return `${day}/${month}/${localeDate.getFullYear()}`;
}