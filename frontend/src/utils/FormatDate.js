export function formatDate(date, includeYear = false) {
    const options = { year: 'numeric', month: 'short', day: 'numeric'};
    if (!includeYear) {
        delete options.year
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
}