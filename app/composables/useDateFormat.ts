function formatDate(date: string | number): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }
    return new Date(date).toLocaleDateString('en', options)
}

function msToISO8601Duration(ms: number): string {
    // Convert ms to seconds
    const seconds = Math.floor(ms / 1000)

    // Extract hours, minutes and seconds
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    let duration = 'PT'

    // Add hours, minutes and seconds to the duration string
    if (hours > 0) duration += `${hours}H`
    if (minutes > 0) duration += `${minutes}M`
    if (remainingSeconds > 0) duration += `${remainingSeconds}S`

    // If the duration is empty, return PT0S
    return duration === 'PT' ? 'PT0S' : duration
}


export { formatDate, msToISO8601Duration }
